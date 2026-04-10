'use client';
import Link from 'next/link';
import productsData from './_data/products.json';

const products = [...productsData.products].sort((a, b) => a.order - b.order);

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        padding: '80px 24px 40px',
        textAlign: 'center',
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
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
          fontSize: 'clamp(32px, 5.5vw, 52px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 14,
        }}>
          Bias Moat
        </h1>

        <p style={{
          fontSize: 'clamp(14px, 1.6vw, 16px)',
          color: 'var(--text-secondary)',
          maxWidth: 520,
          margin: '0 auto 24px',
          lineHeight: 1.7,
        }}>
          人机协同，用偏见锚定人的价值
        </p>

        <p style={{
          fontSize: 13,
          color: 'var(--text-muted)',
          maxWidth: 560,
          margin: '0 auto',
          lineHeight: 1.85,
        }}>
          效率不再稀缺，智能不再稀缺。稀缺的是独立的审美、有立场的异见、不被算法平均掉的偏见——这是人类仅剩的护城河。Bias Moat 提供工具、框架与理论，帮你识别、度量并放大自己的那一道偏见。
        </p>
      </header>

      <main style={{
        maxWidth: 1040,
        margin: '0 auto',
        padding: '24px 20px 80px',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {products.map((p) => {
            const content = <ProductCard product={p} />;
            if (p.external) {
              return (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title}（外部链接，将在新窗口打开）`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {content}
                </a>
              );
            }
            return (
              <Link
                key={p.id}
                href={p.href}
                aria-label={p.title}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        fontSize: 11,
        color: 'var(--text-muted)',
        marginTop: 'auto',
        fontFamily: 'var(--font-mono)',
        letterSpacing: 1,
      }}>
        BIAS MOAT · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function ProductCard({ product: p }) {
  return (
    <div
      className="card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${p.color}18`,
          border: `1px solid ${p.color}38`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 22,
          color: p.color,
        }}>
          {p.icon}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {p.external && (
            <span
              aria-hidden="true"
              title="外部链接"
              style={{
                fontSize: 11,
                color: p.color,
                opacity: 0.7,
                lineHeight: 1,
              }}
            >
              ↗
            </span>
          )}
          <span style={{
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: p.color,
            background: `${p.color}14`,
            border: `1px solid ${p.color}2a`,
            padding: '3px 10px',
            borderRadius: 12,
          }}>
            {p.typeLabel}
          </span>
        </div>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 20,
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: 4,
      }}>
        {p.title}
      </h2>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)',
        marginBottom: 12,
      }}>
        {p.subtitle}
      </div>

      <p style={{
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
        flex: 1,
      }}>
        {p.desc}
      </p>

      <div style={{
        marginTop: 16,
        fontSize: 13,
        color: p.color,
        opacity: 0.6,
      }}>
        {'->'}
      </div>
    </div>
  );
}
