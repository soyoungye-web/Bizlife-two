import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'bizlife_game_state';
const DEFAULT_STATE = { day: 1, cash: 500000 };

const loadGameState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.day !== 'number' || typeof parsed?.cash !== 'number') {
      return DEFAULT_STATE;
    }
    return parsed;
  } catch (error) {
    return DEFAULT_STATE;
  }
};

export default function GamePage() {
  const [gameState, setGameState] = useState(DEFAULT_STATE);

  useEffect(() => {
    setGameState(loadGameState());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const handleNextDay = () => {
    setGameState((prev) => ({
      day: prev.day + 1,
      cash: prev.cash + 1000
    }));
  };

  return (
    <section className="panel">
      <h2>主面板</h2>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Day</div>
          <div className="stat-value">{gameState.day}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cash</div>
          <div className="stat-value">{gameState.cash}</div>
        </div>
      </div>
      <button className="primary-button" onClick={handleNextDay}>
        进入下一天
      </button>
    </section>
  );
}
