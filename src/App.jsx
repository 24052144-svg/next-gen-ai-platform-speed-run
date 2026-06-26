import React from 'react';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';

function App() {
  return (
    <>
      <header className="app-header">
        <div className="container header-container">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">AI Platform</span>
          </div>
          <nav>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Sign In functionality would be implemented here!')}>Sign In</button>
          </nav>
        </div>
      </header>
      
      <main>
        <Hero />
        <FeatureShowcase />
        <Pricing />
        <SocialProof />
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 AI Platform. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
