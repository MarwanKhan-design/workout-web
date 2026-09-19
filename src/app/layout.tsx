import './globals.css'
import { Inter, Inter_Tight } from 'next/font/google'
import AuthCheck from '@/lib/AuthCheck'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata = {
  title: 'BarhtaFit — Plan, log, and track your training.',
  description: 'BarhtaFit helps you create workouts, log sessions, and track your progress over time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${interTight.variable} font-sans bg-ink-950 text-white min-h-screen antialiased selection:bg-volt-300 selection:text-ink-950`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
