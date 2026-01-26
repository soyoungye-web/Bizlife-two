import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage({ save }) {
  return (
    <section className="panel hero">
      <h1>BizLife</h1>
      <p className="subtitle">文字商业经营游戏 · Web 骨架版本</p>
      <div className="button-stack">
        <Link className="primary-button" to="/new">
          开始新人生
        </Link>
        <Link className="secondary-button" to="/continue">
          继续游戏
        </Link>
        <Link className="secondary-button" to="/settings">
          设置
        </Link>
      </div>
      <div className="hint">
        {save ? '检测到本地存档，可继续游戏。' : '当前没有存档，可从“开始新人生”进入。'}
      </div>
    </section>
  );
}
