'use client';

import React, { useState, useEffect } from "react";
import { Search, Filter, RefreshCw, Eye, BarChart3, Home as HomeIcon, Settings, Star, MapPin, Calendar, Euro, Tag, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';

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
  icon: React.ReactNode;
  description: string;
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
  { 
    id: "home", 
    label: "Acasă", 
    icon: <HomeIcon className="w-4 h-4" />,
    description: "Pagina principală și ghidul de utilizare"
  },
  { 
    id: "monitorizare", 
    label: "Monitorizare", 
    icon: <Eye className="w-4 h-4" />,
    description: "Anunțurile tale favorite"
  },
  { 
    id: "toate", 
    label: "Toate anunțurile", 
    icon: <Search className="w-4 h-4" />,
    description: "Căutare și explorare anunțuri"
  },
  { 
    id: "statistici", 
    label: "Statistici", 
    icon: <BarChart3 className="w-4 h-4" />,
    description: "Analize și tendințe preț"
  },
];

interface BaraTaburiProps {
  tab: string;
  setTab: (tab: string) => void;
}

function BaraTaburi({ tab, setTab }: BaraTaburiProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
      <div className="flex overflow-x-auto gap-2">
        {TABURI.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 whitespace-nowrap group ${
              tab === t.id 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`transition-transform duration-200 ${tab === t.id ? 'scale-110' : 'group-hover:scale-105'}`}>
              {t.icon}
            </div>
            <div className="text-left">
              <div className="font-semibold">{t.label}</div>
              <div className={`text-xs ${tab === t.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {t.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeSection() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          OLX Monitor Live
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          OLX Scraper Pro
        </h1>
        
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          Monitorizează și analizează anunțurile de pe OLX.ro în timp real. 
          Găsește cele mai bune oferte cu tehnologia de scraping avansată.
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Next.js 14
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            TypeScript
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Real-time Scraping
          </div>
        </div>
      </div>

      {/* Ghid rapid de utilizare */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 mb-12 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Cum să folosești OLX Monitor
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">1. Caută anunțuri</h3>
            <p className="text-gray-600 text-sm">
              Mergi la "Toate anunțurile" și configurează filtrele pentru orașul și categoria dorită
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">2. Monitorizează</h3>
            <p className="text-gray-600 text-sm">
              Marchează anunțurile favorite și urmărește-le în secțiunea "Monitorizare"
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">3. Analizează</h3>
            <p className="text-gray-600 text-sm">
              Vezi statistici detaliate despre prețuri și tendințe de piață
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Scraping Live</h3>
          <p className="text-gray-600 text-sm">Extrage anunțuri direct de pe OLX.ro în timp real</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Monitorizare</h3>
          <p className="text-gray-600 text-sm">Urmărește anunțurile favorite și primește notificări</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Statistici</h3>
          <p className="text-gray-600 text-sm">Analiză prețuri, tendințe și rapoarte detaliate</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Flexibil</h3>
          <p className="text-gray-600 text-sm">Filtrare avansată și personalizare completă</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            href="https://github.com/eneflorian/olx-monitor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Vezi pe GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105"
            href="https://www.olx.ro"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-5 h-5" />
            OLX.ro
          </a>
        </div>
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Filtre de căutare</h3>
            <p className="text-gray-500 text-sm">Configurează criteriile pentru scraping OLX</p>
          </div>
        </div>
        
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            loading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Se încarcă...' : 'Refresh'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Oraș
          </label>
          <select
            value={filtre.oras}
            onChange={e => setFiltre((f: Filtre) => ({ ...f, oras: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {ORASE.map(oras => (
              <option key={oras.id} value={oras.id}>{oras.label}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Categorie
          </label>
          <select
            value={filtre.categorie}
            onChange={e => setFiltre((f: Filtre) => ({ ...f, categorie: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Toate categoriile</option>
            {CATEGORII_OLX.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Caută
          </label>
          <input
            type="text"
            placeholder="ex: iPhone, apartament..."
            value={filtre.titlu}
            onChange={e => setFiltre((f: Filtre) => ({ ...f, titlu: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Euro className="w-4 h-4" />
            Preț maxim
          </label>
          <input
            type="number"
            placeholder="ex: 50000"
            value={filtre.pretMax}
            onChange={e => setFiltre((f: Filtre) => ({ ...f, pretMax: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tip produs</label>
          <select
            value={filtre.tip}
            onChange={e => setFiltre((f: Filtre) => ({ ...f, tip: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Se încarcă anunțurile...</h3>
        <p className="text-gray-600">Extragere date de pe OLX.ro în curs</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{titlu}</h3>
          <p className="text-gray-600">
            {anunturi.length} {anunturi.length === 1 ? 'anunț găsit' : 'anunțuri găsite'}
          </p>
        </div>
        
        {statistici && anunturi.length > 0 && (
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-xl border border-blue-100">
            <div className="text-center">
              <div className="text-sm text-gray-600">Preț mediu</div>
              <div className="font-bold text-blue-600">{statistici.pretMediu.toLocaleString()} lei</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Minim</div>
              <div className="font-bold text-green-600">{statistici.pretMin.toLocaleString()} lei</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Maxim</div>
              <div className="font-bold text-purple-600">{statistici.pretMax.toLocaleString()} lei</div>
            </div>
          </div>
        )}
      </div>
      
      {anunturi.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nu s-au găsit anunțuri</h3>
          <p className="text-gray-600 mb-6">Încearcă să modifici filtrele sau să faci refresh pentru a încărca anunțuri noi.</p>
          <div className="flex justify-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Modifică orașul</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Schimbă categoria</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Mărește prețul maxim</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anunturi.map((anunt: Anunt) => (
            <div key={anunt.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={anunt.imagine} 
                  alt={anunt.titlu}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=OLX';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                    {CATEGORII_OLX.find(c => c.id === anunt.categorie)?.label || anunt.categorie}
                  </span>
                </div>
                <button
                  onClick={() => toggleMonitorizare(anunt.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    anunt.selectat 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:scale-110'
                  }`}
                >
                  <Star className={`w-4 h-4 ${anunt.selectat ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h4 className="font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
                  {anunt.titlu}
                </h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {anunt.pret.toLocaleString()} {anunt.valuta}
                    </span>
                    <span className="text-sm text-gray-500">{anunt.tip}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{anunt.locatie}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{anunt.dataPublicare}</span>
                  </div>
                </div>
                
                <a
                  href={anunt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  Vezi pe OLX
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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Statistici și analize</h3>
        <p className="text-gray-600">Tendințe de piață și distribuții pentru anunțurile găsite</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
            <Euro className="w-8 h-8" />
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">{statistici.pretMediu.toLocaleString()}</div>
          <div className="text-green-100">Preț mediu (lei)</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8" />
            <div className="text-2xl font-bold">{anunturi.length}</div>
          </div>
          <div className="text-3xl font-bold mb-1">{anunturi.length}</div>
          <div className="text-blue-100">Total anunțuri</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-pink-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8" />
            <Minus className="w-6 h-6 opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">{statistici.pretMin.toLocaleString()}</div>
          <div className="text-red-100">Preț minim (lei)</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <TrendingUp className="w-6 h-6 opacity-75" />
          </div>
          <div className="text-3xl font-bold mb-1">{statistici.pretMax.toLocaleString()}</div>
          <div className="text-purple-100">Preț maxim (lei)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribuție categorii */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Tag className="w-6 h-6 text-blue-500" />
            Distribuție categorii
          </h4>
          <div className="space-y-4">
            {Object.entries(categoriiDistribute).map(([categorie, count]) => {
              const percentage = (count / anunturi.length) * 100;
              return (
                <div key={categorie}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      {CATEGORII_OLX.find(c => c.id === categorie)?.label || categorie}
                    </span>
                    <span className="text-gray-900 font-bold">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Distribuție orașe */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-green-500" />
            Distribuție orașe
          </h4>
          <div className="space-y-4">
            {Object.entries(oraseDistribute).slice(0, 8).map(([oras, count]) => {
              const percentage = (count / anunturi.length) * 100;
              return (
                <div key={oras}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{oras}</span>
                    <span className="text-gray-900 font-bold">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
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

  // Load data când se schimbă filtrele (cu delay pentru performanță)
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
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BaraTaburi tab={tab} setTab={setTab} />
        
        {tab === "home" && <HomeSection />}
        
        {tab === "monitorizare" && (
          <div className="space-y-8">
            <FiltreAvansate filtre={filtre} setFiltre={setFiltre} onRefresh={() => fetchAnunturi(false)} loading={loading} />
            <ListaAnunturi 
              anunturi={anunturiMonitorizate} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="⭐ Anunțurile tale monitorizate"
              loading={loading}
              statistici={statistici}
            />
          </div>
        )}
        
        {tab === "toate" && (
          <div className="space-y-8">
            <FiltreAvansate filtre={filtre} setFiltre={setFiltre} onRefresh={() => fetchAnunturi(false)} loading={loading} />
            <ListaAnunturi 
              anunturi={anunturi} 
              toggleMonitorizare={toggleMonitorizare}
              titlu="🔍 Rezultate căutare OLX"
              loading={loading}
              statistici={statistici}
            />
          </div>
        )}

        {tab === "statistici" && (
          <StatisticiSection statistici={statistici} anunturi={anunturi} />
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Scraping OLX în timp real</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Next.js 14 + TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Deployment automat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Monitor OLX complet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
