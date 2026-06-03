import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthCheck from '@/lib/AuthCheck'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Express-style App',
  description: 'A Next.js app with API routes acting as Express backend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}> <Navbar /> 
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthCheck />
      {children}
      <Footer />
      </main>
      </body>
    </html>
  )
}
