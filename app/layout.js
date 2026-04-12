import './globals.css'

export const metadata = {
  title: 'Bias Moat — 人机协同，用偏见锚定人的价值',
  description: '人机协同时代的产品聚合：偏见（AI 岗位风险）、未来人才（AI 协同 16 型人格）、Token 价值计算器、净智度理论。',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
