'use client'
import React, { useEffect } from 'react';

const MarketOverview = () => {
  useEffect(() => {
    // Check if the script has already been appended
    if (!document.querySelector('.tradingview-widget-script')) {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.async = true;
      script.classList.add('tradingview-widget-script'); // Add a class to identify the script
      script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": true,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(42, 46, 57, 0)",
        "scaleFontColor": "rgba(209, 212, 220, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPXUSD", "d": "S&P 500 Index" },
              { "s": "FOREXCOM:NSXUSD", "d": "US 100 Cash CFD" },
              { "s": "FOREXCOM:DJI", "d": "Dow Jones Industrial Average Index" },
              { "s": "INDEX:NKY", "d": "Nikkei 225" },
              { "s": "INDEX:DEU40", "d": "DAX Index" },
              { "s": "FOREXCOM:UKXGBP", "d": "FTSE 100 Index" }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Futures",
            "symbols": [
              { "s": "CME_MINI:ES1!", "d": "S&P 500" },
              { "s": "CME:6E1!", "d": "Euro" },
              { "s": "COMEX:GC1!", "d": "Gold" },
              { "s": "NYMEX:CL1!", "d": "WTI Crude Oil" },
              { "s": "NYMEX:NG1!", "d": "Gas" },
              { "s": "CBOT:ZC1!", "d": "Corn" }
            ],
            "originalTitle": "Futures"
          },
          {
            "title": "Bonds",
            "symbols": [
              { "s": "CBOT:ZB1!", "d": "T-Bond" },
              { "s": "CBOT:UB1!", "d": "Ultra T-Bond" },
              { "s": "EUREX:FGBL1!", "d": "Euro Bund" },
              { "s": "EUREX:FBTP1!", "d": "Euro BTP" },
              { "s": "EUREX:FGBM1!", "d": "Euro BOBL" }
            ],
            "originalTitle": "Bonds"
          },
          {
            "title": "Forex",
            "symbols": [
              { "s": "FX:EURUSD", "d": "EUR to USD" },
              { "s": "FX:GBPUSD", "d": "GBP to USD" },
              { "s": "FX:USDJPY", "d": "USD to JPY" },
              { "s": "FX:USDCHF", "d": "USD to CHF" },
              { "s": "FX:AUDUSD", "d": "AUD to USD" },
              { "s": "FX:USDCAD", "d": "USD to CAD" }
            ],
            "originalTitle": "Forex"
          }
        ]
      });
      document.getElementsByClassName("tradingview-widget-container__widget")[0].appendChild(script);
    }
  }, []);

  return (
    <div>
      {/* TradingView Widget */}
      <div className="tradingview-widget-container ">
        <div className="tradingview-widget-container__widget h-[450px] block"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
