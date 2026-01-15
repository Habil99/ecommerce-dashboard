import type { Metadata } from 'next'
import { ThemeRegistry } from './ThemeRegistry'
import { StoreProvider } from '@/store/StoreProvider'

export const metadata: Metadata = {
  title: 'E-commerce Admin Dashboard',
  description: 'Admin dashboard for managing products, orders, and customers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <StoreProvider>{children}</StoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
