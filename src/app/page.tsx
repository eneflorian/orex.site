'use client';

import React, { useState, useEffect } from "react";

const CATEGORII_OLX = [
  { id: "imobiliare", label: "🏠 Imobiliare", color: "#10b981" },
  { id: "telefoane", label: "📱 Telefoane", color: "#3b82f6" },
  { id: "electronice", label: "💻 Electronice", color: "#8b5cf6" },
  { id: "auto-moto", label: "🚗 Auto", color: "#f59e0b" },
  { id: "moda", label: "👕 Modă", color: "#ec4899" },
  { id: "servicii", label: "🔧 Servicii", color: "#06b6d4" },
  { id: "casa-gradina", label: "🌱 Casă & Grădină", color: "#84cc16" },
  { id: "sport", label: "⚽ Sport", color: "#f97316" },
];

const ORASE_ROMANIA = [
  { id: "bucuresti", label: "București" },
  { id: "cluj", label: "Cluj-Napoca" },
  { id: "timisoara", label: "Timișoara" },
  { id: "iasi", label: "Iași" },
  { id: "constanta", label: "Constanța" },
  { id: "brasov", label: "Brașov" },
  { id: "sibiu", label: "Sibiu" },
  { id: "oradea", label: "Oradea" },
  { id: "craiova", label: "Craiova" },
];

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
  oras: string;
  titlu: string;
  pretMin: string;
  pretMax: string;
}

function MobileHeader() {
  return (
    <header className="mobile-header">
      <div className="logo-section">
        <h1 className="logo">🔍 OLX Monitor</h1>
        <p className="tagline">Găsește ofertele perfecte</p>
      </div>
    </header>
  );
}

function SearchSection({ 
  filtre, 
  setFiltre, 
  onSearch, 
  loading 
}: { 
  filtre: Filtre; 
  setFiltre: (filtre: Filtre) => void; 
  onSearch: (useMock?: boolean) => void; 
  loading: boolean; 
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="search-section">
      <div className="search-main">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Caută produse..."
            value={filtre.titlu}
            onChange={e => setFiltre({ ...filtre, titlu: e.target.value })}
          />
          <button 
            className="search-btn"
            onClick={() => onSearch(false)}
            disabled={loading}
          >
            {loading ? "⏳" : "🔍"}
          </button>
        </div>
        
        <button 
          className="filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙️ Filtre {showFilters ? "▲" : "▼"}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <select 
              className="filter-select"
              value={filtre.categorie}
              onChange={e => setFiltre({ ...filtre, categorie: e.target.value })}
            >
              <option value="">📂 Toate categoriile</option>
              {CATEGORII_OLX.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-row">
            <select 
              className="filter-select"
              value={filtre.oras}
              onChange={e => setFiltre({ ...filtre, oras: e.target.value })}
            >
              <option value="">📍 Toate orașele</option>
              {ORASE_ROMANIA.map(oras => (
                <option key={oras.id} value={oras.id}>{oras.label}</option>
              ))}
            </select>
          </div>

          <div className="price-filters">
            <input
              type="number"
              className="price-input"
              placeholder="Preț min"
              value={filtre.pretMin}
              onChange={e => setFiltre({ ...filtre, pretMin: e.target.value })}
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              className="price-input"
              placeholder="Preț max"
              value={filtre.pretMax}
              onChange={e => setFiltre({ ...filtre, pretMax: e.target.value })}
            />
          </div>

          <div className="filter-actions">
            <button 
              className="btn-search"
              onClick={() => onSearch(false)}
              disabled={loading}
            >
              {loading ? "⏳ Se încarcă..." : "🔍 Caută acum"}
            </button>
            <button 
              className="btn-clear"
              onClick={() => setFiltre({ categorie: "", oras: "", titlu: "", pretMin: "", pretMax: "" })}
            >
              🗑️ Șterge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AnuntCard({ anunt, onToggleMonitor }: { anunt: Anunt; onToggleMonitor: (id: string) => void }) {
  const categoria = CATEGORII_OLX.find(c => c.id === anunt.categorie);
  
  return (
    <div className="anunt-card-mobile">
      <div className="card-header">
        <h3 className="card-title">{anunt.titlu}</h3>
        <div className="card-price">{anunt.pret.toLocaleString()} {anunt.valuta}</div>
      </div>

      <div className="card-meta">
        <span className="meta-item">📍 {anunt.locatie}</span>
        <span className="meta-item">📅 {anunt.dataPublicare}</span>
        <span 
          className="category-badge"
          style={{ backgroundColor: categoria?.color + '20', color: categoria?.color }}
        >
          {categoria?.label || anunt.categorie}
        </span>
      </div>

      <div className="card-actions">
        <button
          className={`btn-monitor ${anunt.selectat ? 'active' : ''}`}
          onClick={() => onToggleMonitor(anunt.id)}
        >
          {anunt.selectat ? '💖 Salvat' : '🤍 Salvează'}
        </button>
        <a 
          href={anunt.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-view"
        >
          👁️ Vezi
        </a>
      </div>
    </div>
  );
}

function BottomNavigation({ 
  currentTab, 
  setCurrentTab, 
  anunturiCount, 
  monitorizateCount 
}: { 
  currentTab: string; 
  setCurrentTab: (tab: string) => void; 
  anunturiCount: number;
  monitorizateCount: number;
}) {
  const tabs = [
    { id: "search", icon: "🔍", label: "Căutare", badge: anunturiCount },
    { id: "saved", icon: "💖", label: "Salvate", badge: monitorizateCount },
    { id: "stats", icon: "📊", label: "Statistici", badge: 0 },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => setCurrentTab(tab.id)}
        >
          <div className="nav-icon">
            {tab.icon}
            {tab.badge > 0 && <span className="nav-badge">{tab.badge}</span>}
          </div>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

function ListaAnunturi({ 
  anunturi, 
  onToggleMonitor, 
  loading, 
  emptyMessage 
}: { 
  anunturi: Anunt[]; 
  onToggleMonitor: (id: string) => void; 
  loading: boolean;
  emptyMessage: string;
}) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Se încarcă anunțurile...</p>
      </div>
    );
  }

  if (anunturi.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>Nu am găsit anunțuri</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="anunturi-list">
      {anunturi.map(anunt => (
        <AnuntCard 
          key={anunt.id} 
          anunt={anunt} 
          onToggleMonitor={onToggleMonitor} 
        />
      ))}
    </div>
  );
}

function StatisticiSection({ anunturi }: { anunturi: Anunt[] }) {
  const categoriiDistribute = anunturi.reduce((acc, anunt) => {
    acc[anunt.categorie] = (acc[anunt.categorie] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pretMediu = anunturi.length > 0 
    ? anunturi.reduce((sum, a) => sum + a.pret, 0) / anunturi.length 
    : 0;

  const pretMin = anunturi.length > 0 ? Math.min(...anunturi.map(a => a.pret)) : 0;
  const pretMax = anunturi.length > 0 ? Math.max(...anunturi.map(a => a.pret)) : 0;

  return (
    <div className="stats-section">
      <h2 className="section-title">📊 Statistici</h2>
      
      <div className="stats-cards">
        <div className="stat-card-mobile">
          <div className="stat-value">{anunturi.length}</div>
          <div className="stat-label">Anunțuri</div>
        </div>
        <div className="stat-card-mobile">
          <div className="stat-value">{Math.round(pretMediu).toLocaleString()}</div>
          <div className="stat-label">Preț mediu</div>
        </div>
        <div className="stat-card-mobile">
          <div className="stat-value">{pretMin.toLocaleString()}</div>
          <div className="stat-label">Preț minim</div>
        </div>
        <div className="stat-card-mobile">
          <div className="stat-value">{pretMax.toLocaleString()}</div>
          <div className="stat-label">Preț maxim</div>
        </div>
      </div>

      {Object.keys(categoriiDistribute).length > 0 && (
        <div className="categories-stats">
          <h3 className="subsection-title">Categorii</h3>
          {Object.entries(categoriiDistribute).map(([categorie, count]) => {
            const cat = CATEGORII_OLX.find(c => c.id === categorie);
            return (
              <div key={categorie} className="category-stat">
                <span className="category-name">{cat?.label || categorie}</span>
                <span className="category-count">{count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MobileOLXMonitor() {
  const [filtre, setFiltre] = useState<Filtre>({
    categorie: "", 
    oras: "", 
    titlu: "", 
    pretMin: "", 
    pretMax: ""
  });
  
  const [anunturi, setAnunturi] = useState<Anunt[]>([]);
  const [currentTab, setCurrentTab] = useState("search");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (useMock = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtre.categorie) params.append('categorie', filtre.categorie);
      if (filtre.oras) params.append('oras', filtre.oras);
      if (filtre.titlu) params.append('query', filtre.titlu);
      if (filtre.pretMin) params.append('pretMin', filtre.pretMin);
      if (filtre.pretMax) params.append('pretMax', filtre.pretMax);
      if (useMock) params.append('mock', 'true');
      
      const response = await fetch(`/api/anunturi?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setAnunturi(data.anunturi);
      } else {
        console.error("Eroare la căutare:", data.error);
        setAnunturi([]);
      }
    } catch (error) {
      console.error("Eroare la fetch:", error);
      if (!useMock) await handleSearch(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonitorizare = async (id: string) => {
    try {
      const anunt = anunturi.find(a => a.id === id);
      if (!anunt) return;

      setAnunturi(anunturi =>
        anunturi.map(a =>
          a.id === id ? { ...a, selectat: !a.selectat } : a
        )
      );

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
      if (!data.success) {
        console.warn('Backend update failed, but local state is updated');
      }
    } catch (error) {
      console.error('Eroare la toggle monitorizare:', error);
    }
  };

  // Load mock data on first render
  useEffect(() => {
    const loadMockData = async () => {
      await handleSearch(true);
    };
    loadMockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const anunturiFiltrate = anunturi.filter(anunt => {
    return (
      (!filtre.categorie || anunt.categorie === filtre.categorie) &&
      (!filtre.oras || anunt.locatie.toLowerCase().includes(filtre.oras)) &&
      (!filtre.titlu || anunt.titlu.toLowerCase().includes(filtre.titlu.toLowerCase())) &&
      (!filtre.pretMin || anunt.pret >= parseInt(filtre.pretMin)) &&
      (!filtre.pretMax || anunt.pret <= parseInt(filtre.pretMax))
    );
  });

  const anunturiMonitorizate = anunturi.filter(a => a.selectat);

  return (
    <div className="mobile-app">
      <MobileHeader />
      
      <main className="main-content">
        {currentTab === "search" && (
          <>
            <SearchSection 
              filtre={filtre} 
              setFiltre={setFiltre} 
              onSearch={handleSearch} 
              loading={loading} 
            />
            <ListaAnunturi 
              anunturi={anunturiFiltrate} 
              onToggleMonitor={toggleMonitorizare} 
              loading={loading}
              emptyMessage="Încearcă să modifici filtrele de căutare sau să cauți în alte categorii."
            />
          </>
        )}

        {currentTab === "saved" && (
          <ListaAnunturi 
            anunturi={anunturiMonitorizate} 
            onToggleMonitor={toggleMonitorizare} 
            loading={false}
            emptyMessage="Nu ai încă anunțuri salvate. Mergi la căutare și salvează anunțurile care îți plac."
          />
        )}

        {currentTab === "stats" && (
          <StatisticiSection anunturi={anunturi} />
        )}
      </main>

      <BottomNavigation 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        anunturiCount={anunturiFiltrate.length}
        monitorizateCount={anunturiMonitorizate.length}
      />
    </div>
  );
}
