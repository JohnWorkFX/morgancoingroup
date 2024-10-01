import React from "react";

const CrytoCoinWatch = () => {
  return (
    <div
      style={{
        height: "40px",
        backgroundColor: "#1D2330",
        overflow: "hidden",
        boxSizing: "border-box",
        border: "1px solid #282E3B",
        borderRadius: "4px",
        textAlign: "right",
        lineHeight: "14px",
        fontSize: "12px",
        textSizeAdjust: "100%",
        boxShadow: "inset 0 -20px 0 0 #262B38",
        padding: "0",
        margin: "0",
        width: "100%",
      }}
    >
      <div style={{ height: "40px", padding: "0", margin: "0", width: "100%" }}>
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover="
          width="100%"
          height="36px"
          scrolling="auto"
          frameBorder="0"
          style={{ border: "0", margin: "0", padding: "0" }}
        ></iframe>
      </div>
    </div>
  );
};

export default CrytoCoinWatch;
