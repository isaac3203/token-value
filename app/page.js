'use client';
import Link from 'next/link';
import productsData from './_data/products.json';

const products = [...productsData.products].sort((a, b) => a.order - b.order);

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* ============================= HEADER ============================= */}
      <header style={{
        padding: '72px 24px 32px',
        textAlign: 'center',
        maxWidth: 780,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Top navy pill — references futuretalentquiz header */}
        <div style={{
          display: 'inline-block',
          padding: '8px 28px',
          background: 'var(--navy)',
          color: 'var(--cream)',
          border: '2px solid var(--navy)',
          outline: '1px solid var(--navy)',
          outlineOffset: '3px',
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: 5,
          textTransform: 'uppercase',
          marginBottom: 28,
        }}>
          · BIAS · MOAT ·
        </div>

        {/* Ornament divider */}
        <div className="ornament" style={{ marginBottom: 18 }}>
          EST · 2026
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 5.8vw, 58px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: 14,
          letterSpacing: '0.04em',
        }}>
          偏&nbsp;见&nbsp;护&nbsp;城&nbsp;河
        </h1>

        {/* English subtitle — uses bright-red for AA contrast on cream */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: 'var(--bright-red)',
          marginBottom: 22,
        }}>
          A Field Guide · No. 1
        </div>

        {/* Primary subtitle */}
        <p style={{
          fontSize: 'clamp(15px, 1.7vw, 17px)',
          color: 'var(--text-secondary)',
          maxWidth: 540,
          margin: '0 auto 22px',
          lineHeight: 1.75,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
        }}>
          人机协同，用偏见锚定人的价值。
        </p>

        {/* Description paragraph */}
        <p style={{
          fontSize: 13.5,
          color: 'var(--text-secondary)',
          maxWidth: 580,
          margin: '0 auto',
          lineHeight: 1.9,
        }}>
          效率不再稀缺，智能不再稀缺。稀缺的是独立的审美、有立场的异见、不被算法平均掉的偏见——这是人类仅剩的护城河。Bias&nbsp;Moat 提供工具、框架与理论，帮你识别、度量并放大自己的那一道偏见。
        </p>
      </header>

      {/* ============================= CARD GRID ============================= */}
      <main style={{
        maxWidth: 1120,
        margin: '0 auto',
        padding: '32px 28px 72px',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 32,
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

      {/* ============================= FOOTER ============================= */}
      <footer style={{
        textAlign: 'center',
        padding: '28px 24px 40px',
        marginTop: 'auto',
        borderTop: '1px solid var(--border)',
        background: 'rgba(232, 160, 154, 0.08)',
      }}>
        <div className="ornament" style={{ marginBottom: 10 }}>
          FIN
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: 3,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}>
          BIAS MOAT &middot; {new Date().getFullYear()} &middot; biasmoat.com
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
   ProductCard — Wes Anderson card with filled-pastel badge (Mendl's label)
   ============================================================================ */
function ProductCard({ product: p }) {
  return (
    <div
      className="card"
      data-accent=""
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        ['--accent']: p.color,
      }}
    >
      {/* Preview region */}
      <div className="card-preview">
        <div className="card-preview-inner">
          {p.preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.preview} alt={p.previewAlt || p.title} loading="lazy" />
          ) : p.previewEmoji ? (
            <div className="card-preview-emoji" aria-label={p.previewAlt || p.title} role="img">
              {p.previewEmoji}
            </div>
          ) : null}
          <span className="card-preview-corner" aria-hidden="true" />
        </div>
      </div>

      {/* Type badge row — filled pastel pill with dark ink (Mendl's label) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
      }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 11px',
          border: `1px solid ${p.color}`,
          background: p.color,
          color: 'var(--text-primary)',
          fontWeight: 600,
          borderRadius: 2,
        }}>
          No. {String(p.order).padStart(2, '0')} · {p.typeLabel}
        </span>
        {p.external && (
          <span aria-hidden="true" title="外部链接" style={{ opacity: 0.85 }}>↗</span>
        )}
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 20,
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 6,
        lineHeight: 1.3,
        letterSpacing: '0.02em',
      }}>
        {p.title}
      </h2>

      {/* Subtitle */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        color: 'var(--text-muted)',
        marginBottom: 12,
        letterSpacing: 0.3,
      }}>
        {p.subtitle}
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13,
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        flex: 1,
      }}>
        {p.desc}
      </p>

      {/* Arrow — accent border-top, ink-legible label */}
      <div style={{
        marginTop: 18,
        paddingTop: 12,
        borderTop: `1px solid ${p.color}`,
        fontFamily: 'var(--font-display)',
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>阅 · 读</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
}
