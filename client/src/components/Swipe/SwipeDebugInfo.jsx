function SwipeDebugInfo({ swipeDebugInfo, reset }) {
  return (
    <div className="fixed top-20 left-0 p-4 bg-white text-black z-50 select-none">
      <p>Clamped Movment X (mx): {swipeDebugInfo.clampedX.toFixed(2)}</p>
      <p>Cursor Movment X (mx): {swipeDebugInfo.currentMx.toFixed(2)}</p>
      <p>Rotation (deg): {swipeDebugInfo.rotation.toFixed(2)}</p>
      <p>Velocity: {swipeDebugInfo.velocity.toFixed(2)}</p>
      <p>Direction: {swipeDebugInfo.direction}</p>
      <p>
        Direction Reversed:{" "}
        {swipeDebugInfo.isDirectionReversed ? "true" : "false"}
      </p>
      <p className={swipeDebugInfo.trigger ? "text-green-500" : "text-red-500"}>
        Trigger: {swipeDebugInfo.trigger ? "true" : "false"}
      </p>
      <button className="bg-white border-red-800" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default SwipeDebugInfo;
