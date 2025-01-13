import React from 'react'

import { ThemeProvider } from '@/components/theme_provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      {children}
    </ThemeProvider>
  )
}
