import axios from 'axios';
import * as cheerio from 'cheerio';

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
}

export interface CategorieOLX {
  id: string;
  nume: string;
  url: string;
}

export const CATEGORII_OLX: CategorieOLX[] = [
  { id: 'imobiliare', nume: 'Imobiliare', url: '/imobiliare/' },
  { id: 'auto-moto', nume: 'Auto/Moto', url: '/auto-motociclete-barci/' },
  { id: 'electronice', nume: 'Electronice & IT', url: '/electronice-tehnologie/' },
  { id: 'telefoane', nume: 'Telefoane/Tablete', url: '/telefoane-tablete/' },
  { id: 'moda', nume: 'Modă', url: '/moda-frumusete/' },
  { id: 'casa-gradina', nume: 'Casă & Grădină', url: '/casa-gradina/' },
  { id: 'mama-copil', nume: 'Mama & Copilul', url: '/mama-copilul/' },
  { id: 'animale', nume: 'Animale de companie', url: '/animale/' },
  { id: 'sport', nume: 'Sport & Timp liber', url: '/sport-timp-liber/' },
  { id: 'muzica', nume: 'Muzică & Educație', url: '/muzica-educatie/' },
  { id: 'locuri-de-munca', nume: 'Locuri de muncă', url: '/locuri-de-munca/' },
  { id: 'servicii', nume: 'Servicii', url: '/servicii/' },
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
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('Eroare la fetchPage:', error);
      throw new Error(`Nu s-a putut accesa pagina: ${url}`);
    }
  }

  private extractAnuntFromElement($: cheerio.CheerioAPI, index: number): AnuntOLX | null {
    try {
      // Găsește elementul după index
      const cardSelector = '[data-cy="l-card"]';
      const $el = $(cardSelector).eq(index);
      
      if ($el.length === 0) return null;
      
      // Extrage URL-ul anunțului
      const relativeUrl = $el.attr('href') || $el.find('a').first().attr('href');
      if (!relativeUrl) return null;
      
      const url = relativeUrl.startsWith('http') ? relativeUrl : this.baseURL + relativeUrl;
      
      // Extrage ID-ul din URL
      const idMatch = url.match(/ID([A-Za-z0-9]+)/);
      const id = idMatch ? idMatch[1] : `anunt_${Date.now()}_${index}`;
      
      // Extrage titlul
      const titlu = $el.find('h6').text().trim() || 
                   $el.find('h4').text().trim() ||
                   $el.find('[data-cy="ad-title"]').text().trim() ||
                   `Anunț OLX ${index + 1}`;
      
      // Extrage prețul
      const pretText = $el.find('[data-testid="ad-price"]').text().trim() ||
                       $el.find('.price').text().trim() ||
                       $el.find('[class*="price"]').text().trim() ||
                       '0 lei';
      
      const pretMatch = pretText.match(/([0-9.,]+)\s*(lei|eur|euro|\$|€)/i);
      let pret = 0;
      let valuta = 'lei';
      
      if (pretMatch) {
        pret = parseInt(pretMatch[1].replace(/[.,]/g, '')) || 0;
        valuta = pretMatch[2].toLowerCase();
        if (valuta.includes('eur') || valuta === '€') valuta = 'eur';
        if (valuta === '$') valuta = 'usd';
      }
      
      // Extrage locația
      const locatie = $el.find('[data-testid="location-date"]').text().split(' - ')[0]?.trim() ||
                      $el.find('.location').text().trim() ||
                      $el.find('[class*="location"]').text().trim() ||
                      'România';
      
      // Extrage imaginea
      const imagine = $el.find('img').first().attr('src') || 
                      $el.find('img').first().attr('data-src') ||
                      'https://via.placeholder.com/300x200?text=OLX';
      
      // Extrage data publicării
      const dataText = $el.find('[data-testid="location-date"]').text().split(' - ')[1]?.trim() ||
                       $el.find('.date').text().trim() ||
                       'azi';
      
      const dataPublicare = this.normalizeDate(dataText);
      
      return {
        id,
        titlu,
        pret,
        valuta,
        locatie,
        tip: this.determinaTipAnunt(titlu),
        categorie: 'general',
        dataPublicare,
        imagine,
        url,
        descriere: titlu,
        selectat: false
      };
    } catch (error) {
      console.error('Eroare la extragerea anunțului:', error);
      return null;
    }
  }

  private normalizeDate(dateText: string): string {
    const today = new Date();
    
    if (dateText.includes('azi')) {
      return today.toISOString().split('T')[0];
    } else if (dateText.includes('ieri')) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString().split('T')[0];
    } else if (dateText.match(/\d+\s*(zi|zile)/)) {
      const days = parseInt(dateText.match(/\d+/)?.[0] || '0');
      const date = new Date(today);
      date.setDate(date.getDate() - days);
      return date.toISOString().split('T')[0];
    }
    
    return today.toISOString().split('T')[0];
  }

  private determinaTipAnunt(titlu: string): string {
    const titluLower = titlu.toLowerCase();
    
    if (titluLower.includes('apartament') || titluLower.includes('garsoniera')) return 'Apartament';
    if (titluLower.includes('casa') || titluLower.includes('vila')) return 'Casă';
    if (titluLower.includes('teren')) return 'Teren';
    if (titluLower.includes('iphone') || titluLower.includes('samsung') || titluLower.includes('telefon')) return 'Telefon';
    if (titluLower.includes('laptop') || titluLower.includes('calculator')) return 'Laptop';
    if (titluLower.includes('bmw') || titluLower.includes('audi') || titluLower.includes('mercedes')) return 'Autoturism';
    
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
        if (query) params.append('search[filter_text_like]', query);
        if (pretMin) params.append('search[filter_float_price:from]', pretMin.toString());
        if (pretMax) params.append('search[filter_float_price:to]', pretMax.toString());
        if (pagina > 1) params.append('page', pagina.toString());
        
        if (params.toString()) {
          searchUrl += '?' + params.toString();
        }
        
        console.log(`Scraping pagina ${pagina}: ${searchUrl}`);
        
        const html = await this.fetchPage(searchUrl);
        const $ = cheerio.load(html);
        
        // Găsește numărul de anunțuri
        const anuntElements = $('[data-cy="l-card"]');
        const numAnunturi = anuntElements.length;
        
        if (numAnunturi === 0) {
          console.log('Nu s-au găsit anunțuri pe această pagină');
          break;
        }
        
        // Procesează fiecare anunț
        for (let i = 0; i < numAnunturi; i++) {
          const anunt = this.extractAnuntFromElement($, i);
          if (anunt) {
            anunt.categorie = categorie || 'general';
            anunturi.push(anunt);
          }
        }
        
        // Delay între requests pentru a nu fi blocați
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Eroare la scraping pagina ${pagina}:`, error);
        break;
      }
    }
    
    console.log(`S-au găsit ${anunturi.length} anunțuri`);
    return anunturi;
  }

  public async scrapeDetaliiAnunt(url: string): Promise<Partial<AnuntOLX> | null> {
    try {
      const html = await this.fetchPage(url);
      const $ = cheerio.load(html);
      
      const descriere = $('.css-g5mtvm-Text').text().trim() ||
                       $('[data-cy="ad_description"]').text().trim() ||
                       $('.css-1t507yq').text().trim() ||
                       'Fără descriere disponibilă';
      
      const imagini = $('img').map((i, el) => $(el).attr('src')).get()
                       .filter(src => src && src.includes('apollo'))
                       .slice(0, 5);
      
      return {
        descriere,
        imagine: imagini[0] || 'https://via.placeholder.com/300x200?text=OLX'
      };
      
    } catch (error) {
      console.error('Eroare la scraping detalii anunt:', error);
      return null;
    }
  }
}

export const olxScraper = new OLXScraper();