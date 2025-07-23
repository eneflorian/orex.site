'use client';

import React, { useState, useEffect } from "react";

interface Anunt {
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

interface Filtre {
  categorie: string;
  titlu: string;
  pretMax: string;
  tip: string;
  oras: string;
}

interface Statistici {
  pretMediu: number;
  pretMin: number;
  pretMax: number;
  categorii: number;
}

interface Tab {
  id: string;
  label: string;
}

interface Categorie {
  id: string;
  label: string;
}

const CATEGORII_OLX: Categorie[] = [
  { id: "imobiliare", label: "Imobiliare" },
  { id: "telefoane", label: "Telefoane/Tablete" },
  { id: "electronice", label: "Electronice & IT" },
  { id: "auto-moto", label: "Auto/Moto" },
  { id: "moda", label: "Modă" },
  { id: "casa-gradina", label: "Casă & Grădină" },
  { id: "servicii", label: "Servicii" },
];

const ORASE = [
  { id: "sibiu", label: "Sibiu" },
  { id: "bucuresti", label: "București" },
  { id: "cluj", label: "Cluj-Napoca" },
  { id: "timisoara", label: "Timișoara" },
  { id: "iasi", label: "Iași" },
  { id: "constanta", label: "Constanța" },
  { id: "brasov", label: "Brașov" },
];

const TABURI: Tab[] = [
  { id: "home", label: "🏠 Acasă" },
  { id: "monitorizare", label: "📊 Monitorizare" },
  { id: "toate", label: "📋 Toate anunțurile" },
  { id: "statistici", label: "📈 Statistici" },
];

interface BaraTaburiProps {
  tab: string;
  setTab: (tab: string) => void;
}

function BaraTaburi({ tab, setTab }: BaraTaburiProps) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
      {TABURI.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: '12px 20px',
            borderRadius: 12,
            border: 'none',
            background: tab === t.id ? '#000' : 'rgba(0,0,0,0.1)',
            color: tab === t.id ? '#eab308' : '#ca8a04',
            fontWeight: 600,
            fontSize: '0.9em',
            cursor: 'pointer',
            boxShadow: tab === t.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function HomeSection() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-black to-yellow-800 bg-clip-text text-transparent">
        OREX.SITE
      </h1>
      <p className="text-xl text-yellow-900 mb-2">
        🔍 Monitor inteligent OLX cu scraping în timp real
      </p>
      <p className="text-sm text-yellow-800 mb-8">
        Powered by Node.js 22 • Next.js 14 • TypeScript • Cheerio • Axios
      </p>

      <div className="flex items-center gap-2 justify-center text-sm font-mono bg-green-600/20 text-green-800 px-4 py-3 rounded-lg border border-green-600/30 mb-8 max-w-md mx-auto">
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        Deployment automat + Scraping OLX live
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">🔍</div>
          <h3 className="font-bold text-yellow-900 mb-2">Scraping Live</h3>
          <p className="text-sm text-yellow-800">Extrage anunțuri direct de pe OLX.ro în timp real</p>
        </div>
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-bold text-yellow-900 mb-2">Monitorizare</h3>
          <p className="text-sm text-yellow-800">Urmărește anunțurile favorite și primește notificări</p>
        </div>
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">🚀</div>
          <h3 className="font-bold text-yellow-900 mb-2">Auto Deploy</h3>
          <p className="text-sm text-yellow-800">Commit pe GitHub → Deploy automat pe orex.site</p>
        </div>
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">📈</div>
          <h3 className="font-bold text-yellow-900 mb-2">Statistici</h3>
          <p className="text-sm text-yellow-800">Analiză prețuri, tendințe și rapoarte detaliate</p>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center mt-8 flex-wrap">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-yellow-400 gap-2 hover:bg-gray-800 text-sm font-semibold h-12 px-6"
          href="https://github.com/eneflorian/orex.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Vezi pe GitHub
        </a>
        <a
          className="rounded-full border border-solid border-black/20 transition-colors flex items-center justify-center hover:bg-black/10 hover:border-black/40 text-yellow-900 text-sm h-12 px-6"
          href="https://www.olx.ro"
          target="_blank"
          rel="noopener noreferrer"
        >
          🛒 OLX.ro
        </a>
      </div>
    </div>
  );
}

interface FiltreProps {
  filtre: Filtre;
  setFiltre: React.Dispatch<React.SetStateAction<Filtre>>;
  onRefresh: () => void;
  loading: boolean;
}

function FiltreAvansate({ filtre, setFiltre, onRefresh, loading }: FiltreProps) {
  return (
    <div className="bg-black/5 p-6 rounded-xl border border-yellow-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-yellow-900">🔍 Filtre de căutare OLX</h3>
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            loading 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          {loading ? '🔄 Scraping...' : '🔄 Refresh Live'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <select
          value={filtre.oras}
          onChange={e => setFiltre((f: Filtre) => ({ ...f, oras: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {ORASE.map(oras => (
            <option key={oras.id} value={oras.id}>{oras.label}</option>
          ))}
        </select>
        
        <select
          value={filtre.categorie}
          onChange={e => setFiltre((f: Filtre) => ({ ...f, categorie: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Toate categoriile</option>
          {CATEGORII_OLX.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Caută după titlu..."
          value={filtre.titlu}
          onChange={e => setFiltre((f: Filtre) => ({ ...f, titlu: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        
        <input
          type="number"
          placeholder="Preț maxim (lei)"
          value={filtre.pretMax}
          onChange={e => setFiltre((f: Filtre) => ({ ...f, pretMax: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        
        <select
          value={filtre.tip}
          onChange={e => setFiltre((f: Filtre) => ({ ...f, tip: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-yellow-300 bg-white text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Toate tipurile</option>
          <option value="Casă">Casă</option>
          <option value="Apartament">Apartament</option>
          <option value="Telefon">Telefon</option>
          <option value="Laptop">Laptop</option>
          <option value="Autoturism">Autoturism</option>
        </select>
      </div>
    </div>
  );
}

interface ListaAnunturiProps {
  anunturi: Anunt[];
  toggleMonitorizare: (id: string) => void;
  titlu: string;
  loading: boolean;
  statistici?: Statistici;
}

function ListaAnunturi({ anunturi, toggleMonitorizare, titlu, loading, statistici }: ListaAnunturiProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4 animate-spin">🔄</div>
        <p className="text-yellow-700">Se încarcă anunțurile de pe OLX...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-yellow-900 text-xl">{titlu}</h3>
        {statistici && (
          <div className="text-sm text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg">
            📊 {anunturi.length} anunțuri • Preț mediu: {statistici.pretMediu.toLocaleString()} lei
          </div>
        )}
      </div>
      
      {anunturi.length === 0 ? (
        <div className="text-center py-12 text-yellow-700">
          <div className="text-4xl mb-4">🔍</div>
          <p>Nu sunt anunțuri pentru criteriile selectate.</p>
          <p className="text-sm mt-2">Încearcă să modifici filtrele sau să faci refresh.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt: Anunt) => (
            <div key={anunt.id} className="bg-white p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  {CATEGORII_OLX.find(c => c.id === anunt.categorie)?.label || anunt.categorie}
                </span>
                <button
                  onClick={() => toggleMonitorizare(anunt.id)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    anunt.selectat 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-800'
                  }`}
                >
                  {anunt.selectat ? '✅ Monitorizat' : '📌 Monitorizează'}
                </button>
              </div>
              
              <div className="mb-3">
                <img 
                  src={anunt.imagine} 
                  alt={anunt.titlu}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200?text=OLX';
                  }}
                />
              </div>
              
              <h4 className="font-bold text-yellow-900 mb-2 line-clamp-2">{anunt.titlu}</h4>
              
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>💰 Preț:</span>
                  <span className="font-bold">{anunt.pret.toLocaleString()} {anunt.valuta}</span>
                </div>
                <div className="flex justify-between">
                  <span>📍 Locație:</span>
                  <span>{anunt.locatie}</span>
                </div>
                <div className="flex justify-between">
                  <span>🏷️ Tip:</span>
                  <span>{anunt.tip}</span>
                </div>
                <div className="flex justify-between">
                  <span>📅 Data:</span>
                  <span>{anunt.dataPublicare}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <a
                  href={anunt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                >
                  🔗 Vezi pe OLX
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatisticiSection({ statistici, anunturi }: { statistici?: Statistici; anunturi: Anunt[] }) {
  if (!statistici) return null;

  const categoriiDistribute = anunturi.reduce((acc, anunt) => {
    acc[anunt.categorie] = (acc[anunt.categorie] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const oraseDistribute = anunturi.reduce((acc, anunt) => {
    acc[anunt.locatie] = (acc[anunt.locatie] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-yellow-900 text-xl mb-6">📈 Statistici anunțuri</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-2">💰</div>
          <h4 className="font-bold text-yellow-900">Preț mediu</h4>
          <p className="text-2xl font-bold text-green-600">{statistici.pretMediu.toLocaleString()} lei</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-bold text-yellow-900">Total anunțuri</h4>
          <p className="text-2xl font-bold text-blue-600">{anunturi.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-2">💵</div>
          <h4 className="font-bold text-yellow-900">Preț minim</h4>
          <p className="text-2xl font-bold text-red-600">{statistici.pretMin.toLocaleString()} lei</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-2">💎</div>
          <h4 className="font-bold text-yellow-900">Preț maxim</h4>
          <p className="text-2xl font-bold text-purple-600">{statistici.pretMax.toLocaleString()} lei</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <h4 className="font-bold text-yellow-900 mb-4">🏷️ Distribuție categorii</h4>
          <div className="space-y-2">
            {Object.entries(categoriiDistribute).map(([categorie, count]) => (
              <div key={categorie} className="flex justify-between">
                <span className="text-yellow-800">{CATEGORII_OLX.find(c => c.id === categorie)?.label || categorie}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-yellow-200">
          <h4 className="font-bold text-yellow-900 mb-4">📍 Distribuție orașe</h4>
          <div className="space-y-2">
            {Object.entries(oraseDistribute).slice(0, 10).map(([oras, count]) => (
              <div key={oras} className="flex justify-between">
                <span className="text-yellow-800">{oras}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [filtre, setFiltre] = useState<Filtre>({ 
    categorie: "", 
    titlu: "", 
    pretMax: "", 
    tip: "", 
    oras: "sibiu" 
  });
  const [anunturi, setAnunturi] = useState<Anunt[]>([]);
  const [tab, setTab] = useState<string>("home");
  const [loading, setLoading] = useState<boolean>(false);
  const [statistici, setStatistici] = useState<Statistici>();

  const fetchAnunturi = async (useMock = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtre.categorie) params.append('categorie', filtre.categorie);
      if (filtre.titlu) params.append('titlu', filtre.titlu);
      if (filtre.pretMax) params.append('pretMax', filtre.pretMax);
      if (filtre.tip) params.append('tip', filtre.tip);
      if (filtre.oras) params.append('oras', filtre.oras);
      if (useMock) params.append('mock', 'true');

      const response = await fetch(`/api/anunturi?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setAnunturi(data.anunturi);
        setStatistici(data.statistici);
        console.log(`✅ S-au încărcat ${data.total} anunțuri din sursa: ${data.metadata.source}`);
      } else {
        console.error('❌ Eroare la încărcarea anunțurilor:', data.error);
        setAnunturi([]);
      }
    } catch (error) {
      console.error('❌ Eroare la fetch:', error);
      setAnunturi([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonitorizare = async (id: string) => {
    try {
      const anunt = anunturi.find(a => a.id === id);
      if (!anunt) return;

      const response = await fetch('/api/anunturi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_monitorizare',
          anuntId: id,
          monitorizat: !anunt.selectat
        })
      });

      const data = await response.json();
      if (data.success) {
        setAnunturi(anunturi =>
          anunturi.map(a =>
            a.id === id ? { ...a, selectat: !a.selectat } : a
          )
        );
      }
    } catch (error) {
      console.error('Eroare la toggle monitorizare:', error);
    }
  };

  // Load data când se schimbă tab-ul
  useEffect(() => {
    if (tab !== "home") {
      fetchAnunturi(false); // Folosește scraping real
    }
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load data când se schimbă filtrele (cu delay pentru performance)
  useEffect(() => {
    if (tab !== "home") {
      const timeoutId = setTimeout(() => {
        fetchAnunturi(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [filtre, tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const anunturiMonitorizate = anunturi.filter(a => a.selectat);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-6xl">
        <BaraTaburi tab={tab} setTab={setTab} />
        
        {tab === "home" && <HomeSection />}
        
        {tab === "monitorizare" && (
          <>
            <FiltreAvansate filtre={filtre} setFiltre={setFiltre} onRefresh={() => fetchAnunturi(false)} loading={loading} />
            <ListaAnunturi 
              anunturi={anunturiMonitorizate} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="📊 Anunțuri monitorizate"
              loading={loading}
              statistici={statistici}
            />
          </>
        )}
        
        {tab === "toate" && (
          <>
            <FiltreAvansate filtre={filtre} setFiltre={setFiltre} onRefresh={() => fetchAnunturi(false)} loading={loading} />
            <ListaAnunturi 
              anunturi={anunturi} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="📋 Toate anunțurile OLX live"
              loading={loading}
              statistici={statistici}
            />
          </>
        )}

        {tab === "statistici" && (
          <StatisticiSection statistici={statistici} anunturi={anunturi} />
        )}
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-yellow-800">
        <div className="flex items-center gap-2">
          <span>🔍</span>
          <span>OLX Scraping în timp real</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🚀</span>
          <span>Deployment automat</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>Next.js 14 + TypeScript</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🟡</span>
          <span>Integrare completă olx-monitor!</span>
        </div>
      </footer>
    </div>
  );
}
