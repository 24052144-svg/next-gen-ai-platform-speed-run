import React from 'react';
import Hero3D from './Hero3D';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>
            <span className="gradient-text">Automate Data</span>
            <br />
            Accelerate Growth
          </h1>
          <p className="hero-subtitle">
            Next-Gen AI Platform that seamlessly orchestrates your data workflows.
            Experience the future of automation with our context-aware intelligence engine.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Start Building</button>
            <button className="btn btn-secondary">View Documentation</button>
          </div>
        </div>
        <div className="hero-visual" style={{ position: 'relative', minHeight: '400px' }}>
          <Hero3D />
        </div>
      </div>
    </section>
  );
}
