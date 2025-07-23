import { NextRequest, NextResponse } from 'next/server';
import { olxScraper, type AnuntOLX } from '@/lib/olx-scraper';

let anunturiCache: AnuntOLX[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minute cache

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorie = searchParams.get('categorie') || '';
    const oras = searchParams.get('oras') || '';
    const query = searchParams.get('query') || '';
    const pretMin = searchParams.get('pretMin') ? parseInt(searchParams.get('pretMin')!) : undefined;
    const pretMax = searchParams.get('pretMax') ? parseInt(searchParams.get('pretMax')!) : undefined;
    const pagini = parseInt(searchParams.get('pagini') || '1');
    const useMock = searchParams.get('mock') === 'true';

    console.log('🚀 API anunturi called with params:', {
      categorie, oras, query, pretMin, pretMax, pagini, useMock
    });

    let anunturi: AnuntOLX[] = [];
    let source = 'unknown';

    if (useMock) {
      // Returnează date mock pentru testare
      console.log('📋 Folosind date mock pentru testare');
      anunturi = olxScraper.generateMockData(15);
      source = 'mock';
    } else {
      // Verifică cache-ul
      const now = Date.now();
      
      if (anunturiCache.length > 0 && (now - lastFetch) < CACHE_DURATION) {
        console.log('📦 Folosind date din cache');
        anunturi = anunturiCache;
        source = 'cache';
      } else {
        console.log('🔍 Scraping live din OLX...');
        try {
          anunturi = await olxScraper.scrapeAnunturi({
            categorie,
            oras,
            query,
            pretMin,
            pretMax,
            pagini: Math.min(pagini, 3) // Limitează la max 3 pagini
          });
          
          if (anunturi.length > 0) {
            anunturiCache = anunturi;
            lastFetch = now;
            source = 'live';
          } else {
            console.log('⚠️ Nu s-au găsit anunțuri live, folosind mock data');
            anunturi = olxScraper.generateMockData(8);
            source = 'mock-fallback';
          }
        } catch (error) {
          console.error('❌ Eroare la scraping live:', error);
          console.log('📋 Fallback la date mock');
          anunturi = olxScraper.generateMockData(10);
          source = 'mock-error';
        }
      }
    }

    // Aplică filtrele locale
    let anunturiFiltrate = anunturi;

    if (categorie) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.categorie === categorie);
    }

    if (oras) {
      anunturiFiltrate = anunturiFiltrate.filter(a => 
        a.locatie.toLowerCase().includes(oras.toLowerCase())
      );
    }

    if (query) {
      anunturiFiltrate = anunturiFiltrate.filter(a => 
        a.titlu.toLowerCase().includes(query.toLowerCase()) ||
        a.descriere.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (pretMin) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.pret >= pretMin);
    }

    if (pretMax) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.pret <= pretMax);
    }

    // Calculează statistici
    const statistici = {
      pretMediu: anunturiFiltrate.length > 0 
        ? Math.round(anunturiFiltrate.reduce((sum, a) => sum + a.pret, 0) / anunturiFiltrate.length)
        : 0,
      pretMin: anunturiFiltrate.length > 0 
        ? Math.min(...anunturiFiltrate.map(a => a.pret))
        : 0,
      pretMax: anunturiFiltrate.length > 0 
        ? Math.max(...anunturiFiltrate.map(a => a.pret))
        : 0,
      totalAnunturi: anunturiFiltrate.length,
      categoriiActive: new Set(anunturiFiltrate.map(a => a.categorie)).size,
    };

    const metadata = {
      source,
      timestamp: new Date().toISOString(),
      cache: source === 'cache',
      totalOriginal: anunturi.length,
      totalFiltrate: anunturiFiltrate.length,
      filters: { categorie, oras, query, pretMin, pretMax }
    };

    console.log(`✅ Returnez ${anunturiFiltrate.length} anunțuri din sursa: ${source}`);

    return NextResponse.json({
      success: true,
      anunturi: anunturiFiltrate,
      statistici,
      metadata,
      total: anunturiFiltrate.length
    });

  } catch (error) {
    console.error('❌ Eroare în API anunturi:', error);
    
    // În caz de eroare totală, returnează date mock
    const mockData = olxScraper.generateMockData(5);
    return NextResponse.json({
      success: true,
      anunturi: mockData,
      statistici: {
        pretMediu: 3500,
        pretMin: 1000,
        pretMax: 8000,
        totalAnunturi: mockData.length,
        categoriiActive: 3
      },
      metadata: {
        source: 'mock-emergency',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      total: mockData.length
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, anuntId, monitorizat } = body;

    console.log('📊 POST action:', { action, anuntId, monitorizat });

    if (action === 'toggle_monitorizare') {
      // În implementarea reală, aici ai salva în bază de date
      // Pentru demo, doar confirmăm operațiunea
      
      // Actualizează în cache dacă există
      if (anunturiCache.length > 0) {
        anunturiCache = anunturiCache.map(anunt =>
          anunt.id === anuntId ? { ...anunt, selectat: monitorizat } : anunt
        );
      }

      return NextResponse.json({
        success: true,
        message: `Anunț ${monitorizat ? 'adăugat la' : 'eliminat din'} monitorizare`,
        anuntId,
        monitorizat
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Acțiune necunoscută'
    });

  } catch (error) {
    console.error('❌ Eroare în POST anunturi:', error);
    return NextResponse.json({
      success: false,
      error: 'Eroare la procesarea cererii'
    });
  }
}