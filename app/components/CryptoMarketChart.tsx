'use client'
import React, {useEffect } from 'react'

const CryptoMarketChart = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          width: "100%",
          height: 550,
          defaultColumn: "overview",
          screener_type: "crypto_mkt",
          displayCurrency: "USD",
          colorTheme: "dark",
          locale: "en",
        });
    
        const container = document.getElementById("tradingview-widget-container");
        if (container) {
          container.appendChild(script);
        }
      }, []);
  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
    <div className="tradingview-widget-container__widget"></div>
    <div className="tradingview-widget-copyright">
      <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span className="blue-text">Track all markets on TradingView</span>
      </a>
    </div>
  </div>
  )
}

export default CryptoMarketChart
