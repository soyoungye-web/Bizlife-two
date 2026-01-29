import React, { useEffect, useState } from 'react';
import { GameContext } from '../App.jsx';

const SETTINGS_KEY = 'bizlife.settings';

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { music: true, notifications: true };
  } catch (error) {
    return { music: true, notifications: true };
  }
};

export default function SettingsPage() {
  const { deleteSave } = React.useContext(GameContext);
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="panel">
      <h2>设置</h2>
      <div className="settings-list">
        <label>
          <input type="checkbox" checked={settings.music} onChange={() => toggle('music')} />
          背景音乐
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => toggle('notifications')}
          />
          事件提醒
        </label>
      </div>
      <button className="secondary-button" onClick={deleteSave}>
        清除本地存档
      </button>
    </section>
  );
}
