import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wisemonk - Sign In',
  description: 'Sign in to manage your team, payroll, and compliance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



