# BizLife Two (Web Skeleton)

本仓库提供 BizLife 的 Web 应用骨架版本（React + Vite），用于验证主页流程与基础交互。

## 启动方式

```bash
npm install
npm run dev
```

然后在浏览器打开 `http://localhost:5173`。

### 已知问题（本环境）

在当前受限环境中执行 `npm install` 会出现 `403 Forbidden`（无法获取 `@vitejs/plugin-react`），导致 `vite` 未安装，`npm run dev` / `npm run build` 无法运行。请在具备 npm registry 访问权限的环境中重新执行上述命令，或配置可用的 npm 镜像后重试（例如设置 `npm config set registry <your-registry>`）。在依赖成功安装后即可运行开发服务器或构建产物。

## 功能范围

- 启动页：开始新人生 / 继续游戏 / 设置
- 新游戏：难度选择、愿景权重校验（总和=100%）
- 继续游戏：读取本地存档
- 主面板：只有在游戏开始后才显示经营指标
- 任意页面顶部均可返回首页

## 验收自检

已根据 `UAT.md` 逐条自检并记录在 `UAT_SELF_CHECK.md`。
