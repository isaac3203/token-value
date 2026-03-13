export default function Page() {
  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>从 AI 产业链到智能度量 — 比智容与净智效</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f6f4ef;
    --c-surface: #fffefa;
    --c-ink: #1a1915;
    --c-ink-2: #4a4840;
    --c-ink-3: #8a877d;
    --c-accent: #b44a2d;
    --c-accent-light: #f0ddd6;
    --c-teal: #1d6e5c;
    --c-teal-light: #d8efea;
    --c-blue: #1a5276;
    --c-blue-light: #d6e9f5;
    --c-border: #ddd9cf;
    --c-gold: #a38520;
    --c-gold-light: #f5edce;
    --font-serif: 'Noto Serif SC', 'Georgia', serif;
    --font-sans: 'Noto Sans SC', 'Helvetica Neue', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--c-bg);
    color: var(--c-ink);
    font-family: var(--font-sans);
    font-weight: 400;
    line-height: 1.9;
    font-size: 17px;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    padding: 120px 0 80px;
    text-align: center;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(180,74,45,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(29,110,92,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-label {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--c-accent);
    border: 1px solid var(--c-accent);
    padding: 4px 16px;
    margin-bottom: 32px;
  }
  .hero h1 {
    font-family: var(--font-serif);
    font-weight: 900;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.3;
    max-width: 720px;
    margin: 0 auto 24px;
    letter-spacing: -0.5px;
  }
  .hero h1 em {
    font-style: normal;
    color: var(--c-accent);
  }
  .hero-sub {
    font-size: 18px;
    color: var(--c-ink-2);
    max-width: 540px;
    margin: 0 auto;
    font-weight: 300;
    line-height: 1.8;
  }

  .hero-formulas {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 48px;
    flex-wrap: wrap;
  }
  .hero-formula-card {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    padding: 20px 32px;
    text-align: center;
    position: relative;
  }
  .hero-formula-card .label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--c-ink-3);
    margin-bottom: 8px;
  }
  .hero-formula-card .formula {
    font-size: 22px;
    color: var(--c-ink);
  }

  /* ── Layout ── */
  .container {
    max-width: 740px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .wide-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Abstract ── */
  .abstract {
    background: var(--c-surface);
    border-top: 3px solid var(--c-accent);
    padding: 48px;
    margin: 60px auto;
    max-width: 740px;
    position: relative;
  }
  .abstract::before {
    content: '摘要';
    position: absolute;
    top: -14px; left: 48px;
    font-family: var(--font-serif);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 4px;
    color: var(--c-accent);
    background: var(--c-surface);
    padding: 0 12px;
  }
  .abstract p {
    color: var(--c-ink-2);
    font-size: 15.5px;
    line-height: 2;
    margin-bottom: 16px;
  }
  .abstract p:last-child { margin-bottom: 0; }

  /* ── Sections ── */
  .section {
    margin: 80px auto;
    max-width: 740px;
    padding: 0 24px;
  }
  .section-num {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 3px;
    color: var(--c-accent);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .section h2 {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 28px;
    line-height: 1.4;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--c-border);
  }
  .section h3 {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 20px;
    line-height: 1.5;
    margin: 40px 0 16px;
    color: var(--c-ink);
  }
  .section p {
    margin-bottom: 20px;
  }
  .section p:last-child { margin-bottom: 0; }

  /* ── Highlight boxes ── */
  .insight {
    border-left: 3px solid var(--c-teal);
    background: var(--c-teal-light);
    padding: 20px 24px;
    margin: 28px 0;
    font-size: 15.5px;
    line-height: 1.9;
    color: #0f4a3e;
  }
  .warning {
    border-left: 3px solid var(--c-accent);
    background: var(--c-accent-light);
    padding: 20px 24px;
    margin: 28px 0;
    font-size: 15.5px;
    line-height: 1.9;
    color: #6b2a14;
  }
  .definition {
    border-left: 3px solid var(--c-blue);
    background: var(--c-blue-light);
    padding: 20px 24px;
    margin: 28px 0;
    font-size: 15.5px;
    line-height: 1.9;
    color: #0f3652;
  }

  /* ── Formula blocks ── */
  .formula-block {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    padding: 32px;
    margin: 32px 0;
    text-align: center;
    position: relative;
  }
  .formula-block .formula-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--c-ink-3);
    margin-bottom: 16px;
  }
  .formula-block .formula-main {
    font-size: 24px;
    margin-bottom: 16px;
  }
  .formula-block .formula-desc {
    font-size: 14px;
    color: var(--c-ink-2);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.7;
  }
  .formula-block .formula-name {
    display: inline-block;
    margin-top: 16px;
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 15px;
    color: var(--c-accent);
    letter-spacing: 1px;
  }

  /* ── Tables ── */
  .table-wrap {
    overflow-x: auto;
    margin: 28px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14.5px;
  }
  thead {
    background: var(--c-ink);
    color: #fff;
  }
  th {
    font-weight: 500;
    padding: 12px 16px;
    text-align: left;
    font-size: 13px;
    letter-spacing: 0.5px;
  }
  td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--c-border);
    vertical-align: top;
    line-height: 1.6;
  }
  tbody tr:nth-child(even) { background: rgba(0,0,0,0.02); }

  /* ── Phenomenon cards ── */
  .phenomenon {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    padding: 28px;
    margin: 24px 0;
  }
  .phenomenon-q {
    font-family: var(--font-serif);
    font-weight: 600;
    font-size: 17px;
    margin-bottom: 12px;
    color: var(--c-ink);
  }
  .phenomenon-a {
    font-size: 15px;
    color: var(--c-ink-2);
    line-height: 1.9;
  }

  /* ── Summary card ── */
  .summary-card {
    background: var(--c-ink);
    color: #e8e5dd;
    padding: 48px;
    margin: 80px auto;
    max-width: 740px;
  }
  .summary-card h2 {
    font-family: var(--font-serif);
    font-weight: 700;
    font-size: 24px;
    color: #fff;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 16px;
  }
  .summary-item {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    align-items: baseline;
  }
  .summary-icon {
    font-size: 18px;
    flex-shrink: 0;
    width: 28px;
    text-align: center;
  }
  .summary-text {
    font-size: 15px;
    line-height: 1.8;
  }
  .summary-text strong {
    color: #fff;
    font-weight: 600;
  }

  /* ── Flow diagram ── */
  .flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin: 28px 0;
    font-size: 14px;
  }
  .flow-node {
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    padding: 8px 16px;
    font-weight: 500;
    white-space: nowrap;
  }
  .flow-arrow {
    color: var(--c-ink-3);
    font-size: 18px;
  }

  /* ── Dividers ── */
  .divider {
    width: 40px;
    height: 2px;
    background: var(--c-accent);
    margin: 64px auto;
  }

  /* ── Footer ── */
  footer {
    text-align: center;
    padding: 60px 24px;
    font-size: 13px;
    color: var(--c-ink-3);
    border-top: 1px solid var(--c-border);
    margin-top: 80px;
  }
  footer a {
    color: var(--c-accent);
    text-decoration: none;
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .abstract { padding: 32px 24px; }
    .abstract::before { left: 24px; }
    .summary-card { padding: 32px 24px; }
    .hero { padding: 80px 24px 60px; }
    .hero-formulas { gap: 16px; }
    .hero-formula-card { padding: 16px 20px; }
    .formula-block { padding: 24px 16px; }
  }

  /* ── Animations ── */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>

<!-- ═══════ Hero ═══════ -->
<header class="hero">
  <div class="hero-label">Exploration Note</div>
  <h1>从 AI 产业链到<em>智能度量</em><br>比智容与净智效的推导</h1>
  <p class="hero-sub">沿着 GPU → 基础设施 → 模型 → 应用的链路追问下去，最终触及一个根本问题：智能能不能被度量？如果能，单位是什么？</p>
  <div class="hero-formulas">
    <div class="hero-formula-card">
      <div class="label">比智容</div>
      <div class="formula">$c_{\text{intel}} = \dfrac{E}{W \cdot \Delta H}$</div>
    </div>
    <div class="hero-formula-card">
      <div class="label">净智效</div>
      <div class="formula">$\mathcal{I} = \dfrac{W \cdot \Delta H_{\text{true}}}{E}$</div>
    </div>
  </div>
</header>

<!-- ═══════ Abstract ═══════ -->
<div class="abstract fade-in">
  <p>这篇文章记录了一条完整的思考链路——从拆解 AI 产业链的物理结构出发，沿途经过类比、质疑、修正，最终触及一个根本性问题：<strong>智能能不能被度量？如果能，单位是什么？</strong></p>
  <p>起点很朴素。我试图理解"能源 → GPU → 基础设施 → 模型 → 应用"这条产业链，并用电力系统做了一套完整类比。但推到"智能"这一层时，所有类比都开始失效——电风扇的风不承载意义，透镜太陌生，用医生解释智能又是循环论证。</p>
  <p>关键转向出现在"减熵"。模型的本质工作是消耗能量，将信息从高熵状态转化为低熵状态。但冰箱也在减熵——区别在于，智能的减熵是<strong>通用的、灵活的</strong>。由此确立核心共识后，通过跨领域远迁移（热力学比热容 + 信号处理信噪比），推导出了两个新概念：<strong>比智容</strong>与<strong>净智效</strong>。</p>
  <p>它们的理论基础与兰道尔原理和香农信道容量定理深层暗合，暗示智能效率存在物理上界。框架仍有未解的断裂点，但作为量纲分析，它指出了智能度量的单位应该长什么样。</p>
</div>

<!-- ═══════ Part 1 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 01</div>
  <h2>AI 产业链的物理结构</h2>

  <h3>从能源到应用的五层链路</h3>
  <div class="flow">
    <span class="flow-node">能源</span><span class="flow-arrow">→</span>
    <span class="flow-node">GPU</span><span class="flow-arrow">→</span>
    <span class="flow-node">算力平台</span><span class="flow-arrow">→</span>
    <span class="flow-node">模型</span><span class="flow-arrow">→</span>
    <span class="flow-node">应用</span><span class="flow-arrow">→</span>
    <span class="flow-node">行业变革</span>
  </div>

  <p>GPU 本身只是芯片。围绕它搭建服务器集群、高速网络、存储系统、冷却与供电——这整套支撑体系就是基础设施（infra）。更准确的定义：</p>

  <div class="definition">
    <strong>infra = GPU 串联成算力平台（核心生产设备）+ 配套厂房设施（保障设备）+ 软件工具链（核心工艺装备）</strong>
  </div>

  <p>算力平台是动力来源，配套设施让它跑得起来，软件工具链让它跑得高效——三者共同构成完整的 infra。</p>

  <h3>模型的生命周期</h3>
  <div class="table-wrap">
    <table>
      <thead><tr><th>阶段</th><th>说明</th><th>对应集群</th></tr></thead>
      <tbody>
        <tr><td>数据采集与清洗</td><td>网页、书籍、代码等海量数据预处理</td><td>数据预处理集群（CPU 为主）</td></tr>
        <tr><td>预训练</td><td>从零训练基座模型，最耗算力</td><td>训练集群（万级 GPU，数月）</td></tr>
        <tr><td>后训练（SFT + RLHF）</td><td>指令微调 + 人类偏好对齐</td><td>微调集群（较小规模）</td></tr>
        <tr><td>评估测试</td><td>Benchmark、红队测试、人工评估</td><td>评估集群（较小规模）</td></tr>
        <tr><td>部署上线</td><td>服务用户请求</td><td>推理集群（低延迟，高并发）</td></tr>
      </tbody>
    </table>
  </div>

  <p>前四步属于<strong>训练侧</strong>（一次性/低频），最后一步属于<strong>服务侧</strong>（持续运行）。随着 AI 用户规模爆发，推理算力的需求增长比训练算力还要快。</p>
</div>

<div class="divider"></div>

<!-- ═══════ Part 2 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 02</div>
  <h2>电力-算力的完整类比</h2>

  <div class="table-wrap">
    <table>
      <thead><tr><th>电力系统</th><th>算力系统</th></tr></thead>
      <tbody>
        <tr><td>发电机组</td><td>GPU</td></tr>
        <tr><td>电网（调度与输配）</td><td>算力平台（调度与负载均衡）</td></tr>
        <tr><td>工厂（制造电器）</td><td>训练集群（制造模型）</td></tr>
        <tr><td>成品电器</td><td>成品模型文件</td></tr>
        <tr><td>电器送到用户家</td><td>模型部署到推理集群</td></tr>
        <tr><td>用户按开关</td><td>用户发消息</td></tr>
        <tr><td>电器消耗电力产生功能</td><td>模型消耗算力产生智能</td></tr>
        <tr><td>用电度数（千瓦时）</td><td>Token</td></tr>
        <tr><td>电费账单</td><td>API 账单</td></tr>
      </tbody>
    </table>
  </div>

  <h3>计量单位的精确对应</h3>
  <p>Token 不是算力平台的产出单位，而是模型的功能输出单位——对应的是风扇吹出的"风"，不是电网发出的"电"。</p>

  <div class="table-wrap">
    <table>
      <thead><tr><th>电力系统</th><th>算力系统</th></tr></thead>
      <tbody>
        <tr><td>兆瓦（装机容量）</td><td>PFLOPS（算力总量）</td></tr>
        <tr><td>度/千瓦时（发电量）</td><td>GPU 小时（算力产出量）</td></tr>
        <tr><td>某电器每小时耗几度电</td><td>某模型每秒消耗多少 FLOPS</td></tr>
        <tr><td>电器吹出的风</td><td>模型输出的 Token</td></tr>
      </tbody>
    </table>
  </div>

  <div class="insight">
    <strong>为什么按 Token 而非 FLOPS 付费？</strong> 好的商业计价方式永远按用户能理解的产出收费，而不是按用户看不见的消耗收费。自来水按吨收费而不是按水泵转了多少圈，逻辑完全一样。
  </div>
</div>

<div class="divider"></div>

<!-- ═══════ Part 3 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 03</div>
  <h2>类比的边界——智能在哪里</h2>

  <p>电风扇类比在产业链和商业逻辑层面覆盖得很好，但推到"智能"这一层就失效了。风不承载意义，而模型输出承载意义。</p>

  <p>透镜系统更精确地对应了"涌现"——图像不存储在镜片里也不在光线里，只存在于光线穿过镜片的那个过程中。但整条链条对普通人太陌生。用医生类比则犯了循环论证——用智能解释智能。</p>

  <h3>五种形式的智能</h3>
  <p>追问下去，模型系统中其实存在五种不同形态的智能：</p>

  <div class="table-wrap">
    <table>
      <thead><tr><th>形态</th><th>存在位置</th><th>类比</th></tr></thead>
      <tbody>
        <tr><td>被压缩的人类智能</td><td>训练数据 → 模型参数</td><td>琥珀里的虫子</td></tr>
        <tr><td>结构中的智能</td><td>Transformer 架构设计</td><td>容器的形状</td></tr>
        <tr><td>静态的潜在智能</td><td>硬盘上的模型文件</td><td>深度睡眠的大脑</td></tr>
        <tr><td>动态的涌现智能</td><td>推理运算的瞬间</td><td>光穿过透镜成像</td></tr>
        <tr><td>交互中的智能</td><td>用户与模型的对话</td><td>好提问激发好回答</td></tr>
      </tbody>
    </table>
  </div>

  <div class="insight">
    <strong>结论：智能不在某一个地方。它在流动中——不是一个东西，而是一个过程。</strong>
  </div>
</div>

<div class="divider"></div>

<!-- ═══════ Part 4 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 04</div>
  <h2>智能的本质——减熵</h2>

  <p>大语言模型在做的事情，用物理语言可以精确描述：<strong>消耗能量，将信息从高熵状态转化为低熵状态。</strong>用户输入是高熵（巨大的不确定性），模型逐步收窄可能性空间，每生成一个 Token 不确定性就减少一点。</p>

  <p>但减熵本身不是智能的充分条件。冰箱也在做局部减熵，冰箱没有智能。</p>

  <div class="formula-block">
    <div class="formula-label">核心定义</div>
    <div style="font-family: var(--font-serif); font-size: 18px; line-height: 1.8; max-width: 520px; margin: 0 auto;">
      智能的本质是<strong>通用的、灵活的</strong>熵减能力——面对多种多样的无序输入，都能将其转化为有序输出。
    </div>
  </div>

  <p>冰箱的减熵是固定的、单一的、预设的。智能的减熵是灵活的、通用的、可迁移的。"通用"和"灵活"把冰箱排除在外，把人类大脑和大语言模型留在了框内。</p>

  <h3>减熵可测，但有致命缺陷</h3>
  <p>交叉熵损失和困惑度（Perplexity）确实在测量模型的减熵能力。但它们分不清真有序和伪有序——模型自信地说"地球是平的"，困惑度极低，但它是错的。</p>

  <div class="warning">
    <strong>智能是一个多维度评价的指标体系</strong>，当前这个体系还在被构建中。具体场景的「应用」是评价智能最可靠的方法。通用标准测试（Benchmark）是评价智能基础能力最高效的方法。
  </div>
</div>

<div class="divider"></div>

<!-- ═══════ Part 5 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 05</div>
  <h2>跨领域远迁移——比智容与净智效</h2>

  <h3>锚定问题</h3>
  <p>核心问题：如何为"通用灵活的熵减能力"建立可操作的度量？深层结构：<strong>「输入能量 → 经介质转化 → 输出状态变化」</strong>的效率问题，附加"输出必须是真有序而非伪有序"的约束。</p>

  <h3>搜索结构孪生体</h3>
  <div class="table-wrap">
    <table>
      <thead><tr><th>候选模型</th><th>来源学科</th><th>同构程度</th><th>优势</th><th>缺陷</th></tr></thead>
      <tbody>
        <tr><td>比热容 $c = Q/(m \cdot \Delta T)$</td><td>热力学</td><td>🟢 高</td><td>三变量结构完全吻合</td><td>不区分真伪</td></tr>
        <tr><td>信噪比 $\text{SNR} = P_s / P_n$</td><td>信号处理</td><td>🟢 高</td><td>精确捕捉真伪维度</td><td>缺少效率维度</td></tr>
        <tr><td>林德曼效率</td><td>生态学</td><td>🟡 中</td><td>捕捉效率</td><td>缺少复杂度与真伪</td></tr>
        <tr><td>杨氏模量</td><td>材料科学</td><td>🟡 中</td><td>结构对称</td><td>方向相反</td></tr>
      </tbody>
    </table>
  </div>

  <p>选择比热容 + 信噪比<strong>组合映射</strong>：来自不同学科，各自覆盖对方的盲区。</p>
</div>

<!-- Formula 1: 比智容 -->
<div class="section fade-in">
  <h3>概念一：比智容（Cognitive Heat Capacity）</h3>

  <div class="table-wrap">
    <table>
      <thead><tr><th>热力学变量</th><th>符号</th><th>智能领域变量</th><th>符号</th><th>操作性定义</th></tr></thead>
      <tbody>
        <tr><td>吸收热量</td><td>$Q$</td><td>消耗的资源</td><td>$E$</td><td>FLOPs 或焦耳</td></tr>
        <tr><td>物质质量</td><td>$m$</td><td>任务非先验复杂度</td><td>$W$</td><td>任务的陌生度 × 结构复杂度</td></tr>
        <tr><td>温度变化</td><td>$\Delta T$</td><td>信息熵下降量</td><td>$\Delta H$</td><td>从混沌到确定的比特数</td></tr>
        <tr><td>比热容</td><td>$c$</td><td>比智容</td><td>$c_{\text{intel}}$</td><td>智能做功的"惰性"</td></tr>
      </tbody>
    </table>
  </div>

  <div class="formula-block">
    <div class="formula-label">比智容公式</div>
    <div class="formula-main">$c_{\text{intel}} = \dfrac{E}{W \cdot \Delta H}$</div>
    <div class="formula-desc">比智容越小的智能体越强——只需极少资源（$E$ 小），就能在高度陌生的复杂任务（$W$ 大）上实现巨大的降熵（$\Delta H$ 大）。</div>
    <div class="formula-name">Cognitive Heat Capacity</div>
  </div>

  <div class="warning">
    <strong>致命缺口：</strong>比智容不区分真伪。模型自信地胡说八道也算"高熵减"。需要引入新的维度来修补。
  </div>
</div>

<!-- Formula 2: 净智效 -->
<div class="section fade-in">
  <h3>概念二：净智效（Net Cognitive Efficiency）</h3>

  <p>引入信噪比的映射，将"表观熵减"拆分为"有效熵减"和"无效熵减"：</p>

  <div class="table-wrap">
    <table>
      <thead><tr><th>信号处理变量</th><th>智能领域变量</th><th>操作性定义</th></tr></thead>
      <tbody>
        <tr><td>信号功率 $P_s$</td><td>有效熵减 $\Delta H_{\text{true}}$</td><td>与事实/逻辑一致的信息量</td></tr>
        <tr><td>噪声功率 $P_n$</td><td>无效熵减 $\Delta H_{\text{false}}$</td><td>幻觉、错误、误导性信息</td></tr>
        <tr><td>信噪比 SNR</td><td>保真度 $\mathcal{F}$</td><td>有效熵减 / 总熵减</td></tr>
      </tbody>
    </table>
  </div>

  <div class="formula-block">
    <div class="formula-label">净智效公式</div>
    <div class="formula-main">$\mathcal{I} = \dfrac{W \cdot \Delta H_{\text{true}}}{E}$</div>
    <div class="formula-desc">每消耗一单位资源，智能体在给定复杂度的任务上，能产生多少<strong>真实有效的</strong>信息有序化。</div>
    <div class="formula-name">Net Cognitive Efficiency</div>
  </div>

  <div class="formula-block">
    <div class="formula-label">两者关系</div>
    <div class="formula-main">$\mathcal{I} = \dfrac{\mathcal{F}}{c_{\text{intel}}}$</div>
    <div class="formula-desc">比智容越小（惰性越低）且保真度越高（幻觉越少），净智效越高。</div>
  </div>
</div>

<!-- Phenomena -->
<div class="section fade-in">
  <h3>净智效能解释什么</h3>

  <div class="phenomenon">
    <div class="phenomenon-q">为什么 GPT-4 比 GPT-3.5 贵得多，但用户愿意付费？</div>
    <div class="phenomenon-a">GPT-4 的 $E$ 远大于 GPT-3.5，但 $\mathcal{F}$（保真度）和可处理的 $W$（任务复杂度）提升幅度更大。用户实际购买的是 $\mathcal{I}$（净智效），不是 Token。当 $\mathcal{F} \cdot W$ 的提升倍数超过 $E$ 的提升倍数，升级就值得。</div>
  </div>

  <div class="phenomenon">
    <div class="phenomenon-q">为什么"幻觉"比"慢速"更致命？</div>
    <div class="phenomenon-a">幻觉攻击<strong>分子</strong>（$\Delta H_{\text{true}}$ 缩小），慢速只攻击<strong>分母</strong>（$E$ 增大）。分子崩塌是塌方式的——一次严重幻觉让用户对所有后续输出打折扣。影响量级完全不同。</div>
  </div>

  <div class="phenomenon">
    <div class="phenomenon-q">为什么 Chain-of-Thought（思维链）有效？</div>
    <div class="phenomenon-a">思维链提升 $\mathcal{F}$（每步可自我校验）并扩展可处理的 $W$（高复杂度任务拆解为低复杂度子步骤）。虽然 $E$ 增大，但 $\mathcal{F} \cdot W$ 的增幅远超 $E$ 的增幅，净智效反而更高。</div>
  </div>
</div>

<div class="divider"></div>

<!-- ═══════ Part 6 ═══════ -->
<div class="section fade-in">
  <div class="section-num">Part 06</div>
  <h2>深层暗合与断裂点</h2>

  <h3>深层暗合</h3>
  <p><strong>兰道尔原理：</strong>每擦除 1 比特信息至少需要 $k_B T \ln 2 \approx 2.87 \times 10^{-21}$ 焦耳。比智容存在不可逾越的物理下界——再高效的智能体，$\mathcal{I}$ 也不可能无穷大。</p>
  <p><strong>香农信道容量定理：</strong>对给定信道存在容量上限 $C$。暗示每个模型架构有固有的"智能信道容量"，不是无限可优化的。</p>

  <div class="insight">
    两个来自不同物理定律（热力学、信息论）的暗合都指向同一结论：<strong>智能效率有上界。</strong>这强烈暗示净智效框架触及了真实的深层结构，而非表面巧合。
  </div>

  <h3>断裂点</h3>

  <div class="warning">
    <strong>断裂点 1：$\Delta H_{\text{true}}$ 在开放性任务中无法客观测量。</strong>写诗、提假说、做战略决策——什么算"真有效"在这些场景下是主观的。可修补：将 $\mathcal{F}$ 扩展为连续谱，由下游任务表现标定，但牺牲纯客观度量的优雅。
  </div>
  <div class="warning">
    <strong>断裂点 2：$W$ 不是任务的固有属性。</strong>同一道题对 GPT-4 和小模型的 $W$ 不同。它是任务与智能体之间的关系属性，不存在"绝对的任务复杂度"。可修补但复杂：定义 $W(T, A)$ 为联合函数。
  </div>

  <h3>未来研究方向</h3>
  <div class="table-wrap">
    <table>
      <thead><tr><th>优先级</th><th>问题</th></tr></thead>
      <tbody>
        <tr><td>🔴 高</td><td>如何构建 $\mathcal{F}$（保真度）的自动化测量方法？</td></tr>
        <tr><td>🔴 高</td><td>如何构建 $W(T, A)$ 的评估量表？困惑度能否作为 $W$ 的代理变量？</td></tr>
        <tr><td>🟡 中</td><td>净智效 $\mathcal{I}$ 是否存在类似香农极限的理论上界？当前最好的模型距此多远？</td></tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══════ Summary ═══════ -->
<div class="summary-card fade-in">
  <h2>一页纸摘要</h2>
  <div class="summary-item">
    <span class="summary-icon">📌</span>
    <span class="summary-text"><strong>核心问题</strong>——如何度量智能？不仅测效率，还测产出的真伪</span>
  </div>
  <div class="summary-item">
    <span class="summary-icon">🔗</span>
    <span class="summary-text"><strong>结构映射</strong>——热力学比热容 + 信号处理信噪比，双模型组合映射</span>
  </div>
  <div class="summary-item">
    <span class="summary-icon">📐</span>
    <span class="summary-text"><strong>新公式</strong>——$\mathcal{I} = W \cdot \Delta H_{\text{true}} / E$，命名为净智效（Net Cognitive Efficiency）</span>
  </div>
  <div class="summary-item">
    <span class="summary-icon">💡</span>
    <span class="summary-text"><strong>最强解释力</strong>——统一解释了"为什么幻觉比慢速更致命"：幻觉攻击分子，慢速只攻击分母</span>
  </div>
  <div class="summary-item">
    <span class="summary-icon">⚠️</span>
    <span class="summary-text"><strong>最关键断裂点</strong>——$\Delta H_{\text{true}}$ 在开放性任务中无法客观测量</span>
  </div>
  <div class="summary-item">
    <span class="summary-icon">🔮</span>
    <span class="summary-text"><strong>最值得追问</strong>——净智效是否存在类似香农极限的理论上界？</span>
  </div>
</div>

<footer>
  <p>本文由与 Claude 的对话推导生成 · 概念仍在演进中</p>
</footer>

<script>
  // Render KaTeX
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ],
    throwOnError: false
  });

  // Scroll-triggered fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
</script>

</body>
</html>
`;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
