'use client';

import React, { useState } from "react";

interface Anunt {
  id: number;
  titlu: string;
  pret: number;
  locatie: string;
  tip: string;
  categorie: string;
  selectat: boolean;
}

interface Filtre {
  categorie: string;
  titlu: string;
  pretMax: string;
  tip: string;
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
  { id: "telefoane", label: "Telefoane" },
  { id: "electronice", label: "Electronice" },
  { id: "auto", label: "Auto" },
  { id: "moda", label: "Modă" },
  { id: "servicii", label: "Servicii" },
];

const anunturiMock: Anunt[] = [
  {
    id: 1,
    titlu: "Casă individuală, 4 camere, zona Turnișor",
    pret: 120000,
    locatie: "Sibiu",
    tip: "Casă",
    categorie: "imobiliare",
    selectat: false,
  },
  {
    id: 2,
    titlu: "Vilă modernă, 5 camere, Calea Cisnădiei",
    pret: 185000,
    locatie: "Sibiu",
    tip: "Vilă",
    categorie: "imobiliare",
    selectat: false,
  },
  {
    id: 3,
    titlu: "iPhone 13 Pro Max, 256GB, ca nou",
    pret: 4200,
    locatie: "Sibiu",
    tip: "Telefon",
    categorie: "telefoane",
    selectat: false,
  },
];

const TABURI: Tab[] = [
  { id: "home", label: "🏠 Acasă" },
  { id: "monitorizare", label: "📊 Monitorizare" },
  { id: "toate", label: "📋 Toate anunțurile" },
];

interface BaraTaburiProps {
  tab: string;
  setTab: (tab: string) => void;
}

function BaraTaburi({ tab, setTab }: BaraTaburiProps) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
      {TABURI.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: '12px 24px',
            borderRadius: 12,
            border: 'none',
            background: tab === t.id ? '#000' : 'rgba(0,0,0,0.1)',
            color: tab === t.id ? '#eab308' : '#ca8a04',
            fontWeight: 600,
            fontSize: '0.95em',
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
        Monitorizare inteligentă OLX + Deployment automat
      </p>
      <p className="text-sm text-yellow-800 mb-8">
        Powered by Node.js 22 • Next.js 14 • TypeScript • Tailwind CSS
      </p>

      <div className="flex items-center gap-2 justify-center text-sm font-mono bg-green-600/20 text-green-800 px-4 py-3 rounded-lg border border-green-600/30 mb-8 max-w-md mx-auto">
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        Deployment automat activat via GitHub Actions
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">🔍</div>
          <h3 className="font-bold text-yellow-900 mb-2">Monitorizare OLX</h3>
          <p className="text-sm text-yellow-800">Urmărește anunțurile care te interesează și primește notificări automate</p>
        </div>
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">🚀</div>
          <h3 className="font-bold text-yellow-900 mb-2">Deployment Automat</h3>
          <p className="text-sm text-yellow-800">Orice commit pe GitHub se deploiază automat pe orex.site</p>
        </div>
        <div className="bg-black/5 p-6 rounded-xl border border-yellow-200">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-bold text-yellow-900 mb-2">Statistici Live</h3>
          <p className="text-sm text-yellow-800">Analiză în timp real a prețurilor și tendințelor de pe OLX</p>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center mt-8">
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
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          📚 Documentație Next.js
        </a>
      </div>
    </div>
  );
}

interface FiltreMonitorizareProps {
  filtre: Filtre;
  setFiltre: React.Dispatch<React.SetStateAction<Filtre>>;
}

function FiltreMonitorizare({ filtre, setFiltre }: FiltreMonitorizareProps) {
  return (
    <div className="bg-black/5 p-6 rounded-xl border border-yellow-200 mb-6">
      <h3 className="font-bold text-yellow-900 mb-4">🔍 Filtre de căutare</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          placeholder="Preț maxim (€)"
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
          <option value="Vilă">Vilă</option>
          <option value="Telefon">Telefon</option>
        </select>
      </div>
    </div>
  );
}

interface ListaAnunturiProps {
  anunturi: Anunt[];
  toggleMonitorizare: (id: number) => void;
  titlu: string;
}

function ListaAnunturi({ anunturi, toggleMonitorizare, titlu }: ListaAnunturiProps) {
  return (
    <div>
      <h3 className="font-bold text-yellow-900 mb-6 text-xl">{titlu}</h3>
      {anunturi.length === 0 ? (
        <div className="text-center py-12 text-yellow-700">
          <div className="text-4xl mb-4">🔍</div>
          <p>Nu sunt anunțuri pentru criteriile selectate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt: Anunt) => (
            <div key={anunt.id} className="bg-white p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  {CATEGORII_OLX.find(c => c.id === anunt.categorie)?.label}
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
              
              <h4 className="font-bold text-yellow-900 mb-2 line-clamp-2">{anunt.titlu}</h4>
              
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>💰 Preț:</span>
                  <span className="font-bold">{anunt.pret.toLocaleString()} EUR</span>
                </div>
                <div className="flex justify-between">
                  <span>📍 Locație:</span>
                  <span>{anunt.locatie}</span>
                </div>
                <div className="flex justify-between">
                  <span>🏷️ Tip:</span>
                  <span>{anunt.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [filtre, setFiltre] = useState<Filtre>({ categorie: "", titlu: "", pretMax: "", tip: "" });
  const [anunturi, setAnunturi] = useState<Anunt[]>(anunturiMock);
  const [tab, setTab] = useState<string>("home");

  const anunturiFiltrate = anunturi.filter(a =>
    (!filtre.categorie || a.categorie === filtre.categorie) &&
    (!filtre.titlu || a.titlu.toLowerCase().includes(filtre.titlu.toLowerCase())) &&
    (!filtre.pretMax || a.pret <= parseInt(filtre.pretMax)) &&
    (!filtre.tip || a.tip === filtre.tip)
  );

  const toggleMonitorizare = (id: number) => {
    setAnunturi(anunturi =>
      anunturi.map(a =>
        a.id === id ? { ...a, selectat: !a.selectat } : a
      )
    );
  };

  const anunturiMonitorizate = anunturiFiltrate.filter(a => a.selectat);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 w-full max-w-6xl">
        <BaraTaburi tab={tab} setTab={setTab} />
        
        {tab === "home" && <HomeSection />}
        
        {tab === "monitorizare" && (
          <>
            <FiltreMonitorizare filtre={filtre} setFiltre={setFiltre} />
            <ListaAnunturi 
              anunturi={anunturiMonitorizate} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="📊 Anunțuri monitorizate"
            />
          </>
        )}
        
        {tab === "toate" && (
          <>
            <FiltreMonitorizare filtre={filtre} setFiltre={setFiltre} />
            <ListaAnunturi 
              anunturi={anunturiFiltrate} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="📋 Toate anunțurile disponibile"
            />
          </>
        )}
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-yellow-800">
        <div className="flex items-center gap-2">
          <span>🚀</span>
          <span>Deployment automat pe commit</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>Next.js 14 + TypeScript</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🟡</span>
          <span>OLX Monitor + Git pull integrare!</span>
        </div>
      </footer>
    </div>
  );
}
