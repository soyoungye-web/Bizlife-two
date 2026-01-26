import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'bizlife_game_state';
const COMPANY_KEY = 'bizlife_company';
const DEFAULT_STATE = { day: 1, cash: 500000 };
const INDUSTRY_LABELS = {
  retail: '连锁零售',
  service: '连锁服务',
  software: '互联网软件'
};

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
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('retail');

  useEffect(() => {
    setGameState(loadGameState());
    try {
      const rawCompany = localStorage.getItem(COMPANY_KEY);
      if (rawCompany) {
        setCompany(JSON.parse(rawCompany));
      }
    } catch (error) {
      setCompany(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const canCreateCompany = companyName.trim().length > 0;

  const handleCreateCompany = () => {
    if (!canCreateCompany) return;
    const newCompany = {
      name: companyName.trim(),
      industry,
      createdDay: gameState.day
    };
    localStorage.setItem(COMPANY_KEY, JSON.stringify(newCompany));
    setCompany(newCompany);
  };

  const handleNextDay = () => {
    }));
  };

  return (
    <section className="panel">
      <h2>主面板</h2>
      {!company ? (
        <div className="form-block">
          <label className="field-label" htmlFor="company-name">
            企业名称
          </label>
          <input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="请输入企业名称"
          />
          <div className="form-block">
            <label className="field-label">选择行业</label>
            <div className="radio-row">
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="retail"
                  checked={industry === 'retail'}
                  onChange={() => setIndustry('retail')}
                />
                连锁零售
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="service"
                  checked={industry === 'service'}
                  onChange={() => setIndustry('service')}
                />
                连锁服务
              </label>
              <label>
                <input
                  type="radio"
                  name="industry"
                  value="software"
                  checked={industry === 'software'}
                  onChange={() => setIndustry('software')}
                />
                互联网软件
              </label>
            </div>
          </div>
          <button className="primary-button" onClick={handleCreateCompany} disabled={!canCreateCompany}>
            创建企业
          </button>
        </div>
      ) : (
        <>
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
          <div className="stat-card">
            <div className="stat-label">企业名称</div>
            <div className="stat-value">{company.name}</div>
            <div className="stat-label">行业</div>
            <div className="stat-value">{INDUSTRY_LABELS[company.industry] ?? company.industry}</div>
            <div className="stat-label">创建于</div>
            <div className="stat-value">Day {company.createdDay}</div>
          </div>
          <button className="primary-button" onClick={handleNextDay}>
            进入下一天
          </button>
        </>
      )}
    </section>
  );
}
