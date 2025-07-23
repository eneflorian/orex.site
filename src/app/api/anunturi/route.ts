import { NextRequest, NextResponse } from 'next/server';

// Mock data pentru început - în viitor va fi înlocuit cu scraping real
const anunturiMock = [
  {
    id: 1,
    titlu: "Casă individuală, 4 camere, zona Turnișor",
    pret: 120000,
    locatie: "Sibiu",
    tip: "Casă",
    categorie: "imobiliare",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/casa-individuala-4-camere-zona-turnisor",
    descriere: "Casă frumoasă în zona Turnișor, 4 camere, grădină mare",
  },
  {
    id: 2,
    titlu: "Vilă modernă, 5 camere, Calea Cisnădiei",
    pret: 185000,
    locatie: "Sibiu",
    tip: "Vilă",
    categorie: "imobiliare",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/vila-moderna-5-camere-calea-cisnadiei",
    descriere: "Vilă modernă cu 5 camere, finisaje premium",
  },
  {
    id: 3,
    titlu: "Casă de vânzare, 3 camere, Șelimbăr",
    pret: 95000,
    locatie: "Șelimbăr",
    tip: "Casă",
    categorie: "imobiliare",
    dataPublicare: "2025-01-22",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/casa-de-vanzare-3-camere-selimbar",
    descriere: "Casă cu 3 camere în Șelimbăr, teren generos",
  },
  {
    id: 4,
    titlu: "iPhone 13 Pro Max, 256GB, ca nou",
    pret: 4200,
    locatie: "Sibiu",
    tip: "Telefon",
    categorie: "telefoane",
    dataPublicare: "2025-01-23",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/iphone-13-pro-max-256gb-ca-nou",
    descriere: "iPhone 13 Pro Max în stare excelentă, utilizat cu grijă",
  },
  {
    id: 5,
    titlu: "BMW X5, 2018, 150.000 km",
    pret: 35000,
    locatie: "Sibiu",
    tip: "SUV",
    categorie: "auto",
    dataPublicare: "2025-01-22",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/bmw-x5-2018-150000-km",
    descriere: "BMW X5 în stare foarte bună, service la zi",
  },
  {
    id: 6,
    titlu: "Laptop gaming ASUS ROG, RTX 3070",
    pret: 6500,
    locatie: "Sibiu",
    tip: "Laptop",
    categorie: "electronice",
    dataPublicare: "2025-01-21",
    imagine: "https://via.placeholder.com/300x200",
    url: "https://www.olx.ro/d/oferta/laptop-gaming-asus-rog-rtx-3070",
    descriere: "Laptop gaming performant pentru jocuri și design",
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

    // Filtrare anunturi
    let anunturiFiltrate = anunturiMock;

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

    return NextResponse.json({
      success: true,
      anunturi: anunturiFiltrate,
      total: anunturiFiltrate.length,
      filtreAplicate: {
        categorie,
        titlu,
        pretMax,
        tip,
        locatie
      }
    });

  } catch (error) {
    console.error('Eroare la obținerea anunțurilor:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Eroare la obținerea anunțurilor',
        anunturi: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, anuntId } = body;

    if (action === 'toggle_monitorizare') {
      // În viitor, aici va fi logica pentru salvarea în baza de date
      return NextResponse.json({
        success: true,
        message: `Anuntul ${anuntId} ${body.monitorizat ? 'adăugat la' : 'eliminat din'} monitorizare`,
        anuntId,
        monitorizat: body.monitorizat
      });
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