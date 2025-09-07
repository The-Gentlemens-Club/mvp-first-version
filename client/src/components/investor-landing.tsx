import React, { useEffect } from 'react';
import logoPath from "@assets/newlogo_1753369626128.jpeg";

export function InvestorLanding() {
  useEffect(() => {
    // Add fade-in animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="investor-landing">
      {/* HERO SECTION */}
      <header className="hero fade-in-section">
        <img src={logoPath} alt="Gentlemen's Club Logo" className="hero-logo"/>
        <h1 className="hero-title">The First Licensed GambleFi DAO</h1>
        <p className="hero-subtitle">Own the House. Share the Profits. Shape the Future of Gambling.</p>
        <div className="hero-buttons">
          <a href="#features" className="btn-primary">Learn More</a>
          <a href="#contact" className="btn-secondary">Contact Us</a>
        </div>
      </header>

      {/* VALUE PROPOSITION */}
      <section id="features" className="features fade-in-section">
        <div className="feature-card">
          <h3>Provably Fair Games</h3>
          <p>Transparent and verifiable outcomes powered by blockchain technology.</p>
        </div>
        <div className="feature-card">
          <h3>DAO Governance</h3>
          <p>Token holders shape the platform's direction through proposals and votes.</p>
        </div>
        <div className="feature-card">
          <h3>Revenue Sharing</h3>
          <p>Earn passive income by staking $GTLM tokens and sharing in the platform's success.</p>
        </div>
      </section>

      {/* INVESTOR STATS */}
      <section className="stats fade-in-section">
        <div className="stat">
          <h2>$95B+</h2>
          <p>Global Online Gambling Market</p>
        </div>
        <div className="stat">
          <h2>50%</h2>
          <p>DAO Revenue Share</p>
        </div>
        <div className="stat">
          <h2>100M</h2>
          <p>Total $GTLM Token Supply</p>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="roadmap fade-in-section">
        <h2>Roadmap</h2>
        <div className="roadmap-steps">
          <div className="roadmap-step">
            <h4>Q1 2025</h4>
            <p>MVP Launch with key games & staking.</p>
          </div>
          <div className="roadmap-step">
            <h4>Q2 2025</h4>
            <p>Beta Launch & user feedback integration.</p>
          </div>
          <div className="roadmap-step">
            <h4>Q3 2025</h4>
            <p>Full launch with governance features.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team fade-in-section">
        <h2>Meet the Founders</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/api/placeholder/150/150" alt="Djordje" />
            <h4>Djordje Petrovic</h4>
            <p>IT Project Manager & Poker Pro — Strategy & Operations Lead.</p>
          </div>
          <div className="team-member">
            <img src="/api/placeholder/150/150" alt="Aleksandar" />
            <h4>Aleksandar Djordjevic</h4>
            <p>Senior Blockchain Developer — Smart Contracts & Platform Architecture.</p>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <footer className="cta-footer fade-in-section" id="contact">
        <h2>Be Part of the Future of Gambling</h2>
        <p>Join the DAO. Own the House.</p>
        <a href="mailto:contact@gentlemensclub.io" className="btn-primary">Request Demo</a>
      </footer>
    </div>
  );
}