'use client'

import { useState, useMemo } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot, ReferenceArea, Area, AreaChart } from "recharts"

const AGI = [
  { level: 1, mu: 1, label: "L1 对话", smax: 2, desc: "内容维：生成" },
  { level: 2, mu: 3, label: "L2 推理", smax: 4, desc: "逻辑维：推理纠错" },
  { level: 3, mu: 20, label: "L3 代理", smax: 7, desc: "行动维：工具调用" },
  { level: 4, mu: 80, label: "L4 创新", smax: 9, desc: "发现维：创新方案" },
  { level: 5, mu: 500, label: "L5 组织", smax: 10, desc: "组织维：AI 管理 AI" },
]

function bisect(f, lo, hi) {
  for (let i = 0; i < 80; i++) { const m=(lo+hi)/2; if(f(m)*f(lo)<0)hi=m;else lo=m; } return (lo+hi)/2;
}
function findZeros(A,Cn,k,maxL) {
  const f=L=>A*(Cn*L-k*Math.log(L)),z=[],s=Math.max(0.005,maxL/4000);
  let p=f(0.001);for(let L=0.001+s;L<=maxL;L+=s){const c=f(L);if(p*c<0)z.push(bisect(f,L-s,L));p=c;}return z;
}

/* ── Sub-components ────────────────────────── */

function Param({ label, value, onChange, min, max, step, desc, accent, tiers, warn, sliderClass }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: accent || "var(--gold)", fontSize: 17 }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", color: warn ? "var(--red)" : "var(--text-primary)", fontSize: 15, fontWeight: 500 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className={sliderClass || ""} />
      {tiers && (
        <div style={{ display: "flex", marginTop: 4 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ flex: t.w || 1, fontSize: 10, color: "var(--text-muted)", textAlign: "center",
              borderLeft: i > 0 ? "1px solid rgba(180,160,120,0.08)" : "none", padding: "0 2px" }}>{t.t}</div>
          ))}
        </div>
      )}
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3 }}>{desc}</div>
    </div>
  )
}

function Metric({ label, value, sub, color, warn }) {
  return (
    <div className={`metric ${warn ? "warn" : ""}`}>
      <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontFamily: "var(--font-display)", fontStyle: "italic", color: color || "var(--gold)" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

/* ── Tier data ─────────────────────────────── */
const BT = [{ t: "0 随大流", w: 1 },{ t: "1 普通", w: 1 },{ t: "3 有品味", w: 2 },{ t: "7 强风格", w: 3 },{ t: "10 颠覆者", w: 2 }]
const DT = [{ t: "0.5 说不清", w: 1 },{ t: "1 基本", w: 1 },{ t: "3 熟练", w: 2 },{ t: "7 专家", w: 3 },{ t: "10 系统级", w: 2 }]
const ST = [{ t: "0.3 无连接", w: 1 },{ t: "1 反射弧", w: 1 },{ t: "3 记忆层", w: 2 },{ t: "5 规划层", w: 2 },{ t: "7 元认知", w: 2 },{ t: "10 全皮层", w: 1 }]

/* ── Main ──────────────────────────────────── */

export default function Calculator() {
  const [B, setB] = useState(5)
  const [D, setD] = useState(0.5)
  const [S, setS] = useState(1)
  const [ai, setAi] = useState(0)
  const [Cv, setCv] = useState(0.3)
  const [Ca, setCa] = useState(0.2)
  const [A, setA] = useState(1)
  const [manualL, setManualL] = useState(100)
  const [auto, setAuto] = useState(true)

  const lv = AGI[ai]
  const mu = lv.mu
  const Sm = lv.smax
  const Se = Math.min(S, Sm)
  const over = S > Sm

  const Phi = B * D * Se
  const Cf = Cv + Ca
  const Cn = Phi * mu - Cf
  const k = D > 0 ? B / (D * mu) : Infinity
  const Ls = Cn > 0 ? k / Cn : Infinity
  const VLs = Cn > 0 && isFinite(Ls) && Ls > 0 ? A * (Cn * Ls - k * Math.log(Ls)) : -Infinity
  const phiD = mu > 0 ? Cf / mu : Infinity
  const phiV = mu > 0 && isFinite(k) ? k / Math.E / mu + Cf / mu : Infinity
  const st = Cn <= 0 ? "dead" : (isFinite(Ls) && Ls > Math.E ? "valley" : "comfort")

  // Auto-fit L_max
  const searchMax = useMemo(() => {
    if (Cn <= 0 || !isFinite(Ls)) return 100
    const e = Ls > 1 ? Ls * (Math.log(Ls) + Math.max(0, Math.log(Math.log(Ls)))) * 3 : Ls * 20
    return Math.max(e, Ls * 10, 1)
  }, [Cn, Ls])

  const zpAuto = useMemo(() => Cn > 0 ? findZeros(A, Cn, k, searchMax) : [], [A, Cn, k, searchMax])
  const L2A = zpAuto.length > 1 ? zpAuto[1] : (zpAuto.length === 1 && zpAuto[0] > (isFinite(Ls) ? Ls : 0) ? zpAuto[0] : null)

  const autoMax = useMemo(() => {
    if (L2A && isFinite(L2A) && L2A > 0) return parseFloat((L2A * 3.5).toFixed(3))
    if (isFinite(Ls) && Ls > 0) return parseFloat((Ls * 10).toFixed(3))
    return 100
  }, [L2A, Ls])

  const maxL = auto ? autoMax : manualL
  const zp = useMemo(() => Cn > 0 ? findZeros(A, Cn, k, maxL) : [], [A, Cn, k, maxL])
  const L2 = zp.length > 1 ? zp[1] : (zp.length === 1 && zp[0] > (isFinite(Ls) ? Ls : 0) ? zp[0] : null)

  const data = useMemo(() => {
    const p = [], s = Math.max(0.005, maxL / 350)
    for (let L = 0.01; L <= maxL; L += s) p.push({ L: +L.toFixed(4), V: +(A * (Cn * L - k * Math.log(L))).toFixed(4) })
    const sp = []
    if (isFinite(Ls) && Ls > 0 && Ls <= maxL) sp.push(+Ls.toFixed(4))
    zp.forEach(z => { if (z > 0 && z <= maxL) sp.push(+z.toFixed(4)) })
    for (const x of sp) { if (x > 0 && !p.find(q => Math.abs(q.L - x) < s * 0.3)) p.push({ L: x, V: +(A * (Cn * x - k * Math.log(x))).toFixed(4) }) }
    p.sort((a, b) => a.L - b.L)
    return p
  }, [A, Cn, k, maxL, Ls, zp])

  const fL = l => { if (!isFinite(l)) return "∞"; if (l >= 1000) return `${(l/1000).toFixed(1)}M`; if (l >= 10) return `${l.toFixed(1)}`; if (l >= 0.01) return l.toFixed(3); return `${(l*1000).toFixed(0)}tok` }
  const sc = st === "dead" ? "var(--red)" : st === "valley" ? "var(--yellow)" : "var(--green)"

  const ChartTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const { L, V } = payload[0].payload
    return (
      <div style={{ background: "rgba(10,10,15,0.95)", border: "1px solid var(--border-accent)", borderRadius: 8, padding: "10px 14px", fontFamily: "var(--font-body)" }}>
        <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 3 }}>L = {L.toFixed(2)} kT（{(L * 1000).toLocaleString()} tokens）</div>
        <div style={{ fontSize: 16, fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--gold)" }}>V = {V.toFixed(3)}</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: "env(safe-area-inset-top, 20px) 16px 40px" }}>

      {/* ── Header ── */}
      <header className="fade-up" style={{ padding: "32px 0 24px", animationDelay: "0s" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
          Token Value Function
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 400, fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 8 }}>
          V(L) ≈ A · [C<sub style={{ fontSize: "0.6em" }}>net</sub> · L − k · ln(L)]
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 480, lineHeight: 1.6 }}>
          L = kT（千token） · μ(T) 指数刻度 · S = 突触深度 · k = B/(D·μ)
        </p>
        <div style={{ marginTop: 12, display: "inline-block", padding: "5px 16px", borderRadius: 24, fontSize: 13, fontWeight: 500, color: sc,
          background: st === "dead" ? "var(--red-dim)" : st === "valley" ? "var(--yellow-dim)" : "var(--green-dim)",
          border: `1px solid ${sc}40` }}>
          {st === "dead" ? "⊘ 低于生死线" : st === "valley" ? "△ 死亡谷存在" : "◉ 起步即盈利"}
        </div>
      </header>

      {/* ── AGI Selector ── */}
      <section className="card fade-up" style={{ marginBottom: 16, animationDelay: "0.05s" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 12 }}>
          时代选择 · μ(T) 智能密度
        </div>
        <div className="grid-agi">
          {AGI.map((lv, i) => (
            <button key={i} onClick={() => setAi(i)} className={`agi-btn ${i === ai ? "active" : ""}`}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{lv.label}</div>
              <div style={{ fontSize: 22, fontFamily: "var(--font-display)", fontStyle: "italic", color: i === ai ? "var(--gold)" : "var(--text-muted)" }}>μ={lv.mu}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{lv.desc}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>S_max={lv.smax}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Parameters ── */}
      <section className="grid-3 fade-up" style={{ marginBottom: 16, animationDelay: "0.1s" }}>
        {/* Intent side */}
        <div className="card">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>意图侧 · B × D</div>
          <Param label="B 偏见程度" value={B} onChange={setB} min={0} max={10} step={0.1}
            desc="独特视角 · 越高越不可替代" accent="#e8a040" sliderClass="slider-orange" tiers={BT} />
          <Param label="D 定义力" value={D} onChange={setD} min={0.1} max={10} step={0.1}
            desc="指令精确度 · 唯一双倍杠杆" accent="var(--blue)" sliderClass="slider-blue" tiers={DT} />
        </div>

        {/* Execution side */}
        <div className="card">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>执行侧 · S × μ(T)</div>
          <Param label="S 突触深度" value={S} onChange={setS} min={0.1} max={10} step={0.1}
            desc={`协同层数 · 当前 S_max = ${Sm}`} accent="var(--purple)" sliderClass="slider-purple" tiers={ST} warn={over} />
          {over && (
            <div style={{ fontSize: 12, color: "var(--red)", padding: "8px 12px", borderRadius: 8, background: "var(--red-dim)", marginTop: -8, marginBottom: 12, lineHeight: 1.5 }}>
              ⚠ S={S} 超出当前 S_max={Sm}，实际 S_eff={Se}
            </div>
          )}
          <div style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>S×μ(T) = </span>
            <span style={{ fontSize: 20, fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--gold)" }}>{(Se * mu).toFixed(0)}</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>（L1 基准=2）</span>
          </div>
        </div>

        {/* Environment & Scale */}
        <div className="card">
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>环境 · 规模</div>
          <Param label="C_verify" value={Cv} onChange={setCv} min={0} max={0.8} step={0.01}
            desc="验证税" accent="var(--coral)" sliderClass="slider-coral" />
          <Param label="C_api" value={Ca} onChange={setCa} min={0} max={0.5} step={0.01}
            desc="算力税" accent="var(--coral)" sliderClass="slider-coral" />
          <Param label="A" value={A} onChange={setA} min={0.01} max={5} step={0.01}
            desc="现实放大器 · 股权份额" />

          {/* L_max with auto toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--gold)", fontSize: 17 }}>L_max</span>
            <button onClick={() => setAuto(!auto)} style={{
              background: auto ? "var(--green-dim)" : "var(--bg-card)",
              border: `1px solid ${auto ? "rgba(80,200,140,0.3)" : "var(--border)"}`,
              color: auto ? "var(--green)" : "var(--text-secondary)",
              borderRadius: 16, padding: "3px 12px", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-body)",
            }}>{auto ? "自动聚焦" : "手动"}</button>
          </div>
          {auto ? (
            <div style={{ fontSize: 14, fontFamily: "var(--font-mono)", color: "var(--text-primary)", padding: "4px 0" }}>
              {maxL.toFixed(1)} kT
              <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>≈3.5× L₂</span>
            </div>
          ) : (
            <input type="range" min={1} max={10000} step={1} value={manualL}
              onChange={e => setManualL(parseFloat(e.target.value))} />
          )}
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="grid-metrics fade-up" style={{ marginBottom: 16, animationDelay: "0.15s" }}>
        <Metric label="Φ = BDS" value={Phi.toFixed(2)} sub={`生死线 >${phiD.toFixed(3)}`} color={Phi > phiD ? "var(--green)" : "var(--red)"} warn={Phi <= phiD} />
        <Metric label="C_net" value={Cn.toFixed(3)} sub="Φ·μ − C_fix" color={Cn > 0 ? "var(--green)" : "var(--red)"} warn={Cn <= 0} />
        <Metric label="k 对齐阻力" value={isFinite(k) ? k.toFixed(3) : "∞"} sub="B/(D·μ)" />
        <Metric label="L* 谷底" value={fL(Ls)} sub={isFinite(Ls) ? `≈${Math.max(1, Math.round(Ls))} 次` : ""} color={!isFinite(Ls) || Ls > Math.E ? "var(--yellow)" : "var(--green)"} />
        <Metric label="V(L*)" value={isFinite(VLs) ? VLs.toFixed(3) : "−∞"} sub="正=无谷" color={VLs >= 0 ? "var(--green)" : "var(--red)"} warn={VLs < 0} />
        <Metric label="L₂ 回本" value={L2 ? fL(L2) : (st === "comfort" ? "—" : "∞")} sub={L2 ? `≈${Math.round(L2)} 次` : (st === "comfort" ? "无需回本" : "")} color="var(--green)" />
      </section>

      {/* ── Thresholds + Decision ── */}
      <section className="grid-2 fade-up" style={{ marginBottom: 16, animationDelay: "0.2s" }}>
        <div className="card">
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: "var(--text-secondary)", marginBottom: 10 }}>三条线 vs Φ = {Phi.toFixed(2)}</div>
          {[
            { ok: Phi > phiD, t: `生死线 Φ>${phiD.toFixed(3)}`, y: "✓", n: "✗", yc: "var(--green)", nc: "var(--red)" },
            { ok: Phi > phiV, t: `死亡谷线 Φ>${isFinite(phiV) ? phiV.toFixed(3) : "∞"}`, y: "✓ 消除", n: "✗ 存在", yc: "var(--green)", nc: "var(--yellow)" },
            { ok: isFinite(Ls) && Ls < 1, t: "舒适线 L*<1kT", y: "✓ 即刻盈利", n: `L*=${fL(Ls)}`, yc: "var(--green)", nc: "var(--text-muted)" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: r.ok ? r.yc : r.nc }} />
              <span style={{ fontSize: 13, flex: 1 }}>{r.t}</span>
              <span style={{ fontSize: 12, color: r.ok ? r.yc : r.nc, whiteSpace: "nowrap" }}>{r.ok ? r.y : r.n}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: "var(--text-secondary)", marginBottom: 10 }}>决策建议</div>
          {st === "dead" ? (
            <p style={{ fontSize: 13, color: "var(--red)", lineHeight: 1.7 }}>
              C_net 为负（{Cn.toFixed(3)}），Φ 需从 {Phi.toFixed(2)} 提升至 {phiD.toFixed(3)} 以上。优先提升 D（当前 {D}）。
            </p>
          ) : st === "valley" ? (
            <p style={{ fontSize: 13, color: "var(--yellow)", lineHeight: 1.7 }}>
              谷深 |V(L*)| = {Math.abs(VLs).toFixed(3)}，回本需 {L2 ? `${fL(L2)} kT` : "∞"}。提升 D 或等 μ(T) 跃迁可压缩。
            </p>
          ) : (
            <p style={{ fontSize: 13, color: "var(--green)", lineHeight: 1.7 }}>
              无死亡谷，V(L*)={VLs.toFixed(3)} ≥ 0。可加大 A 放大收益，或提升 B 拉高溢价。
            </p>
          )}
        </div>
      </section>

      {/* ── Chart ── */}
      <section className="card fade-up" style={{ padding: "20px 8px 8px 0", marginBottom: 16, animationDelay: "0.25s" }}>
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={data} margin={{ top: 16, right: 12, bottom: 24, left: 12 }}>
            <defs>
              <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a855" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#d4a855" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(180,160,120,0.06)" />
            {Cn > 0 && isFinite(Ls) && Ls > 0.01 && Ls <= maxL && VLs < 0 && (
              <ReferenceArea x1={0.01} x2={+Ls.toFixed(4)} fill="rgba(220,80,80,0.04)" fillOpacity={1} />
            )}
            {Cn > 0 && isFinite(Ls) && L2 && L2 <= maxL && VLs < 0 && (
              <ReferenceArea x1={+Ls.toFixed(4)} x2={+L2.toFixed(4)} fill="rgba(220,180,60,0.04)" fillOpacity={1} />
            )}
            {Cn > 0 && L2 && L2 <= maxL && (
              <ReferenceArea x1={+L2.toFixed(4)} x2={maxL} fill="rgba(80,200,140,0.04)" fillOpacity={1} />
            )}
            <XAxis dataKey="L" stroke="rgba(180,160,120,0.2)" tick={{ fill: "rgba(180,160,120,0.4)", fontSize: 10, fontFamily: "var(--font-mono)" }}
              label={{ value: "L（kT）", position: "bottom", offset: 4, fill: "rgba(180,160,120,0.4)", fontSize: 11 }}
              tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}M` : v >= 100 ? v.toFixed(0) : v >= 1 ? v.toFixed(1) : v.toFixed(2)} />
            <YAxis stroke="rgba(180,160,120,0.2)" tick={{ fill: "rgba(180,160,120,0.4)", fontSize: 10, fontFamily: "var(--font-mono)" }}
              label={{ value: "V", angle: -90, position: "insideLeft", offset: 8, fill: "rgba(180,160,120,0.4)", fontSize: 11 }} />
            <Tooltip content={<ChartTip />} />
            <ReferenceLine y={0} stroke="rgba(120,200,160,0.3)" strokeDasharray="6 3" />
            {Cn > 0 && isFinite(Ls) && Ls > 0 && Ls <= maxL && (() => {
              const x = +Ls.toFixed(4), y = +(A * (Cn * x - k * Math.log(x))).toFixed(4)
              return [
                <ReferenceLine key="a" x={x} stroke="rgba(212,168,85,0.25)" strokeDasharray="4 4" />,
                <ReferenceDot key="b" x={x} y={y} r={5} fill="var(--gold)" stroke="var(--bg-deep)" strokeWidth={2}
                  label={{ value: `L*=${fL(Ls)}`, position: "top", offset: 14, fill: "#d4a855", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 500 }} />
              ]
            })()}
            {zp.map((z, i) => {
              const x = +z.toFixed(4); if (x <= 0 || x > maxL) return null
              const y = +(A * (Cn * x - k * Math.log(x))).toFixed(4)
              return [
                <ReferenceLine key={`c${i}`} x={x} stroke="rgba(120,200,160,0.15)" strokeDasharray="4 4" />,
                <ReferenceDot key={`d${i}`} x={x} y={y} r={5} fill="var(--green)" stroke="var(--bg-deep)" strokeWidth={2}
                  label={{ value: `L₂=${fL(z)}`, position: i === 0 && z < (isFinite(Ls) ? Ls : 999) ? "bottom" : "top", offset: 14, fill: "#50c88c", fontSize: 10, fontFamily: "var(--font-mono)", fontWeight: 500 }} />
              ]
            })}
            <Area type="monotone" dataKey="V" stroke="#d4a855" strokeWidth={2} fill="url(#gd)" dot={false}
              activeDot={{ r: 4, fill: "#d4a855", stroke: "#08080c", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* ── Phase Bar ── */}
      {Cn > 0 && (
        <section className="phase-bar fade-up" style={{ marginBottom: 16, animationDelay: "0.3s" }}>
          {isFinite(Ls) && Ls > 0.01 && Ls <= maxL && VLs < 0 && (
            <div className="phase-segment" style={{ flex: Math.max(0.1, Math.min(Ls / maxL, 0.35)), background: "var(--red-dim)", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--red)" }}>烧钱期</div>
              <div style={{ fontSize: 10, color: "rgba(220,130,130,0.5)" }}>L&lt;{fL(Ls)}</div>
            </div>
          )}
          {L2 && L2 <= maxL && VLs < 0 && (
            <div className="phase-segment" style={{ flex: Math.max(0.1, Math.min((L2 - (isFinite(Ls) ? Ls : 0)) / maxL, 0.35)), background: "var(--yellow-dim)", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--yellow)" }}>回填期</div>
              <div style={{ fontSize: 10, color: "rgba(220,180,100,0.5)" }}>{fL(Ls)}–{fL(L2)}</div>
            </div>
          )}
          <div className="phase-segment" style={{ flex: 1, background: "var(--green-dim)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--green)" }}>盈利期</div>
            <div style={{ fontSize: 10, color: "rgba(120,200,160,0.5)" }}>L&gt;{L2 && VLs < 0 ? fL(L2) : (isFinite(Ls) ? fL(Ls) : "—")}</div>
          </div>
        </section>
      )}

      {/* ── Formula Footer ── */}
      <footer className="card fade-up" style={{ padding: 16, animationDelay: "0.35s" }}>
        <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", lineHeight: 2.2 }}>
          <div>C_net = {B}×{D}×{Se}×{mu} − {Cf.toFixed(2)} = <span style={{ color: Cn > 0 ? "var(--green)" : "var(--red)" }}>{Cn.toFixed(3)}</span></div>
          <div>k = {B}/({D}×{mu}) = <span style={{ color: "var(--gold)" }}>{isFinite(k) ? k.toFixed(4) : "∞"}</span></div>
          <div>L* = <span style={{ color: "var(--gold)" }}>{fL(Ls)}</span> · V(L*) = <span style={{ color: VLs >= 0 ? "var(--green)" : "var(--red)" }}>{isFinite(VLs) ? VLs.toFixed(3) : "−∞"}</span></div>
          <div>Φ={Phi.toFixed(2)} · 生死线&gt;{phiD.toFixed(3)} · 死亡谷线&gt;{isFinite(phiV) ? phiV.toFixed(3) : "∞"}</div>
        </div>
      </footer>

      <div style={{ textAlign: "center", padding: "32px 0 16px", fontSize: 11, color: "var(--text-muted)" }}>
        Token Value Function · Synaptic Depth Model
      </div>
    </div>
  )
}
