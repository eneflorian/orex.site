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

const TABURI = [
  { id: "home", label: "🏠 Acasă", icon: "🏠" },
  { id: "scraping", label: "🔍 Scraping Live", icon: "🔍" },
  { id: "monitorizare", label: "📊 Monitorizare", icon: "📊" },
  { id: "toate", label: "📋 Toate anunțurile", icon: "📋" },
  { id: "statistici", label: "📈 Statistici", icon: "📈" },
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
  tip: string;
}

interface Statistici {
  totalAnunturi: number;
  pretMediu: number;
  anunturiNoi: number;
  categoriiActive: number;
}

function Header() {
  return (
    <div className="header">
      <h1>🔍 OLX Monitor Pro - OREX.SITE</h1>
      <p>
        Platformă avansată pentru monitorizarea și scraping-ul anunțurilor OLX în timp real.
        Găsește cele mai bune oferte și fii primul care știe când apar anunțuri noi!
      </p>
    </div>
  );
}

function HomeSection() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: 800, 
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>
        OREX.SITE
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '16px' }}>
        🔍 Monitor inteligent OLX cu scraping în timp real
      </p>
      <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '48px' }}>
        Powered by Next.js 15 • TypeScript • OLX Monitor Engine • Auto Deploy
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
        fontSize: '0.9rem',
        fontFamily: 'monospace',
        background: 'rgba(16, 185, 129, 0.1)',
        color: '#10b981',
        padding: '12px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        marginBottom: '48px',
        maxWidth: '400px',
        margin: '0 auto 48px auto'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }}></div>
        Deployment automat + Scraping OLX live
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="stat-card">
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px' }}>Scraping Live</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Extrage anunțuri direct de pe OLX.ro în timp real</p>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📊</div>
          <h3 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px' }}>Monitorizare</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Urmărește anunțurile favorite și primește notificări</p>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🚀</div>
          <h3 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px' }}>Auto Deploy</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Commit pe GitHub → Deploy automat pe orex.site</p>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📈</div>
          <h3 style={{ fontWeight: 700, color: 'var(--foreground)', marginBottom: '8px' }}>Statistici</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Analiză prețuri, tendințe și rapoarte detaliate</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
        <a
          style={{
            borderRadius: '24px',
            border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s ease'
          }}
          href="https://github.com/eneflorian/orex.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Vezi pe GitHub
        </a>
        <a
          style={{
            borderRadius: '24px',
            border: '1px solid var(--border)',
            background: 'rgba(139, 92, 246, 0.1)',
            color: 'var(--secondary)',
            padding: '12px 24px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
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

function StatisticiCards({ statistici }: { statistici: Statistici }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-number">{statistici.totalAnunturi}</span>
        <span className="stat-label">Total anunțuri</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{statistici.pretMediu.toLocaleString()}</span>
        <span className="stat-label">Preț mediu (LEI)</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{statistici.anunturiNoi}</span>
        <span className="stat-label">Anunțuri noi azi</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{statistici.categoriiActive}</span>
        <span className="stat-label">Categorii active</span>
      </div>
    </div>
  );
}

function BaraTaburi({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  return (
    <div className="tabs-container">
      {TABURI.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`tab-button ${tab === t.id ? 'active' : ''}`}
        >
          <span>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function FiltreAvansate({ 
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
  return (
    <div className="filtre-card">
      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Oraș</label>
          <select 
            className="filter-select"
            value={filtre.oras}
            onChange={e => setFiltre({ ...filtre, oras: e.target.value })}
          >
            <option value="">Toate orașele</option>
            {ORASE_ROMANIA.map(oras => (
              <option key={oras.id} value={oras.id}>{oras.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Categorie</label>
          <select 
            className="filter-select"
            value={filtre.categorie}
            onChange={e => setFiltre({ ...filtre, categorie: e.target.value })}
          >
            <option value="">Toate categoriile</option>
            {CATEGORII_OLX.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Căutare</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Caută după titlu..."
            value={filtre.titlu}
            onChange={e => setFiltre({ ...filtre, titlu: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Preț minim</label>
          <input
            type="number"
            className="filter-input"
            placeholder="0"
            value={filtre.pretMin}
            onChange={e => setFiltre({ ...filtre, pretMin: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Preț maxim</label>
          <input
            type="number"
            className="filter-input"
            placeholder="Fără limită"
            value={filtre.pretMax}
            onChange={e => setFiltre({ ...filtre, pretMax: e.target.value })}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn-primary"
          onClick={() => onSearch(false)}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Se încarcă...
            </>
          ) : (
            <>
              🔍 Scraping LIVE OLX
            </>
          )}
        </button>
        <button 
          className="btn-secondary"
          onClick={() => onSearch(true)}
          disabled={loading}
        >
          📋 Test cu date mock
        </button>
        <button 
          className="btn-secondary"
          onClick={() => setFiltre({ categorie: "", oras: "", titlu: "", pretMin: "", pretMax: "", tip: "" })}
        >
          🗑️ Resetează filtrele
        </button>
      </div>
    </div>
  );
}

function CardAnunt({ anunt, onToggleMonitor }: { anunt: Anunt; onToggleMonitor: (id: string) => void }) {
  const categoria = CATEGORII_OLX.find(c => c.id === anunt.categorie);
  
  return (
    <div className="anunt-card">
      <div className="anunt-header">
        <h3 className="anunt-title">{anunt.titlu}</h3>
        <span 
          className="anunt-category"
          style={{ backgroundColor: categoria?.color + '20', color: categoria?.color }}
        >
          {categoria?.label || anunt.categorie}
        </span>
      </div>

      <div className="anunt-price">
        {anunt.pret.toLocaleString()} {anunt.valuta}
      </div>

      <div className="anunt-details">
        <div className="anunt-detail">
          <span className="anunt-detail-icon">📍</span>
          <span>{anunt.locatie}</span>
        </div>
        <div className="anunt-detail">
          <span className="anunt-detail-icon">📅</span>
          <span>{anunt.dataPublicare}</span>
        </div>
        <div className="anunt-detail">
          <span className="anunt-detail-icon">🏷️</span>
          <span>{anunt.tip}</span>
        </div>
        <div className="anunt-detail">
          <span className="anunt-detail-icon">🔗</span>
          <span>OLX.ro</span>
        </div>
      </div>

      <div className="anunt-actions">
        <button
          className={`btn-monitor ${anunt.selectat ? 'active' : ''}`}
          onClick={() => onToggleMonitor(anunt.id)}
        >
          {anunt.selectat ? '✅ Monitorizat' : '📌 Monitorizează'}
        </button>
        <a 
          href={anunt.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-view"
        >
          👁️ Vezi detalii
        </a>
      </div>
    </div>
  );
}

function ListaAnunturi({ 
  anunturi, 
  onToggleMonitor, 
  loading, 
  titlu 
}: { 
  anunturi: Anunt[]; 
  onToggleMonitor: (id: string) => void; 
  loading: boolean; 
  titlu: string; 
}) {
  if (loading) {
    return (
      <div className="loading">
        <span className="spinner"></span>
        <span>Se încarcă anunțurile...</span>
      </div>
    );
  }

  if (anunturi.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">Nu am găsit anunțuri</h3>
        <p className="empty-state-text">
          Încearcă să modifici filtrele de căutare sau să cauți în alte categorii.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: 'var(--foreground)', marginBottom: '24px' }}>{titlu} ({anunturi.length})</h2>
      <div className="anunturi-grid">
        {anunturi.map(anunt => (
          <CardAnunt 
            key={anunt.id} 
            anunt={anunt} 
            onToggleMonitor={onToggleMonitor} 
          />
        ))}
      </div>
    </div>
  );
}

function SectiuneStatistici({ anunturi }: { anunturi: Anunt[] }) {
  const categoriiDistribute = anunturi.reduce((acc, anunt) => {
    acc[anunt.categorie] = (acc[anunt.categorie] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const oraseDistribute = anunturi.reduce((acc, anunt) => {
    acc[anunt.locatie] = (acc[anunt.locatie] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pretMediu = anunturi.length > 0 
    ? anunturi.reduce((sum, a) => sum + a.pret, 0) / anunturi.length 
    : 0;

  return (
    <div>
      <h2 style={{ color: 'var(--foreground)', marginBottom: '24px' }}>📈 Statistici și Analize</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{anunturi.length}</span>
          <span className="stat-label">Total anunțuri</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{Math.round(pretMediu).toLocaleString()}</span>
          <span className="stat-label">Preț mediu</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{Object.keys(categoriiDistribute).length}</span>
          <span className="stat-label">Categorii</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{Object.keys(oraseDistribute).length}</span>
          <span className="stat-label">Orașe</span>
        </div>
      </div>

      <div className="filters-grid" style={{ marginTop: '32px' }}>
        <div className="filtre-card">
          <h3 style={{ color: 'var(--accent)', marginBottom: '24px' }}>🏷️ Distribuție categorii</h3>
          {Object.entries(categoriiDistribute).map(([categorie, count]) => {
            const cat = CATEGORII_OLX.find(c => c.id === categorie);
            return (
              <div key={categorie} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                <span>{cat?.label || categorie}</span>
                <strong>{count}</strong>
              </div>
            );
          })}
        </div>

        <div className="filtre-card">
          <h3 style={{ color: 'var(--accent)', marginBottom: '24px' }}>📍 Distribuție orașe</h3>
          {Object.entries(oraseDistribute).map(([oras, count]) => (
            <div key={oras} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
              <span>{oras}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [filtre, setFiltre] = useState<Filtre>({
    categorie: "", 
    oras: "", 
    titlu: "", 
    pretMin: "", 
    pretMax: "", 
    tip: ""
  });
  
  const [anunturi, setAnunturi] = useState<Anunt[]>([]);
  const [tab, setTab] = useState("home");
  const [loading, setLoading] = useState(false);
  
  const [statistici, setStatistici] = useState<Statistici>({
    totalAnunturi: 0,
    pretMediu: 0,
    anunturiNoi: 0,
    categoriiActive: 0,
  });

  const handleSearch = async (useMock = false) => {
    setLoading(true);
    try {
      console.log("🔍 Începe căutarea cu filtrele:", filtre);
      
      const params = new URLSearchParams();
      if (filtre.categorie) params.append('categorie', filtre.categorie);
      if (filtre.oras) params.append('oras', filtre.oras);
      if (filtre.titlu) params.append('query', filtre.titlu);
      if (filtre.pretMin) params.append('pretMin', filtre.pretMin);
      if (filtre.pretMax) params.append('pretMax', filtre.pretMax);
      if (useMock) params.append('mock', 'true');
      params.append('pagini', '2'); // Caută pe 2 pagini
      
      const response = await fetch(`/api/anunturi?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setAnunturi(data.anunturi);
        console.log(`✅ Găsite ${data.anunturi.length} anunțuri din sursa: ${data.metadata?.source || 'API'}`);
        
        // Actualizează statisticile
        setStatistici({
          totalAnunturi: data.anunturi.length,
          pretMediu: data.statistici?.pretMediu || 0,
          anunturiNoi: data.anunturi.filter((a: any) => a.dataPublicare === new Date().toISOString().split('T')[0]).length,
          categoriiActive: new Set(data.anunturi.map((a: any) => a.categorie)).size,
        });
      } else {
        console.error("❌ Eroare la căutare:", data.error);
        setAnunturi([]);
      }
    } catch (error) {
      console.error("❌ Eroare la fetch:", error);
      // Fallback la date mock în caz de eroare
      if (!useMock) await handleSearch(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonitorizare = async (id: string) => {
    try {
      const anunt = anunturi.find(a => a.id === id);
      if (!anunt) return;

      // Update local state immediately for better UX
      setAnunturi(anunturi =>
        anunturi.map(a =>
          a.id === id ? { ...a, selectat: !a.selectat } : a
        )
      );

      // Try to update backend
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

  // Calculare statistici dinamice
  const statisticiCalculate: Statistici = {
    totalAnunturi: anunturi.length,
    pretMediu: anunturi.length > 0 ? Math.round(anunturi.reduce((sum, a) => sum + a.pret, 0) / anunturi.length) : 0,
    anunturiNoi: anunturi.filter(a => a.dataPublicare === new Date().toISOString().split('T')[0]).length,
    categoriiActive: new Set(anunturi.map(a => a.categorie)).size,
  };

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
    <div className="main-container">
      {tab === "home" ? <HomeSection /> : <Header />}
      
      {tab !== "home" && <StatisticiCards statistici={anunturi.length > 0 ? statisticiCalculate : statistici} />}
      
      <BaraTaburi tab={tab} setTab={setTab} />

      {tab === "scraping" && (
        <>
          <FiltreAvansate 
            filtre={filtre} 
            setFiltre={setFiltre} 
            onSearch={handleSearch} 
            loading={loading} 
          />
          <ListaAnunturi 
            anunturi={anunturiFiltrate} 
            onToggleMonitor={toggleMonitorizare} 
            loading={loading}
            titlu="🔍 Rezultate scraping OLX"
          />
        </>
      )}

      {tab === "monitorizare" && (
        <>
          <FiltreAvansate 
            filtre={filtre} 
            setFiltre={setFiltre} 
            onSearch={handleSearch} 
            loading={loading} 
          />
          {anunturiMonitorizate.length > 0 ? (
            <div className="selected-section">
              <h3>📊 Anunțurile tale monitorizate</h3>
              <div className="anunturi-grid">
                {anunturiMonitorizate.filter(anunt => {
                  return (
                    (!filtre.categorie || anunt.categorie === filtre.categorie) &&
                    (!filtre.oras || anunt.locatie.toLowerCase().includes(filtre.oras)) &&
                    (!filtre.titlu || anunt.titlu.toLowerCase().includes(filtre.titlu.toLowerCase()))
                  );
                }).map(anunt => (
                  <CardAnunt 
                    key={anunt.id} 
                    anunt={anunt} 
                    onToggleMonitor={toggleMonitorizare} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <h3 className="empty-state-title">Nu monitorizezi niciun anunț</h3>
              <p className="empty-state-text">
                Mergi la secțiunea "Scraping Live" și adaugă anunțuri la monitorizare.
              </p>
            </div>
          )}
        </>
      )}

      {tab === "toate" && (
        <>
          <FiltreAvansate 
            filtre={filtre} 
            setFiltre={setFiltre} 
            onSearch={handleSearch} 
            loading={loading} 
          />
          <ListaAnunturi 
            anunturi={anunturiFiltrate} 
            onToggleMonitor={toggleMonitorizare} 
            loading={loading}
            titlu="📋 Toate anunțurile disponibile"
          />
        </>
      )}

      {tab === "statistici" && (
        <SectiuneStatistici anunturi={anunturi} />
      )}

      <footer style={{ 
        marginTop: '64px', 
        textAlign: 'center', 
        color: '#64748b', 
        fontSize: '0.9rem',
        borderTop: '1px solid var(--border)',
        paddingTop: '32px'
      }}>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span>🔍 OLX Scraping în timp real</span>
          <span>🚀 Deployment automat</span>
          <span>⚡ Next.js 15 + TypeScript</span>
          <span>🏠 Integrare completă olx-monitor!</span>
        </div>
      </footer>
    </div>
  );
}
