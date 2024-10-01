'use client';
import React, { useEffect } from 'react';


const SymbolInfo = () => {
    useEffect(() => {
        const container = document.querySelector(".tradingview-widget-container__widget_symbol");
    
        // Check if the container exists and the script has not already been appended
        if (container && !container.innerHTML) {
          const script = document.createElement('script');
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
          script.async = true;
          script.innerHTML = JSON.stringify({
            "symbol": "NASDAQ:AAPL",
            "width": "100%",
            "locale": "en",
            "colorTheme": "dark",
            "isTransparent": false
          
          });
          container.appendChild(script);
        }
      }, []);
    
      return (
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget_symbol "></div>
          <div className="tradingview-widget-copyright">
            <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
              <span className="blue-text">Track all markets on TradingView</span>
            </a>
          </div>
        </div>
      );
}

export default SymbolInfo
