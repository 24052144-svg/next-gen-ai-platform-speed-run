import React, { useRef, useEffect } from 'react';

const PRICING_MATRIX = {
  tiers: {
    starter: { baseRate: 19, name: 'Starter', description: 'For individuals and small teams.' },
    professional: { baseRate: 49, name: 'Professional', description: 'Advanced features for growing teams.' },
    enterprise: { baseRate: 199, name: 'Enterprise', description: 'Unlimited power for large organizations.' }
  },
  billingMultiplier: {
    monthly: 1,
    annual: 0.8 // 20% annual discount
  },
  regionalTariffs: {
    USD: { rate: 1, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    INR: { rate: 83.5, symbol: '₹' }
  }
};

export default function Pricing() {
  // ALL price state is held in DOM refs — zero React state reflows on toggle/change
  const priceRefs = {
    starter: useRef(null),
    professional: useRef(null),
    enterprise: useRef(null)
  };
  const currencySelectRef = useRef(null);
  const billingToggleRef = useRef(null);

  /**
   * Directly mutates only the text node of each price span via the Web Animations API.
   * No setState → no virtual DOM diffing → no parent re-render → no layout reflow.
   * Uses WAAPI to run a hardware-accelerated flip animation on each price element.
   */
  const calculateAndSetPrices = () => {
    const currency = currencySelectRef.current.value;
    const isAnnual = billingToggleRef.current.checked;
    
    const billingKey = isAnnual ? 'annual' : 'monthly';
    const multiplier = PRICING_MATRIX.billingMultiplier[billingKey];
    const tariff = PRICING_MATRIX.regionalTariffs[currency];

    Object.keys(PRICING_MATRIX.tiers).forEach(tierKey => {
      const base = PRICING_MATRIX.tiers[tierKey].baseRate;
      const finalPrice = (base * multiplier * tariff.rate).toFixed(2);
      
      const el = priceRefs[tierKey].current;
      if (!el) return;

      // WAAPI: micro-interaction exit — 150ms ease-out
      el.animate(
        [
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-8px)' }
        ],
        { duration: 150, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)', fill: 'forwards' }
      ).onfinish = () => {
        // Mutate ONLY the text node — no re-render triggered
        el.textContent = `${tariff.symbol}${finalPrice}`;

        // WAAPI: micro-interaction enter — 175ms ease-out
        el.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 175, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)', fill: 'forwards' }
        );
      };
    });
  };

  useEffect(() => {
    // Initial calculation on mount (no animation on first load)
    const currency = currencySelectRef.current.value;
    const tariff = PRICING_MATRIX.regionalTariffs[currency];
    const multiplier = PRICING_MATRIX.billingMultiplier.monthly;

    Object.keys(PRICING_MATRIX.tiers).forEach(tierKey => {
      const base = PRICING_MATRIX.tiers[tierKey].baseRate;
      const finalPrice = (base * multiplier * tariff.rate).toFixed(2);
      if (priceRefs[tierKey].current) {
        priceRefs[tierKey].current.textContent = `${tariff.symbol}${finalPrice}`;
      }
    });
  }, []);

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="pricing-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your needs.</p>
          
          <div className="pricing-controls">
            <div className="billing-toggle">
              <span className="billing-label">Monthly</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  ref={billingToggleRef} 
                  onChange={calculateAndSetPrices} 
                />
                <span className="slider round"></span>
              </label>
              <span className="billing-label">Annual (Save 20%)</span>
            </div>

            <div className="currency-selector">
              <select ref={currencySelectRef} onChange={calculateAndSetPrices}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pricing-grid">
          {Object.entries(PRICING_MATRIX.tiers).map(([key, tier]) => (
            <div key={key} className="pricing-card">
              <h3>{tier.name}</h3>
              <p className="tier-desc">{tier.description}</p>
              <div className="price-display">
                {/* Only this span's textContent is mutated — parent never re-renders */}
                <span className="price-value" ref={priceRefs[key]}></span>
                <span className="price-period">/mo</span>
              </div>
              <ul className="feature-list">
                <li><img src="/src/assets/SVGs/arrow-trending-up.svg" alt="check" /> AI Automation</li>
                <li><img src="/src/assets/SVGs/chart-pie.svg" alt="check" /> Advanced Analytics</li>
                <li><img src="/src/assets/SVGs/cog-8-tooth.svg" alt="check" /> Custom Integrations</li>
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
