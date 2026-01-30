import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'bizlife_game_state';
const COMPANY_KEY = 'bizlife_company';
const DEFAULT_STATE = { day: 1, cash: 500000, reputation: 50, morale: 50 };

const INDUSTRY_LABELS = {
  retail: '连锁零售',
  service: '连锁服务',
  software: '互联网软件'
};
const INDUSTRY_INCOME = {
  retail: 2000,
  service: 3000,
  software: 5000
};
const BASE_EVENTS = [
  { id: 'market-01', name: '市场需求小幅上扬', category: '市场/宏观', effects: { cash: 1500 } },
  { id: 'market-02', name: '行业价格战升温', category: '市场/宏观', effects: { cash: -2000, morale: -3 } },
  { id: 'market-03', name: '宏观政策利好', category: '市场/宏观', effects: { cash: 2500, reputation: 2 } },
  { id: 'market-04', name: '原材料短缺', category: '市场/宏观', effects: { cash: -2500, morale: -2 } },
  { id: 'market-05', name: '区域市场回暖', category: '市场/宏观', effects: { cash: 1800 } },
  { id: 'market-06', name: '竞争对手扩张', category: '市场/宏观', effects: { cash: -1200, reputation: -1 } },
  { id: 'market-07', name: '渠道成本下降', category: '市场/宏观', effects: { cash: 2000 } },
  { id: 'market-08', name: '行业监管趋严', category: '市场/宏观', effects: { cash: -1500, reputation: -1 } },
  { id: 'market-09', name: '市场情绪回升', category: '市场/宏观', effects: { cash: 1300 } },
  { id: 'market-10', name: '宏观信贷收紧', category: '市场/宏观', effects: { cash: -1800 } },
  { id: 'market-11', name: '行业补贴到位', category: '市场/宏观', effects: { cash: 2200, reputation: 1 } },
  { id: 'market-12', name: '供应链延迟', category: '市场/宏观', effects: { cash: -1600, morale: -1 } },
  { id: 'market-13', name: '库存周转改善', category: '市场/宏观', effects: { cash: 1700 } },
  { id: 'market-14', name: '成本意外上涨', category: '市场/宏观', effects: { cash: -1400 } },
  { id: 'market-15', name: '线上流量回流', category: '市场/宏观', effects: { cash: 1600 } },
  { id: 'brand-01', name: '客户口碑发酵', category: '客户/品牌', effects: { reputation: 3, cash: 1200 } },
  { id: 'brand-02', name: '投诉事件上升', category: '客户/品牌', effects: { reputation: -4, morale: -2 } },
  { id: 'brand-03', name: '新品获得好评', category: '客户/品牌', effects: { reputation: 2, cash: 1500 } },
  { id: 'brand-04', name: '社媒负面扩散', category: '客户/品牌', effects: { reputation: -5 } },
  { id: 'brand-05', name: '品牌联名曝光', category: '客户/品牌', effects: { reputation: 4, cash: 2000 } },
  { id: 'brand-06', name: '客户复购下降', category: '客户/品牌', effects: { cash: -1300, reputation: -2 } },
  { id: 'brand-07', name: '客服流程优化', category: '客户/品牌', effects: { reputation: 2, morale: 1 } },
  { id: 'brand-08', name: '广告投放超预期', category: '客户/品牌', effects: { cash: 1800, reputation: 1 } },
  { id: 'brand-09', name: '渠道评价下滑', category: '客户/品牌', effects: { reputation: -3, cash: -800 } },
  { id: 'brand-10', name: '老客户推荐', category: '客户/品牌', effects: { reputation: 3, cash: 1100 } },
  { id: 'brand-11', name: '媒体正面报道', category: '客户/品牌', effects: { reputation: 4 } },
  { id: 'brand-12', name: '口碑争议', category: '客户/品牌', effects: { reputation: -4, morale: -1 } },
  { id: 'team-01', name: '团队协作提升', category: '团队/内部', effects: { morale: 3 } },
  { id: 'team-02', name: '核心成员离职', category: '团队/内部', effects: { morale: -5, reputation: -1 } },
  { id: 'team-03', name: '培训计划成效', category: '团队/内部', effects: { morale: 2, reputation: 1 } },
  { id: 'team-04', name: '加班压力增加', category: '团队/内部', effects: { morale: -3 } },
  { id: 'team-05', name: '新人表现亮眼', category: '团队/内部', effects: { morale: 2, cash: 800 } },
  { id: 'team-06', name: '团队冲突', category: '团队/内部', effects: { morale: -4 } },
  { id: 'team-07', name: '组织文化活动', category: '团队/内部', effects: { morale: 3 } },
  { id: 'team-08', name: '绩效激励兑现', category: '团队/内部', effects: { morale: 4, cash: -1000 } },
  { id: 'team-09', name: '流程协同优化', category: '团队/内部', effects: { morale: 2, cash: 1200 } },
  { id: 'team-10', name: '管理层调整', category: '团队/内部', effects: { morale: -2, reputation: -1 } },
  { id: 'team-11', name: '团队招募顺利', category: '团队/内部', effects: { morale: 2 } },
  { id: 'team-12', name: '内部沟通失衡', category: '团队/内部', effects: { morale: -3 } },
  { id: 'ops-01', name: '设备维护顺利', category: '运营/风险', effects: { cash: 900 } },
  { id: 'ops-02', name: '小规模事故', category: '运营/风险', effects: { cash: -1200, reputation: -1 } },
  { id: 'ops-03', name: '系统升级成功', category: '运营/风险', effects: { cash: 1400, morale: 1 } },
  { id: 'ops-04', name: '流程失误造成返工', category: '运营/风险', effects: { cash: -1000, morale: -2 } },
  { id: 'ops-05', name: '供应商准时交付', category: '运营/风险', effects: { cash: 1100 } },
  { id: 'ops-06', name: '合规审查提醒', category: '运营/风险', effects: { reputation: -2 } },
  { id: 'ops-07', name: '库存损耗降低', category: '运营/风险', effects: { cash: 1300 } },
  { id: 'ops-08', name: '运营数据异常', category: '运营/风险', effects: { cash: -900, morale: -1 } },
  { id: 'ops-09', name: '风控措施生效', category: '运营/风险', effects: { reputation: 2 } },
  { id: 'ops-10', name: '应急响应及时', category: '运营/风险', effects: { reputation: 2, morale: 1 } },
  { id: 'ops-11', name: '审计指出缺陷', category: '运营/风险', effects: { reputation: -3, cash: -700 } },
  { id: 'ops-12', name: '客户交付提前', category: '运营/风险', effects: { reputation: 2, cash: 1000 } }
];

const buildOptionEffects = (effects, scale) => {
  const scaled = {};
  ['cash', 'reputation', 'morale'].forEach((key) => {
    if (typeof effects[key] === 'number') {
      scaled[key] = Math.round(effects[key] * scale);
    }
  });
  return scaled;
};

const EVENTS = BASE_EVENTS.map((event) => {
  const cautiousEffects = buildOptionEffects(event.effects, 0.5);
  if (Object.keys(cautiousEffects).length === 0) {
    cautiousEffects.morale = 1;
  }
  return {
    id: event.id,
    name: event.name,
    description: `${event.category}出现变化：${event.name}。需要你做出决策。`,
    options: [
      { label: '积极应对', effects: event.effects },
      { label: '谨慎处理', effects: cautiousEffects }
    ]
  };
});

const loadGameState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.day !== 'number' ||
      typeof parsed?.cash !== 'number' ||
      typeof parsed?.reputation !== 'number' ||
      typeof parsed?.morale !== 'number'
    ) {

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
  const [activeEvent, setActiveEvent] = useState(null);

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

  const clamp = (value) => Math.min(100, Math.max(0, value));

  const handleNextDay = () => {
    if (!company || activeEvent) return;
    const dailyIncome = INDUSTRY_INCOME[company.industry] ?? 0;
    setGameState((prev) => {
      const nextState = {
        ...prev,
        day: prev.day + 1,
        cash: prev.cash + dailyIncome
      };
      if (Math.random() < 0.15) {
        const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        setActiveEvent(event);
      }
      return nextState;
    });
  };

  const applyEventEffects = (effects) => {
    setGameState((prev) => ({
      ...prev,
      cash: prev.cash + (effects.cash ?? 0),
      reputation: clamp(prev.reputation + (effects.reputation ?? 0)),
      morale: clamp(prev.morale + (effects.morale ?? 0))
    }));
    setActiveEvent(null);

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
            <div className="stat-card">
              <div className="stat-label">声誉</div>
              <div className="stat-value">{gameState.reputation}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">士气</div>
              <div className="stat-value">{gameState.morale}</div>
            </div>

          </div>
          <div className="stat-card">
            <div className="stat-label">企业名称</div>
            <div className="stat-value">{company.name}</div>
            <div className="stat-label">行业</div>
            <div className="stat-value">{INDUSTRY_LABELS[company.industry] ?? company.industry}</div>
            <div className="stat-label">创建于</div>
            <div className="stat-value">Day {company.createdDay}</div>
            <div className="stat-label">每日收入</div>
            <div className="stat-value">¥ {INDUSTRY_INCOME[company.industry] ?? 0}</div>
          </div>
          {activeEvent && (
            <div className="stat-card">
              <div className="stat-label">随机事件</div>
              <div className="stat-value">{activeEvent.name}</div>
              <div className="hint">{activeEvent.description}</div>
              <div className="action-row">
                {activeEvent.options.map((option) => (
                  <button
                    key={option.label}
                    className="secondary-button"
                    onClick={() => applyEventEffects(option.effects)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className="primary-button" onClick={handleNextDay} disabled={Boolean(activeEvent)}>

          </div>
          <button className="primary-button" onClick={handleNextDay}>
            进入下一天
          </button>
        </>
      )}
    </section>
  );
}
