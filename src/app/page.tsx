'use client';

import React, { useState } from 'react';

export default function HallidayRomania() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('România | LEI');
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
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

  const countries = [
    'România | LEI', 'United States | USD $', 'Germany | USD $', 'France | USD $', 
    'United Kingdom | USD $', 'Italy | USD $', 'Spain | USD $', 'Australia | USD $'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCartCount(cartCount + 1);
    alert(`Produs adăugat în coș! ${orderData.nume}, vă mulțumim.`);
    setShowOrderForm(false);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
    setShowOrderForm(true);
  };

  return (
    <div className="halliday-site">
      {/* Skip to content */}
      <a href="#main" className="skip-link">Sari la conținut</a>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <span>Halliday</span>
              </div>
              <nav className="nav">
                <a href="#how-it-works">Cum Funcționează</a>
                <a href="#order-now" onClick={() => setShowOrderForm(true)}>Comandă Acum</a>
                <a href="#about">Despre Halliday</a>
              </nav>
            </div>
            <div className="header-right">
              <button className="login-btn">Intră în cont</button>
              <div className="country-selector">
                <button 
                  className="country-btn" 
                  onClick={() => setShowCountrySelector(!showCountrySelector)}
                >
                  Țară/Regiune<br />
                  <span>{selectedCountry}</span>
                </button>
                {showCountrySelector && (
                  <div className="country-dropdown">
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountrySelector(false);
                        }}
                        className="country-option"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="search-btn">Caută</button>
              <button className="cart-btn" onClick={() => setShowCart(true)}>
                Coș {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main">
        {/* Hero Section with Buy Now */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-actions-top">
                <button className="btn-buy-now" onClick={addToCart}>Cumpără Acum</button>
              </div>
              <h1 className="hero-title">
                Puteri Invizibile pentru Viața Ta Zilnică
              </h1>
              <p className="hero-subtitle">
                Ochelari ușori, în stil retro, cu display ascuns integrat, Halliday te conectează discret la informații și inteligență nelimitată, fără să ratezi niciun moment.
              </p>
              <div className="hero-buttons">
                <button className="btn-how-it-works">Cum Funcționează</button>
                <button className="btn-order-now" onClick={() => setShowOrderForm(true)}>
                  Comandă Acum
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="container">
            <div className="mission-content">
              <h2 className="section-label">Misiunea Zilnică<br />Aliatul Tău Invizibil</h2>
              <h3 className="mission-title">Inteligența Nu A Arătat Niciodată Atât de Natural.</h3>
              <div className="mission-description">
                <p>
                  Halliday începe cu ceea ce contează cel mai mult: confortul și stilul. Cântărind doar 28,5 grame, este la fel de ușor de purtat ca ramele tale favorite și durează până la 12 ore. Fiecare pereche include lentile cu dioptrii gratuite—fără compromisuri între vedere, modă și inteligență.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interaction Section */}
        <section className="interaction">
          <div className="container">
            <div className="interaction-content">
              <h3 className="interaction-title">Interacțiune Fără Efort, Control Redefinit.</h3>
              <div className="interaction-description">
                <p>
                  Control, redefinit prin intuiție. Alături de Controlul din Tâmplă, Inelul cu Trackpad aduce gesturile tactile la îndemâna ta—subtile, fluide și mereu la îndemână.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Secret Power Section */}
        <section className="secret-power">
          <div className="container">
            <div className="secret-power-content">
              <h3 className="secret-power-title">Putere Secretă, Eliberată Fără Efort.</h3>
              <div className="secret-power-description">
                <p>
                  Halliday se integrează perfect în viața ta, deblochând în tăcere o lume de inteligență prin diverse funcții AI. Gândește alături de tine, oferind îndrumare și suport subtil fără zgomot, frecare sau spectacol. Nu este despre a arăta puterea—este despre a o poseda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="insights">
          <div className="container">
            <div className="insights-content">
              <h3 className="insights-title">Perspective la o Privire, Chiar În Fața Ochilor Tăi.</h3>
              <div className="insights-description">
                <p>
                  Prin simpla privire în sus, Halliday oferă acces la inteligență nesfârșită. Un display ascuns oferă perspective în timp real, îndrumare și suport, toate fără a întrerupe fluxul tău. Este acolo—fluid, silențios și mereu în vedere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Day Section */}
        <section className="all-day">
          <div className="container">
            <div className="all-day-content">
              <h3 className="all-day-title">Companionul de Toată Ziua pentru o Viață Fluidă.</h3>
              <div className="all-day-description">
                <p>
                  De dimineață până seara, ochelarii și inelele Halliday funcționează fără efort cu ziua ta—făcând fiecare moment mai ușor. Fie că închei afaceri, urmezi cursuri, ții discursuri, călătorești sau îți gestionezi programul, Halliday servește drept suportul silențios care se mișcă cu tine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Reactions Video Section */}
        <section className="video-section">
          <div className="container">
            <div className="video-content">
              <h2 className="video-title">Primele Reacții:<br />Halliday Pe Străzi</h2>
              <div className="video-placeholder">
                <div className="play-button">▶</div>
                <p>Video: Oameni reali încercând ochelarii AI Halliday pentru prima dată</p>
              </div>
              <button className="btn-learn-more">Află Mai Multe</button>
            </div>
          </div>
        </section>

        {/* Halliday Moments Visual Gallery */}
        <section className="moments-gallery">
          <div className="container">
            <h2 className="gallery-title">Momentele Halliday Capturate</h2>
            <div className="moments-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item} className="moment-card">
                  <div className="moment-image">
                    <span>Halliday</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="container">
            <div className="stats-content">
              <h2 className="stats-title">Cei Mai Vânduți Ochelari AI/AR<br />pe Kickstarter/Indiegogo</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">$2,125,324</div>
                  <div className="stat-label">O piatră de hotar în<br />inovația ochelarilor AI</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2,364</div>
                  <div className="stat-label">Susținători<br />O comunitate remarcabilă<br />a adus această viziune la viață</div>
                </div>
              </div>
              <div className="stats-subtitle">Cei Mai Populari<br />Ochelari AI/AR la CES 2025</div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="container">
            <div className="testimonials-content">
              <h2 className="testimonials-title">Tehnologie Reală. Păreri Reale.</h2>
              <div className="testimonial-quote">
                <p>&quot;Unul dintre lucrurile care m-a impresionat este că arată normal, înțelege designul și pare extrem de ușor.&quot;</p>
                <div className="testimonial-authors">
                  <span>Jon Rettinger</span>
                  <span>ben&apos;s gadget review</span>
                  <span>Juanbagnell</span>
                </div>
                <div className="brand-mentions">
                  <span>halliday halliday halliday</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Headlines Section */}
        <section className="headlines">
          <div className="container">
            <div className="headlines-content">
              <h2 className="headlines-title">Halliday în Știri</h2>
              <div className="headlines-grid">
                <div className="headline-item">
                  <p>&quot;Noii ochelari AI Halliday sunt ceea ce Meta, Google și Apple au încercat să construiască.&quot;</p>
                  <span>-ZDNET</span>
                </div>
                <div className="headline-item">
                  <p>&quot;Halliday face cea mai bună utilizare a AI pe care am văzut-o până acum—rapidă, contextuală și cu adevărat utilă în conversații reale.&quot;</p>
                  <span>-CNET</span>
                </div>
                <div className="headline-item">
                  <p>&quot;Tocmai am testat acești ochelari smart revoluționari cu display invizibil—și sunt șocat.&quot;</p>
                  <span>-tom&apos;s guide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Gata pentru ce urmează?</h2>
              <div className="newsletter">
                <input type="email" placeholder="Email" className="newsletter-input" />
                <button className="newsletter-btn">Abonează-te</button>
              </div>
              <p className="newsletter-text">
                Rămâi la curent cu cele mai recente știri, perspective și anunțuri de la Halliday.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Coș ({cartCount})</h3>
              <button className="close-btn" onClick={() => setShowCart(false)}>×</button>
            </div>
            <div className="cart-content">
              {cartCount === 0 ? (
                <p>Coșul tău este gol.</p>
              ) : (
                <div className="cart-items">
                  <p>{cartCount} produs(e) în coș</p>
                  <button className="btn-checkout" onClick={() => setShowOrderForm(true)}>
                    Finalizează Comanda
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comandă Halliday România</h3>
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
                    <option value="classic">Halliday Classic - 3,299 LEI</option>
                    <option value="pro">Halliday Pro - 4,199 LEI</option>
                    <option value="ultra">Halliday Ultra - 5,499 LEI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Culoare</label>
                  <select name="culoare" value={orderData.culoare} onChange={handleInputChange}>
                    <option value="negru">Negru</option>
                    <option value="havana">Havana</option>
                    <option value="transparent">Transparent</option>
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
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-submit-order">
                Adaugă în Coș
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#terms">Termeni de Serviciu</a>
              <a href="#shipping">Politica de Livrare</a>
              <a href="#warranty">Politica de Garanție</a>
              <a href="#returns">Politica de Returnare</a>
              <a href="#privacy">Politica de Confidențialitate</a>
              <span>Contact: support@halliday.ro</span>
            </div>
            <div className="footer-sections">
              <div className="footer-section">
                <h4>Despre Noi</h4>
                <a href="#faq">Întrebări Frecvente</a>
              </div>
            </div>
            <div className="footer-social">
              <a href="#discord">discord</a>
              <a href="#facebook">Facebook</a>
              <a href="#twitter">X (Twitter)</a>
              <a href="#instagram">Instagram</a>
              <a href="#youtube">YouTube</a>
              <a href="#tiktok">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
