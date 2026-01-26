import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../App.jsx';

const defaultWeights = {
  wealth: 50,
  career: 50,
  influence: 0,
  stability: 0
};

const visionLabels = {
  wealth: '财富',
  career: '事业',
  influence: '影响力',
  stability: '稳健'
};

export default function NewGamePage() {
  const navigate = useNavigate();
  const { startNewGame } = React.useContext(GameContext);
  const [difficulty, setDifficulty] = useState('standard');
  const [weights, setWeights] = useState(defaultWeights);
  const [selected, setSelected] = useState({
    wealth: true,
    career: true,
    influence: false,
    stability: false
  });

  const totalWeight = useMemo(() => {
    return Object.keys(weights).reduce((sum, key) => sum + Number(weights[key] || 0), 0);
  }, [weights]);

  const hasSelection = Object.values(selected).some(Boolean);
  const canStart = totalWeight === 100 && hasSelection;

  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({
      ...prev,
      [key]: Number(value)
    }));
  };

  const handleToggle = (key) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStart = () => {
    if (!canStart) return;
    const visionWeights = Object.keys(weights).reduce((acc, key) => {
      acc[key] = selected[key] ? Number(weights[key]) : 0;
      return acc;
    }, {});

    startNewGame({
      difficulty,
      visionWeights
    });
    navigate('/game');
  };

  return (
    <section className="panel">
      <h2>新游戏设置</h2>
      <div className="form-block">
        <label className="field-label">难度档位</label>
        <div className="radio-row">
          <label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={difficulty === 'easy'}
              onChange={() => setDifficulty('easy')}
            />
            轻松
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="standard"
              checked={difficulty === 'standard'}
              onChange={() => setDifficulty('standard')}
            />
            标准
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={difficulty === 'hard'}
              onChange={() => setDifficulty('hard')}
            />
            硬核
          </label>
        </div>
      </div>

      <div className="form-block">
        <label className="field-label">愿景选择与权重（总和=100%）</label>
        <div className="grid-2">
          {Object.keys(weights).map((key) => (
            <div className="vision-card" key={key}>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={selected[key]}
                  onChange={() => handleToggle(key)}
                />
                {visionLabels[key]}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={weights[key]}
                onChange={(event) => handleWeightChange(key, event.target.value)}
              />
            </div>
          ))}
        </div>
        <div className={`hint ${canStart ? 'ok' : 'warning'}`}>
          当前权重总和：{totalWeight}%（需要=100% 且至少选择一项）
        </div>
      </div>

      <button className="primary-button" onClick={handleStart} disabled={!canStart}>
        确认开局
      </button>
    </section>
  );
}
