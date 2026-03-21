'use client';

export default function CalculatorV2Page() {
  return (
    <div style={{ width: '100%', height: '100dvh', background: '#08080c' }}>
      <iframe
        src="/calculator-v2.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Token Value Function v2 Calculator"
      />
    </div>
  );
}
