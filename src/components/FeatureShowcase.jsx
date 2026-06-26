import React, { useState, useEffect, useRef } from 'react';

const FEATURES = [
  {
    title: 'Real-Time Sync',
    description: 'Keep your data synchronized across all devices instantly without manual refreshes.',
    icon: 'arrow-path.svg',
    color: 'var(--color-mystic-mint)'
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep dive into your performance metrics with AI-powered insights.',
    icon: 'chart-pie.svg',
    color: 'var(--color-forsythia)'
  },
  {
    title: 'Secure Infrastructure',
    description: 'Bank-grade encryption ensures your data remains protected at all times.',
    icon: 'cube-16-solid.svg',
    color: 'var(--color-deep-saffron)'
  },
  {
    title: 'Smart Search',
    description: 'Find exactly what you need in milliseconds with our predictive search engine.',
    icon: 'search.svg',
    color: 'var(--color-arctic-powder)'
  }
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features-section" ref={sectionRef}>
      <div className="container">
        <div className={`features-header animate-in ${isVisible ? 'visible delay-0' : ''}`}>
          <h2>Powerful Capabilities</h2>
          <p>Everything you need to scale your platform.</p>
        </div>

        {isMobile ? (
          <div className="accordion-wrapper">
            {FEATURES.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={index} 
                  className={`accordion-item animate-in ${isVisible ? `visible delay-${index + 1}` : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="accordion-header">
                    <img src={`/src/assets/SVGs/${feature.icon}`} alt={feature.title} className="feature-icon" />
                    <h3>{feature.title}</h3>
                    <img 
                      src={`/src/assets/SVGs/${isActive ? 'chevron-up.svg' : 'chevron-down.svg'}`} 
                      alt="toggle" 
                      className="accordion-toggle-icon" 
                      style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0)' }}
                    />
                  </div>
                  <div className="accordion-content">
                    <p style={{ paddingBottom: '1.5rem' }}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bento-grid">
            {FEATURES.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={index} 
                  className={`bento-node animate-in ${isVisible ? `visible delay-${index + 1}` : ''} ${isActive ? 'active' : ''} bento-node-${index}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="bento-icon-wrapper">
                    <img src={`/src/assets/SVGs/${feature.icon}`} alt={feature.title} className="feature-icon" />
                  </div>
                  <div className="bento-content">
                    <h3>{feature.title}</h3>
                    <p className="bento-desc">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
