import './globals.css'

export const metadata = {
  title: 'Bias Moat — AI 时代的价值量化',
  description: '用偏见构建护城河 — 净智度、Token 价值函数、交互式计算器',
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
