import React from "react";

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      <span className="tooltiptext">{text}</span>
      <style jsx>{`
        .tooltiptext {
          visibility: hidden;
          width: 280px;
          background-color: #1d293b;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%; /* Position above the tooltip element */
          left: 10%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .relative:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Tooltip;
