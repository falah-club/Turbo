//import { Inter } from 'next/font/google'
//import localFont from 'next/font/local'
// @ts-ignore
import clsx from 'clsx'
import { Providers } from './app/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx('h-full antialiased')}
    >
      <div className="flex min-h-full flex-col bg-green-200 dark:bg-gray-950">
        <Providers>{children}</Providers>
      </div>
    </div>
  )
}