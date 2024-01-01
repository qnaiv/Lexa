'use client'

import '@/app/globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import { RecoilRoot } from 'recoil'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html lang="ja">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        </head>
        <body className={inter.className}>
          <NavBar />
          <div>
            {children}
          </div>

        </body>
      </html>
    </RecoilRoot>
  )
}
