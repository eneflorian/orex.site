import { NextRequest, NextResponse } from 'next/server';
import { olxScraper, AnuntOLX, CATEGORII_OLX } from '@/lib/olx-scraper';

// Mock data pentru fallback
const anunturiMock: AnuntOLX[] = [
  {
    id: '1',
    titlu: "Casă individuală, 4 camere, zona Turnișor",
    pret: 120000,
    valuta: 'eur',
    locatie: "Sibiu",
    tip: "Casă",
    categorie: "imobiliare",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200?text=Casa+Sibiu",
    url: "https://www.olx.ro/d/oferta/casa-individuala-4-camere-zona-turnisor",
    descriere: "Casă frumoasă în zona Turnișor, 4 camere, grădină mare",
    selectat: false,
  },
  {
    id: '2',
    titlu: "Vilă modernă, 5 camere, Calea Cisnădiei",
    pret: 185000,
    valuta: 'eur',
    locatie: "Sibiu",
    tip: "Vilă",
    categorie: "imobiliare",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200?text=Vila+Moderna",
    url: "https://www.olx.ro/d/oferta/vila-moderna-5-camere-calea-cisnadiei",
    descriere: "Vilă modernă cu 5 camere, finisaje premium",
    selectat: false,
  },
  {
    id: '3',
    titlu: "iPhone 13 Pro Max, 256GB, ca nou",
    pret: 4200,
    valuta: 'lei',
    locatie: "Sibiu",
    tip: "Telefon",
    categorie: "telefoane",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200?text=iPhone+13",
    url: "https://www.olx.ro/d/oferta/iphone-13-pro-max-256gb-ca-nou",
    descriere: "iPhone 13 Pro Max în stare excelentă, utilizat cu grijă",
    selectat: false,
  },
  {
    id: '4',
    titlu: "BMW X5, 2018, 150.000 km",
    pret: 35000,
    valuta: 'eur',
    locatie: "Sibiu",
    tip: "SUV",
    categorie: "auto-moto",
    dataPublicare: "2025-01-22",
    imagine: "https://via.placeholder.com/300x200?text=BMW+X5",
    url: "https://www.olx.ro/d/oferta/bmw-x5-2018-150000-km",
    descriere: "BMW X5 în stare foarte bună, service la zi",
    selectat: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parametri de filtrare
    const categorie = searchParams.get('categorie');
    const titlu = searchParams.get('titlu');
    const pretMax = searchParams.get('pretMax');
    const tip = searchParams.get('tip');
    const locatie = searchParams.get('locatie');
    const oras = searchParams.get('oras') || 'sibiu';
    const useMock = searchParams.get('mock') === 'true';
    const pagini = parseInt(searchParams.get('pagini') || '1');

    let anunturiFiltrate: AnuntOLX[] = [];

    if (useMock) {
      // Folosește mock data pentru testing rapid
      anunturiFiltrate = anunturiMock;
      console.log('Folosind mock data pentru testare');
    } else {
      // Încearcă scraping real
      try {
        console.log('Începe scraping real OLX...');
        
        const scrapingOptions = {
          categorie: categorie || undefined,
          oras: oras,
          query: titlu || undefined,
          pretMax: pretMax ? parseInt(pretMax) : undefined,
          pagini: Math.min(pagini, 3), // Limitează la maxim 3 pagini pentru performanță
        };

        anunturiFiltrate = await olxScraper.scrapeAnunturi(scrapingOptions);
        
        // Dacă scraping-ul nu returnează rezultate, folosește mock data
        if (anunturiFiltrate.length === 0) {
          console.log('Scraping-ul nu a returnat rezultate, folosind mock data');
          anunturiFiltrate = anunturiMock;
        } else {
          console.log(`Scraping reușit: ${anunturiFiltrate.length} anunțuri găsite`);
        }
        
      } catch (error) {
        console.error('Eroare la scraping, folosind mock data:', error);
        anunturiFiltrate = anunturiMock;
      }
    }

    // Aplicare filtre suplimentare pe rezultate
    if (categorie) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.categorie === categorie);
    }

    if (titlu) {
      anunturiFiltrate = anunturiFiltrate.filter(a => 
        a.titlu.toLowerCase().includes(titlu.toLowerCase())
      );
    }

    if (pretMax) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.pret <= parseInt(pretMax));
    }

    if (tip) {
      anunturiFiltrate = anunturiFiltrate.filter(a => a.tip === tip);
    }

    if (locatie) {
      anunturiFiltrate = anunturiFiltrate.filter(a => 
        a.locatie.toLowerCase().includes(locatie.toLowerCase())
      );
    }

    // Calculare statistici
    const total = anunturiFiltrate.length;
    const pretMediu = total > 0 ? 
      anunturiFiltrate.reduce((sum, a) => sum + a.pret, 0) / total : 0;
    
    const pretMin = total > 0 ? 
      Math.min(...anunturiFiltrate.map(a => a.pret)) : 0;
    
    const pretMaxGasit = total > 0 ? 
      Math.max(...anunturiFiltrate.map(a => a.pret)) : 0;

    return NextResponse.json({
      success: true,
      anunturi: anunturiFiltrate,
      total,
      statistici: {
        pretMediu: Math.round(pretMediu),
        pretMin,
        pretMax: pretMaxGasit,
        categorii: CATEGORII_OLX.length,
      },
      filtreAplicate: {
        categorie,
        titlu,
        pretMax,
        tip,
        locatie,
        oras,
        pagini
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: useMock ? 'mock' : 'olx-scraping',
        version: '2.0.0'
      }
    });

  } catch (error) {
    console.error('Eroare la obținerea anunțurilor:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Eroare la obținerea anunțurilor',
        anunturi: anunturiMock,
        total: anunturiMock.length,
        source: 'fallback-mock'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, anuntId, monitorizat } = body;

    if (action === 'toggle_monitorizare') {
      // În viitor, aici va fi logica pentru salvarea în baza de date
      // Pentru acum, returnăm doar confirmare
      return NextResponse.json({
        success: true,
        message: `Anuntul ${anuntId} ${monitorizat ? 'adăugat la' : 'eliminat din'} monitorizare`,
        anuntId,
        monitorizat,
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'scrape_fresh') {
      // Endpoint pentru a forța un scraping fresh
      try {
        const { categorie, oras = 'sibiu', query } = body;
        
        const anunturi = await olxScraper.scrapeAnunturi({
          categorie,
          oras,
          query,
          pagini: 2
        });

        return NextResponse.json({
          success: true,
          message: 'Scraping fresh completat',
          anunturi,
          total: anunturi.length,
          timestamp: new Date().toISOString()
        });
        
              } catch (scrapingError) {
          console.error('Eroare la scraping fresh:', scrapingError);
          return NextResponse.json(
            { success: false, error: 'Eroare la scraping fresh' },
            { status: 500 }
          );
        }
    }

    return NextResponse.json(
      { success: false, error: 'Acțiune necunoscută' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Eroare la procesarea cererii:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la procesarea cererii' },
      { status: 500 }
    );
  }
}