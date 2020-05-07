import React, { useState, useEffect } from "react";

import "./Loader.css";

const loaderLabels = [
  "Connecting to server...",
  "It takes more time than usual. Waking up server...",
  "Few more seconds...",
];

const CHANGE_LABEL_INTERVAL = 5000;

export function Loader() {
  const [labelIdx, setLabelIdx] = useState(0);
  const shouldUpdateLabel = labelIdx < loaderLabels.length - 1;

  useEffect(() => {
    if (shouldUpdateLabel) {
      const intervalId = setInterval(() => {
        setLabelIdx((prevLabelIdx) => prevLabelIdx + 1);
      }, CHANGE_LABEL_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [shouldUpdateLabel]);

  return (
    <div className="lds-container">
      <div className="lds-ring">
        <div /> <div /> <div /> <div />
      </div>
      <div className="lds-label">{loaderLabels[labelIdx]}</div>
    </div>
  );
}
