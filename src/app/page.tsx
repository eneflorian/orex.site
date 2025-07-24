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
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <span>Halliday</span>
              </div>
              <nav className="nav">
                <a href="#how-it-works">How It Works</a>
                <a href="#order-now" onClick={() => setShowOrderForm(true)}>Order Now</a>
                <a href="#about">About Halliday</a>
              </nav>
            </div>
            <div className="header-right">
              <button className="login-btn">Log in</button>
              <div className="country-selector">
                <button 
                  className="country-btn" 
                  onClick={() => setShowCountrySelector(!showCountrySelector)}
                >
                  Country/region<br />
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
              <button className="search-btn">Search</button>
              <button className="cart-btn" onClick={() => setShowCart(true)}>
                Cart {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
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
                <button className="btn-buy-now" onClick={addToCart}>Buy Now</button>
              </div>
              <h1 className="hero-title">
                Invisible Superpowers for Your Daily Life
              </h1>
              <p className="hero-subtitle">
                Lightweight, retro-styled glasses with a hidden near-eye display, Halliday Glasses connect you to unlimited information and intelligence discreetly, without missing a beat.
              </p>
              <div className="hero-buttons">
                <button className="btn-how-it-works">How It Works</button>
                <button className="btn-order-now" onClick={() => setShowOrderForm(true)}>
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="container">
            <div className="mission-content">
              <h2 className="section-label">The Everyday Mission<br />Your Invisible Ally</h2>
              <h3 className="mission-title">Smart Has Never Looked This Natural.</h3>
              <div className="mission-description">
                <p>
                  Halliday starts with what matters most: comfort and style. Weighing just 28.5 grams, it&apos;s as wearable as your favorite frames and lasts up to 12 hours. Each pair includes free prescription lenses—with no trade-off among vision, fashion, and intelligence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interaction Section */}
        <section className="interaction">
          <div className="container">
            <div className="interaction-content">
              <h3 className="interaction-title">Effortless Interaction, Control Redefined.</h3>
              <div className="interaction-description">
                <p>
                  Control, redefined by intuition. Alongside our Temple Control, the Trackpad Ring brings touch-based gestures to your fingertips—subtle, seamless, and always within reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Secret Power Section */}
        <section className="secret-power">
          <div className="container">
            <div className="secret-power-content">
              <h3 className="secret-power-title">Secret Power, Effortlessly Unleashed.</h3>
              <div className="secret-power-description">
                <p>
                  Halliday seamlessly integrates into your life while quietly unlocking a world of intelligence through various AI functions. It thinks alongside you, providing subtle guidance and support without noise, friction, or spectacle. It&apos;s not about showing power—it&apos;s about possessing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="insights">
          <div className="container">
            <div className="insights-content">
              <h3 className="insights-title">Insights at a Glance, Right Before Your Eyes.</h3>
              <div className="insights-description">
                <p>
                  By simply glancing up, Halliday provides access to endless intelligence. A hidden display offers real-time insights, guidance, and support, all without disrupting your flow. It&apos;s there—seamless, silent, and always in sight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Day Section */}
        <section className="all-day">
          <div className="container">
            <div className="all-day-content">
              <h3 className="all-day-title">All-Day Companion for a Seamless Life.</h3>
              <div className="all-day-description">
                <p>
                  From morning to night, Halliday&apos;s glasses and rings work effortlessly with your day—making each moment easier. Whether you&apos;re closing deals, taking classes, giving speeches, traveling, or managing your schedule, Halliday serves as the quiet support that moves with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Reactions Video Section */}
        <section className="video-section">
          <div className="container">
            <div className="video-content">
              <h2 className="video-title">First Reactions:<br />Halliday Hits the Streets</h2>
              <div className="video-placeholder">
                <div className="play-button">▶</div>
                <p>Video: Real people trying Halliday AI glasses for the first time</p>
              </div>
              <button className="btn-learn-more">Learn More</button>
            </div>
          </div>
        </section>

        {/* Halliday Moments Visual Gallery */}
        <section className="moments-gallery">
          <div className="container">
            <h2 className="gallery-title">Halliday Moments Captured</h2>
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
              <h2 className="stats-title">Best Selling AI/AR Glasses<br />on Kickstarter/Indiegogo</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">$2,125,324</div>
                  <div className="stat-label">A milestone in<br />AI eyewear innovation</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2,364</div>
                  <div className="stat-label">Backers<br />A remarkable community<br />brought this vision to life</div>
                </div>
              </div>
              <div className="stats-subtitle">The Most Popular<br />AI/AR Glasses at CES 2025</div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="container">
            <div className="testimonials-content">
              <h2 className="testimonials-title">Real Tech. Real Takes.</h2>
              <div className="testimonial-quote">
                <p>&quot;One of the things that stood out to me is that it just looks normal, which understands design and looks extremely lightweight.&quot;</p>
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
              <h2 className="headlines-title">Halliday in the Headlines</h2>
              <div className="headlines-grid">
                <div className="headline-item">
                  <p>&quot;Halliday&apos;s new AI glasses are what Meta, Google, and Apple have been trying to build.&quot;</p>
                  <span>-ZDNET</span>
                </div>
                <div className="headline-item">
                  <p>&quot;Halliday makes the best use of AI I&apos;ve seen so far-quick, contextual, and actually useful in real conversations.&quot;</p>
                  <span>-CNET</span>
                </div>
                <div className="headline-item">
                  <p>&quot;I just went hands-on with these breakthrough smart glasses with an invisible display-and I&apos;m shocked.&quot;</p>
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
              <h2 className="newsletter-title">Ready for what&apos;s next?</h2>
              <div className="newsletter">
                <input type="email" placeholder="Email" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
              <p className="newsletter-text">
                Stay updated with the latest news, insights, and announcements from Halliday.
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
              <h3>Cart ({cartCount})</h3>
              <button className="close-btn" onClick={() => setShowCart(false)}>×</button>
            </div>
            <div className="cart-content">
              {cartCount === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="cart-items">
                  <p>{cartCount} item(s) in cart</p>
                  <button className="btn-checkout" onClick={() => setShowOrderForm(true)}>
                    Checkout
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
                Add to Cart
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
              <a href="#terms">Terms of Service</a>
              <a href="#shipping">Shipping Policy</a>
              <a href="#warranty">Warranty Policy</a>
              <a href="#returns">Return&Refund Policy</a>
              <a href="#privacy">Privacy Policy</a>
              <span>Contact Us: support@halliday.ro</span>
            </div>
            <div className="footer-sections">
              <div className="footer-section">
                <h4>About Us</h4>
                <a href="#faq">FAQ</a>
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
