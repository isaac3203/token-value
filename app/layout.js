import './globals.css'

export const metadata = {
  title: 'Token 价值函数模型',
  description: 'V(L) ≈ A · [Cnet · L − k · ln(L)] — AI 时代的价值量化工具',
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
