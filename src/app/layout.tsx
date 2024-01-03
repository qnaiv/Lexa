import '@/app/globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import { Metadata, Viewport } from 'next'
import { Provider } from './provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tangory',
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* <body> */}
      <body className={inter.className}>
        <NavBar />
        <Provider>
          {children}
        </Provider>

      </body>
    </html>
  )
}
