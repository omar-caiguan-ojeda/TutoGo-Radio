import { useState, useEffect } from "react";

export default function useRadioHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("radioHistory")) || [];
      setHistory(stored);
    }
  }, []);

  const addToHistory = (station) => {
    const newHistory = [
      { ...station, addedAt: Date.now() },
      ...history.filter((s) => s.stationuuid !== station.stationuuid),
    ].slice(0, 5);
    setHistory(newHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("radioHistory", JSON.stringify(newHistory));
    }
  };

  return { history, addToHistory };
}