'use client';
import React, { useEffect } from 'react';

const ForexCrossRate = () => {
  useEffect(() => {
    const container = document.querySelector(".tradingview-widget-container__widget_forex");

    // Check if the container exists and the script has not already been appended
    if (container && !container.innerHTML) {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: '100%',
        currencies: [
          "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"
        ],
        isTransparent: false,
        colorTheme: "dark",
        locale: "en",
        backgroundColor: "#000000"
      });
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget_forex h-[400px]"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default ForexCrossRate;
