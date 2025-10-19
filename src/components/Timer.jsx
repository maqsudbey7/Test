// src/components/Timer.jsx
import React, { useEffect, useState } from "react";

export default function Timer({ seconds, onTimeUp }) {
  const [sec, setSec] = useState(seconds);

  useEffect(() => {
    setSec(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!sec) { onTimeUp && onTimeUp(); return; }
    const id = setInterval(() => setSec(s => s-1), 1000);
    return () => clearInterval(id);
  }, [sec]);

  const mm = Math.floor(sec / 60).toString().padStart(2, "0");
  const ss = (sec % 60).toString().padStart(2, "0");

  return <div className="text-sm font-medium">Vaqt: {mm}:{ss}</div>;
}
