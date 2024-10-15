import React from "react";

function DebugInfo({ debugInfo, reset }) {
  return (
    <div className="fixed top-0 left-0 p-4 bg-white text-black z-50 select-none">
      <p>Clamped Movment X (mx): {debugInfo.clampedX.toFixed(2)}</p>
      <p>Cursor Movment X (mx): {debugInfo.currentMx.toFixed(2)}</p>
      <p>Rotation (deg): {debugInfo.rotation.toFixed(2)}</p>
      <p>Velocity: {debugInfo.velocity.toFixed(2)}</p>
      <p>Direction: {debugInfo.direction}</p>
      <p>
        Direction Reversed: {debugInfo.isDirectionReversed ? "true" : "false"}
      </p>
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
