import axios from 'axios';

export interface AnuntOLX {
  id: string;
  titlu: string;
  pret: number;
  valuta: string;
  locatie: string;
  tip: string;
  categorie: string;
  dataPublicare: string;
  imagine: string;
  url: string;
  descriere: string;
  selectat?: boolean;
  metri?: string;
  camere?: string;
  etaj?: string;
  [key: string]: any;
}

export interface CategorieOLX {
  id: string;
  nume: string;
  url: string;
  emojis: string;
}

export const CATEGORII_OLX: CategorieOLX[] = [
  { id: 'imobiliare', nume: 'Imobiliare', url: '/imobiliare/', emojis: '🏠' },
  { id: 'auto-moto', nume: 'Auto/Moto', url: '/auto-motociclete-barci/', emojis: '🚗' },
  { id: 'electronice', nume: 'Electronice & IT', url: '/electronice-tehnologie/', emojis: '💻' },
  { id: 'telefoane', nume: 'Telefoane/Tablete', url: '/telefoane-tablete/', emojis: '📱' },
  { id: 'moda', nume: 'Modă', url: '/moda-frumusete/', emojis: '👕' },
  { id: 'casa-gradina', nume: 'Casă & Grădină', url: '/casa-gradina/', emojis: '🌱' },
  { id: 'mama-copil', nume: 'Mama & Copilul', url: '/mama-copilul/', emojis: '👶' },
  { id: 'animale', nume: 'Animale de companie', url: '/animale/', emojis: '🐕' },
  { id: 'sport', nume: 'Sport & Timp liber', url: '/sport-timp-liber/', emojis: '⚽' },
  { id: 'servicii', nume: 'Servicii', url: '/servicii/', emojis: '🔧' },
];

export const ORASE_PRINCIPALE = [
  'bucuresti', 'cluj', 'timisoara', 'iasi', 'constanta', 'craiova', 
  'brasov', 'galati', 'ploiesti', 'oradea', 'braila', 'arad', 
  'pitesti', 'sibiu', 'bacau', 'targu-mures', 'baia-mare', 'buzau'
];

class OLXScraper {
  private baseURL = 'https://www.olx.ro';
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  private async fetchPage(url: string): Promise<string> {
    try {
      console.log(`🔍 Fetching: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ro-RO,ro;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 15000,
      });
      
      console.log(`✅ Fetched successfully: ${response.data.length} chars`);
      return response.data;
    } catch (error) {
      console.error('❌ Eroare la fetchPage:', error);
      throw new Error(`Nu s-a putut accesa pagina: ${url}`);
    }
  }

  private extractAnunturiFromHTML(html: string, categorie: string): AnuntOLX[] {
    const anunturi: AnuntOLX[] = [];
    
    try {
      // Căutăm prin regex pentru structurile JSON din HTML
      const scriptRegex = /<script[^>]*>.*?window\.__NEXT_DATA__\s*=\s*({.*?});.*?<\/script>/gs;
      const match = scriptRegex.exec(html);
      
      if (match) {
        try {
          const nextData = JSON.parse(match[1]);
          const pageProps = nextData?.props?.pageProps;
          
          if (pageProps?.data?.ads) {
            pageProps.data.ads.forEach((ad: any, index: number) => {
              const anunt = this.parseAnuntFromAPI(ad, categorie, index);
              if (anunt) anunturi.push(anunt);
            });
          }
        } catch (jsonError) {
          console.warn('Nu s-a putut parsa JSON-ul Next.js, folosind parsing HTML simplu');
        }
      }
      
      // Fallback: căutăm prin HTML simplu
      if (anunturi.length === 0) {
        const adRegex = /<div[^>]*data-cy="l-card"[^>]*>.*?<\/div>/gs;
        const matches = html.match(adRegex) || [];
        
        matches.forEach((adHtml, index) => {
          const anunt = this.parseAnuntFromHTML(adHtml, categorie, index);
          if (anunt) anunturi.push(anunt);
        });
      }
      
    } catch (error) {
      console.error('Eroare la extragerea anunțurilor:', error);
    }
    
    return anunturi;
  }

  private parseAnuntFromAPI(ad: any, categorie: string, index: number): AnuntOLX | null {
    try {
      const id = ad.id || `api_${Date.now()}_${index}`;
      const titlu = ad.title || `Anunț OLX ${index + 1}`;
      
      // Parsează prețul
      let pret = 0;
      let valuta = 'lei';
      
      if (ad.price?.value) {
        pret = parseInt(ad.price.value) || 0;
        valuta = ad.price.currency?.toLowerCase() || 'lei';
        if (valuta === 'eur' || valuta === 'euro') valuta = 'EUR';
        if (valuta === 'usd' || valuta === '$') valuta = 'USD';
        if (valuta === 'ron' || valuta === 'lei') valuta = 'LEI';
      }
      
      const locatie = ad.location?.city?.name || ad.location?.region?.name || 'România';
      const imagine = ad.photos?.[0]?.link || `https://via.placeholder.com/300x200?text=OLX`;
      const url = `${this.baseURL}/d/oferta/${ad.slug || id}`;
      
      return {
        id: id.toString(),
        titlu,
        pret,
        valuta,
        locatie,
        tip: this.determinaTipAnunt(titlu),
        categorie,
        dataPublicare: ad.created_time || new Date().toISOString().split('T')[0],
        imagine,
        url,
        descriere: ad.description || titlu,
        selectat: false
      };
    } catch (error) {
      console.error('Eroare la parsarea anunțului din API:', error);
      return null;
    }
  }

  private parseAnuntFromHTML(adHtml: string, categorie: string, index: number): AnuntOLX | null {
    try {
      const titleMatch = adHtml.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/i) || 
                        adHtml.match(/title="([^"]+)"/i);
      const titlu = titleMatch?.[1]?.trim() || `Anunț OLX ${index + 1}`;
      
      const priceMatch = adHtml.match(/(\d{1,3}(?:[.,]\d{3})*)\s*(lei|eur|euro|\$|€)/i);
      let pret = 0;
      let valuta = 'LEI';
      
      if (priceMatch) {
        pret = parseInt(priceMatch[1].replace(/[.,]/g, '')) || 0;
        valuta = priceMatch[2].toUpperCase();
        if (valuta.includes('EUR') || valuta === '€') valuta = 'EUR';
        if (valuta === '$') valuta = 'USD';
      }
      
      const locationMatch = adHtml.match(/<span[^>]*>([^<]*(?:București|Cluj|Iași|Timișoara|Constanța|Sibiu|Brașov|Craiova|Galați|Ploiești)[^<]*)<\/span>/i);
      const locatie = locationMatch?.[1]?.trim() || 'România';
      
      const imageMatch = adHtml.match(/src="([^"]*apollo[^"]*)"/i) || 
                        adHtml.match(/src="([^"]*olx[^"]*)"/i);
      const imagine = imageMatch?.[1] || `https://via.placeholder.com/300x200?text=OLX`;
      
      const linkMatch = adHtml.match(/href="([^"]*\/d\/oferta\/[^"]*)"/i);
      const url = linkMatch?.[1]?.startsWith('http') ? linkMatch[1] : this.baseURL + (linkMatch?.[1] || '');
      
      const id = url.match(/ID([A-Za-z0-9]+)/)?.[1] || `html_${Date.now()}_${index}`;
      
      return {
        id,
        titlu,
        pret,
        valuta,
        locatie,
        tip: this.determinaTipAnunt(titlu),
        categorie,
        dataPublicare: new Date().toISOString().split('T')[0],
        imagine,
        url,
        descriere: titlu,
        selectat: false
      };
    } catch (error) {
      console.error('Eroare la parsarea anunțului din HTML:', error);
      return null;
    }
  }

  private determinaTipAnunt(titlu: string): string {
    const titluLower = titlu.toLowerCase();
    
    // Imobiliare
    if (titluLower.includes('apartament') || titluLower.includes('garsoniera')) return 'Apartament';
    if (titluLower.includes('casa') || titluLower.includes('vila')) return 'Casă';
    if (titluLower.includes('teren')) return 'Teren';
    if (titluLower.includes('spatiu') || titluLower.includes('birouri')) return 'Spațiu comercial';
    
    // Electronice
    if (titluLower.includes('iphone') || titluLower.includes('samsung') || titluLower.includes('telefon')) return 'Telefon';
    if (titluLower.includes('laptop') || titluLower.includes('calculator')) return 'Laptop';
    if (titluLower.includes('tv') || titluLower.includes('televizor')) return 'TV';
    if (titluLower.includes('tablet') || titluLower.includes('ipad')) return 'Tablet';
    
    // Auto
    if (titluLower.includes('bmw') || titluLower.includes('audi') || titluLower.includes('mercedes') || 
        titluLower.includes('volkswagen') || titluLower.includes('ford') || titluLower.includes('opel')) return 'Autoturism';
    if (titluLower.includes('suv') || titluLower.includes('jeep')) return 'SUV';
    if (titluLower.includes('motocicleta') || titluLower.includes('scuter')) return 'Motocicletă';
    
    return 'Altele';
  }

  public async scrapeAnunturi(options: {
    categorie?: string;
    oras?: string;
    query?: string;
    pretMin?: number;
    pretMax?: number;
    pagini?: number;
  } = {}): Promise<AnuntOLX[]> {
    const { categorie = '', oras = '', query = '', pretMin, pretMax, pagini = 1 } = options;
    
    console.log(`🚀 Începe scraping OLX cu opțiunile:`, options);
    
    const anunturi: AnuntOLX[] = [];
    
    for (let pagina = 1; pagina <= pagini; pagina++) {
      try {
        // Construiește URL-ul de căutare
        let searchUrl = this.baseURL;
        
        if (oras) {
          searchUrl += `/${oras}`;
        }
        
        if (categorie && CATEGORII_OLX.find(c => c.id === categorie)) {
          const categorieObj = CATEGORII_OLX.find(c => c.id === categorie);
          if (categorieObj) {
            searchUrl += categorieObj.url;
          }
        }
        
        // Adaugă query parameters
        const params = new URLSearchParams();
        if (query) params.append('search[filter_float_text]', query);
        if (pretMin) params.append('search[filter_float_price:from]', pretMin.toString());
        if (pretMax) params.append('search[filter_float_price:to]', pretMax.toString());
        if (pagina > 1) params.append('page', pagina.toString());
        
        if (params.toString()) {
          searchUrl += '?' + params.toString();
        }
        
        console.log(`📄 Scraping pagina ${pagina}: ${searchUrl}`);
        
        const html = await this.fetchPage(searchUrl);
        const anunturiPagina = this.extractAnunturiFromHTML(html, categorie || 'general');
        
        if (anunturiPagina.length === 0) {
          console.log(`⚠️ Nu s-au găsit anunțuri pe pagina ${pagina}`);
          break;
        }
        
        anunturi.push(...anunturiPagina);
        console.log(`✅ Găsite ${anunturiPagina.length} anunțuri pe pagina ${pagina}`);
        
        // Delay între requests pentru a nu fi blocați
        if (pagina < pagini) {
          await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
        }
        
      } catch (error) {
        console.error(`❌ Eroare la scraping pagina ${pagina}:`, error);
        break;
      }
    }
    
    console.log(`🎉 Scraping finalizat: ${anunturi.length} anunțuri găsite`);
    return anunturi;
  }

  public generateMockData(count: number = 10): AnuntOLX[] {
    const mockAnunturi: AnuntOLX[] = [];
    const categorii = CATEGORII_OLX;
    const orase = ['București', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Brașov', 'Sibiu'];
    
    const templates = [
      { titlu: 'Apartament {nr} camere, {zona}', categorie: 'imobiliare', tip: 'Apartament', pretRange: [50000, 150000] },
      { titlu: 'iPhone {model} {capacitate}GB, {stare}', categorie: 'telefoane', tip: 'Telefon', pretRange: [2000, 6000] },
      { titlu: 'BMW {model}, {an}, {km} km', categorie: 'auto-moto', tip: 'Autoturism', pretRange: [15000, 80000] },
      { titlu: 'Laptop {marca} {procesor}, {ram}GB RAM', categorie: 'electronice', tip: 'Laptop', pretRange: [2000, 8000] },
    ];
    
    for (let i = 0; i < count; i++) {
      const template = templates[i % templates.length];
      const oras = orase[i % orase.length];
      const categorie = categorii.find(c => c.id === template.categorie)!;
      
      let titlu = template.titlu;
      titlu = titlu.replace('{nr}', String(Math.floor(Math.random() * 4) + 1));
      titlu = titlu.replace('{zona}', ['Centru', 'Florești', 'Mănăștur', 'Gheorgheni'][Math.floor(Math.random() * 4)]);
      titlu = titlu.replace('{model}', ['13 Pro', '14', '15 Pro Max'][Math.floor(Math.random() * 3)]);
      titlu = titlu.replace('{capacitate}', ['128', '256', '512'][Math.floor(Math.random() * 3)]);
      titlu = titlu.replace('{stare}', ['nou', 'ca nou', 'foarte bună'][Math.floor(Math.random() * 3)]);
      titlu = titlu.replace('{marca}', ['ASUS', 'Lenovo', 'HP', 'Dell'][Math.floor(Math.random() * 4)]);
      titlu = titlu.replace('{procesor}', ['i5', 'i7', 'Ryzen 5'][Math.floor(Math.random() * 3)]);
      titlu = titlu.replace('{ram}', ['8', '16', '32'][Math.floor(Math.random() * 3)]);
      titlu = titlu.replace('{an}', String(2018 + Math.floor(Math.random() * 6)));
      titlu = titlu.replace('{km}', String(Math.floor(Math.random() * 100) * 1000));
      
      const pretMin = template.pretRange[0];
      const pretMax = template.pretRange[1];
      const pret = Math.floor(Math.random() * (pretMax - pretMin) + pretMin);
      
      mockAnunturi.push({
        id: `mock_${i + 1}`,
        titlu,
        pret,
        valuta: template.categorie === 'imobiliare' || template.categorie === 'auto-moto' ? 'EUR' : 'LEI',
        locatie: oras,
        tip: template.tip,
        categorie: template.categorie,
        dataPublicare: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        imagine: `https://via.placeholder.com/300x200/${categorie.id === 'imobiliare' ? '10b981' : categorie.id === 'telefoane' ? '3b82f6' : categorie.id === 'auto-moto' ? 'f59e0b' : '8b5cf6'}/white?text=${template.tip}`,
        url: `https://www.olx.ro/d/oferta/mock-${i + 1}`,
        descriere: `${titlu} - anunț de calitate cu toate detaliile necesare.`,
        selectat: false
      });
    }
    
    return mockAnunturi;
  }
}

export const olxScraper = new OLXScraper();