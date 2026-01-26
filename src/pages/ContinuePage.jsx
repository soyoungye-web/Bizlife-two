import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../App.jsx';

export default function ContinuePage() {
  const navigate = useNavigate();
  const { save } = React.useContext(GameContext);

  return (
    <section className="panel">
      <h2>继续游戏</h2>
      {save ? (
        <>
          <div className="stat-card">
            <div>当前进度：第 {save.dayIndex} 天</div>
            <div>开局年龄：{save.age} 岁</div>
            <div>难度：{save.difficulty}</div>
          </div>
          <button className="primary-button" onClick={() => navigate('/game')}>
            进入游戏
          </button>
        </>
      ) : (
        <>
          <p>暂无存档，请先开始新人生。</p>
          <button className="secondary-button" onClick={() => navigate('/new')}>
            前往新游戏
          </button>
        </>
      )}
    </section>
  );
}
