import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../App.jsx';

export default function GamePage() {
  const navigate = useNavigate();
  const { save, updateSave } = React.useContext(GameContext);

  const derived = useMemo(() => {
    if (!save) return null;
    const remainingDays = Math.max(save.lifespanDays - save.ageDays, 0);
    return {
      remainingDays,
      cashFormatted: save.cash.toLocaleString('zh-CN')
    };
  }, [save]);

  const handleNextDay = () => {
    if (!save) return;
    const nextDay = save.dayIndex + 1;
    const nextAgeDays = save.ageDays + 1;
    const nextAge = nextAgeDays % 365 === 0 ? save.age + 1 : save.age;
    const nextCash = Math.max(save.cash + Math.round(Math.random() * 20000 - 5000), 0);

    updateSave({
      ...save,
      dayIndex: nextDay,
      ageDays: nextAgeDays,
      age: nextAge,
      cash: nextCash
    });
  };

  return (
    <section className="panel">
      <h2>主面板</h2>
      {!save && (
        <div className="empty-state">
          <p>当前没有进行中的游戏，请从首页开始新人生或继续游戏。</p>
          <button className="primary-button" onClick={() => navigate('/')}>
            返回首页
          </button>
        </div>
      )}

      {save && derived && (
        <>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">第</div>
              <div className="stat-value">{save.dayIndex} 天</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">当前年龄</div>
              <div className="stat-value">{save.age} 岁</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">剩余天数</div>
              <div className="stat-value">{derived.remainingDays} 天</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">现金</div>
              <div className="stat-value">¥ {derived.cashFormatted}</div>
            </div>
          </div>

          <div className="action-row">
            <button className="primary-button" onClick={handleNextDay}>
              进入下一天
            </button>
            <button className="secondary-button" onClick={() => navigate('/')}>
              返回首页
            </button>
          </div>
        </>
      )}
    </section>
  );
}
