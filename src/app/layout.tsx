'use client'

import '@/app/globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/app/components/navbar'
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
