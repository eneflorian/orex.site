'use client';

import React, { useState } from 'react';

export default function HallidayRomania() {
  const [selectedModel, setSelectedModel] = useState('classic');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    nume: '',
    email: '',
    telefon: '',
    adresa: '',
    model: 'classic',
    culoare: 'negru',
    dioptrii: 'fara',
    cantitate: 1
  });

  const modele = [
    {
      id: 'classic',
      nume: 'Halliday Classic',
      pret: '3,299',
      descriere: 'Ochelarii AI de bază cu display invizibil și funcții smart',
      caracteristici: ['Display micro-LED invizibil', 'Baterie 12 ore', 'Inel de control tactil', 'AI proactiv']
    },
    {
      id: 'pro',
      nume: 'Halliday Pro',
      pret: '4,199',
      descriere: 'Versiunea avansată cu funcții AI îmbunătățite',
      caracteristici: ['Display 4K invizibil', 'Baterie 16 ore', 'Inel de control Premium', 'AI avansat', 'Traducere în timp real']
    },
    {
      id: 'ultra',
      nume: 'Halliday Ultra',
      pret: '5,499',
      descriere: 'Top of the line cu tehnologie de ultimă generație',
      caracteristici: ['Display holografic', 'Baterie 24 ore', 'Control neural', 'AI superinteligent', 'Realitate augmentată']
    }
  ];

  const culori = ['Negru', 'Havana', 'Transparent', 'Albastru', 'Roșu'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Comandă plasată cu succes pentru ${orderData.nume}! Veți fi contactat în curând.`);
    setShowOrderForm(false);
  };

  return (
    <div className="halliday-site">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Halliday.ro</h1>
            <span>Oficial în România</span>
          </div>
          <nav className="nav">
            <a href="#produse">Produse</a>
            <a href="#caracteristici">Caracteristici</a>
            <a href="#comenzi">Comandă</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Puterea Invizibilă<br />Pentru Viața Ta Zilnică</h2>
            <p>Ochelari ușori, în stil retro, cu display invizibil integrat. Halliday te conectează discret la informații și inteligență nelimitată, fără să ratezi niciun moment.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setShowOrderForm(true)}>
                Comandă Acum
              </button>
              <button className="btn-secondary">
                Cum Funcționează
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="glasses-showcase">
              🥽
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="caracteristici">
        <div className="container">
          <h2>Inteligența Și-a Găsit Forma Perfectă</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">👁️</div>
              <h3>Display Invizibil</h3>
              <p>Ecran micro-LED integrat invizibil din exterior, vizibil perfect pentru purtător</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🧠</div>
              <h3>AI Proactiv</h3>
              <p>Inteligența artificială care anticipează nevoile tale și oferă informații relevante</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Baterie Durabilă</h3>
              <p>Până la 12 ore de utilizare continuă cu o singură încărcare</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎮</div>
              <h3>Control Intuitiv</h3>
              <p>Inel de control tactil cu gesturi simple și naturale</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="products" id="produse">
        <div className="container">
          <h2>Alege Modelul Perfect</h2>
          <div className="models-grid">
            {modele.map((model) => (
              <div 
                key={model.id}
                className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="model-image">🥽</div>
                <h3>{model.nume}</h3>
                <div className="price">{model.pret} LEI</div>
                <p>{model.descriere}</p>
                <ul className="features-list">
                  {model.caracteristici.map((caracteristica, index) => (
                    <li key={index}>✓ {caracteristica}</li>
                  ))}
                </ul>
                <button 
                  className="btn-select"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderData({...orderData, model: model.id});
                    setShowOrderForm(true);
                  }}
                >
                  Selectează
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <h2>De Ce Halliday?</h2>
            <div className="benefits-list">
              <div className="benefit">
                <span className="benefit-number">01</span>
                <div>
                  <h3>Design Natural</h3>
                  <p>Arată și se simte ca ochelarii obișnuiți - doar 28.5 grame</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-number">02</span>
                <div>
                  <h3>Tehnologie Avansată</h3>
                  <p>Primul display invizibil din lume integrat în ramă</p>
                </div>
              </div>
              <div className="benefit">
                <span className="benefit-number">03</span>
                <div>
                  <h3>Suport în Română</h3>
                  <p>Echipă locală de suport și service autorizat în România</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comandă Halliday</h3>
              <button className="close-btn" onClick={() => setShowOrderForm(false)}>×</button>
            </div>
            <form onSubmit={handleOrder} className="order-form">
              <div className="form-group">
                <label>Nume Complet *</label>
                <input
                  type="text"
                  name="nume"
                  value={orderData.nume}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Telefon *</label>
                <input
                  type="tel"
                  name="telefon"
                  value={orderData.telefon}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adresa de Livrare *</label>
                <input
                  type="text"
                  name="adresa"
                  value={orderData.adresa}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Model</label>
                  <select name="model" value={orderData.model} onChange={handleInputChange}>
                    <option value="classic">Halliday Classic</option>
                    <option value="pro">Halliday Pro</option>
                    <option value="ultra">Halliday Ultra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Culoare</label>
                  <select name="culoare" value={orderData.culoare} onChange={handleInputChange}>
                    {culori.map(culoare => (
                      <option key={culoare} value={culoare.toLowerCase()}>{culoare}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Dioptrii</label>
                  <select name="dioptrii" value={orderData.dioptrii} onChange={handleInputChange}>
                    <option value="fara">Fără dioptrii</option>
                    <option value="minus">Miopie (-1 la -6)</option>
                    <option value="plus">Hipermetropie (+1 la +4)</option>
                    <option value="progresive">Lentile progresive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cantitate</label>
                  <select name="cantitate" value={orderData.cantitate} onChange={handleInputChange}>
                    <option value="1">1 bucată</option>
                    <option value="2">2 bucăți</option>
                    <option value="3">3 bucăți</option>
                  </select>
                </div>
              </div>
              <div className="order-summary">
                <div className="total">
                  Total: <span>{(parseInt(modele.find(m => m.id === orderData.model)?.pret.replace(/[.,]/g, '') || '0') * orderData.cantitate).toLocaleString()} LEI</span>
                </div>
              </div>
              <button type="submit" className="btn-order">
                Plasează Comanda
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Halliday România</h3>
              <p>Distribuitor oficial Halliday Global pentru România</p>
              <div className="contact-info">
                <p>📧 comenzi@halliday.ro</p>
                <p>📱 +40 21 123 4567</p>
                <p>📍 București, România</p>
              </div>
            </div>
            <div className="footer-section">
              <h3>Produse</h3>
              <ul>
                <li><a href="#produse">Halliday Classic</a></li>
                <li><a href="#produse">Halliday Pro</a></li>
                <li><a href="#produse">Halliday Ultra</a></li>
                <li><a href="#accesorii">Accesorii</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Suport</h3>
              <ul>
                <li><a href="#faq">Întrebări Frecvente</a></li>
                <li><a href="#garantie">Garanție</a></li>
                <li><a href="#service">Service</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Urmărește-ne</h3>
              <div className="social-links">
                <a href="#facebook">Facebook</a>
                <a href="#instagram">Instagram</a>
                <a href="#youtube">YouTube</a>
                <a href="#tiktok">TikTok</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Halliday România. Toate drepturile rezervate.</p>
            <div className="footer-links">
              <a href="#privacy">Politica de Confidențialitate</a>
              <a href="#terms">Termeni și Condiții</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
