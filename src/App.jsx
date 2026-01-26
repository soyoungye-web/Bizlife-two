import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import NewGamePage from './pages/NewGamePage.jsx';
import ContinuePage from './pages/ContinuePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import GamePage from './pages/GamePage.jsx';

const STORAGE_KEY = 'bizlife.save';

const loadSave = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const createId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `save-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const persistSave = (save) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
};

const clearSave = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const GameContext = React.createContext(null);

const Shell = ({ children }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">BizLife</div>
        <nav className="header-actions">
          <Link className="ghost-button" to="/">返回首页</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

const AppRoutes = () => {
  const [save, setSave] = useState(() => loadSave());

  const startNewGame = useCallback((options) => {
    const age = Math.floor(Math.random() * 21) + 35;
    const newSave = {
      id: createId(),
      createdAt: new Date().toISOString(),
      dayIndex: 1,
      ageDays: 0,
      lifespanDays: 20 * 365,
      age,
      cash: 500000,
      vision: options,
      difficulty: options.difficulty
    };
    persistSave(newSave);
    setSave(newSave);
    return newSave;
  }, []);

  const updateSave = useCallback((nextSave) => {
    persistSave(nextSave);
    setSave(nextSave);
  }, []);

  const deleteSave = useCallback(() => {
    clearSave();
    setSave(null);
  }, []);

  const value = useMemo(
    () => ({
      save,
      startNewGame,
      updateSave,
      deleteSave
    }),
    [save, startNewGame, updateSave, deleteSave]
  );

  return (
    <GameContext.Provider value={value}>
      <Routes>
        <Route
          path="/"
          element={
            <Shell>
              <HomePage save={save} />
            </Shell>
          }
        />
        <Route
          path="/new"
          element={
            <Shell>
              <NewGamePage />
            </Shell>
          }
        />
        <Route
          path="/continue"
          element={
            <Shell>
              <ContinuePage />
            </Shell>
          }
        />
        <Route
          path="/settings"
          element={
            <Shell>
              <SettingsPage />
            </Shell>
          }
        />
        <Route
          path="/game"
          element={
            <Shell>
              <GamePage />
            </Shell>
          }
        />
      </Routes>
    </GameContext.Provider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
