'use client';
import Link from 'next/link';

const cards = [
  {
    title: '净智度',
    subtitle: '比智容与净智效',
    desc: '从 AI 产业链到智能度量 — 用热力学类比构建智能的可计算框架',
    href: '/article/net-intelligence',
    type: 'article',
    color: '#b44a2d',
    icon: 'I',
  },
  {
    title: 'Token 价值函数 v2',
    subtitle: 'V(L) = A·δ·[C_net·(L−1) − k·ln(L)]',
    desc: '个人经济决策工具 — 回本点、死亡谷、出走点的完整理论',
    href: '/article/token-value-v2',
    type: 'article',
    color: '#d4a855',
    icon: 'V',
  },
  {
    title: 'Token 价值计算器',
    subtitle: 'V1 · 净智度框架',
    desc: '基于比智容与净智效的交互式计算器',
    href: '/calculator',
    type: 'calculator',
    color: '#50c88c',
    icon: 'C',
  },
  {
    title: 'Token 价值计算器 v2',
    subtitle: '三层架构 · 完整模型',
    desc: '战略层 × 执行层 — 含员工对标、出走点分析',
    href: '/calculator-v2',
    type: 'calculator',
    color: '#60b8e0',
    icon: 'C',
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        padding: '80px 24px 48px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 16,
        }}>biasmoat.com</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.3,
          marginBottom: 12,
        }}>
          Bias Moat
        </h1>
        <p style={{
          fontSize: 15,
          color: 'var(--text-secondary)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          AI 时代的价值量化 — 用偏见构建护城河
        </p>
      </header>

      {/* Card Grid */}
      <main style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '0 20px 80px',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {cards.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}>
                {/* Icon + Type Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 22,
                    color: card.color,
                  }}>
                    {card.icon}
                  </div>
                  <span style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: card.color,
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}25`,
                    padding: '3px 10px',
                    borderRadius: 12,
                  }}>
                    {card.type === 'article' ? '文章' : '计算器'}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 20,
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  marginBottom: 4,
                }}>
                  {card.title}
                </h2>

                {/* Subtitle */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginBottom: 12,
                }}>
                  {card.subtitle}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  flex: 1,
                }}>
                  {card.desc}
                </p>

                {/* Arrow */}
                <div style={{
                  marginTop: 16,
                  fontSize: 13,
                  color: card.color,
                  opacity: 0.6,
                }}>
                  {'->'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        fontSize: 11,
        color: 'var(--text-muted)',
        marginTop: 'auto',
      }}>
        Bias Moat
      </footer>
    </div>
  );
}
