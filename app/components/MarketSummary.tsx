"use client";
import React, { useEffect } from 'react'

const MarketSummary = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          width: 550,
          height: 550,
          symbolsGroups: [
            {
              name: "Indices",
              originalName: "Indices",
              symbols: [
                { name: "FOREXCOM:SPXUSD", displayName: "S&P 500 Index" },
                { name: "FOREXCOM:NSXUSD", displayName: "US 100 Cash CFD" },
                { name: "FOREXCOM:DJI", displayName: "Dow Jones Industrial Average Index" },
                { name: "INDEX:NKY", displayName: "Japan 225" },
                { name: "INDEX:DEU40", displayName: "DAX Index" },
                { name: "FOREXCOM:UKXGBP", displayName: "FTSE 100 Index" }
              ]
            },
            {
              name: "Forex",
              originalName: "Forex",
              symbols: [
                { name: "FX:EURUSD", displayName: "EUR to USD" },
                { name: "FX:GBPUSD", displayName: "GBP to USD" },
                { name: "FX:USDJPY", displayName: "USD to JPY" },
                { name: "FX:USDCHF", displayName: "USD to CHF" },
                { name: "FX:AUDUSD", displayName: "AUD to USD" },
                { name: "FX:USDCAD", displayName: "USD to CAD" }
              ]
            },
            {
              name: "Futures",
              originalName: "Futures",
              symbols: [
                { name: "BMFBOVESPA:ISP1!", displayName: "S&P 500 Index Futures" },
                { name: "BMFBOVESPA:EUR1!", displayName: "Euro Futures" },
                { name: "PYTH:WTI3!", displayName: "WTI CRUDE OIL" },
                { name: "BMFBOVESPA:ETH1!", displayName: "Hydrous ethanol" },
                { name: "BMFBOVESPA:CCM1!", displayName: "Corn" }
              ]
            },
            {
              name: "Bonds",
              originalName: "Bonds",
              symbols: [
                { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
                { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
                { name: "EUREX:FGBM1!", displayName: "Euro BOBL" }
              ]
            }
          ],
          showSymbolLogo: true,
          isTransparent: false,
          colorTheme: "dark",
          locale: "en",
          backgroundColor: "#131722"
        });
    
        const container = document.querySelector(".tradingview-widget-container");
        if (container) {
          container.appendChild(script);
        }
      }, []);
    
  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}

export default MarketSummary
