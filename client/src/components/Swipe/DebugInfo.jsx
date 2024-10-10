import React from "react";

function DebugInfo({ debugInfo, reset }) {
  return (
    <div className="fixed top-0 left-0 p-4 bg-white text-black z-50">
      <p>Movement X (mx): {debugInfo.mx.toFixed(2)}</p>
      <p>Rotation (deg): {debugInfo.rotation.toFixed(2)}</p>
      <p>Velocity: {debugInfo.velocity.toFixed(2)}</p>
      <p>Direction: {debugInfo.direction === 1 ? "right" : "left"}</p>
      <p className={debugInfo.trigger ? "text-green-500" : "text-red-500"}>
        Trigger: {debugInfo.trigger ? "true" : "false"}
      </p>
      <button className="bg-white border-red-800" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default DebugInfo;
