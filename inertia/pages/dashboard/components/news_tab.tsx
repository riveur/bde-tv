import * as React from 'react'

import type { New } from '@/types'
import { DataTable } from './news_table'

interface NewsTabProps {
  news: New[]
}

export function NewsTab({ news }: NewsTabProps) {
  return (
    <NewsTabContextProvider>
      <DataTable data={news} />
    </NewsTabContextProvider>
  )
}

type NewsTabContextValue = {
  formRef: React.RefObject<HTMLDivElement | null>
  openForm: boolean
  setOpenForm: (value: boolean) => void
  currentNew: New | null
  setCurrentNew: (value: New | null) => void
}

const NewsTabContext = React.createContext<NewsTabContextValue>({} as NewsTabContextValue)

function NewsTabContextProvider({ children }: { children: React.ReactNode }) {
  const formRef = React.useRef<HTMLDivElement | null>(null)
  const [openForm, setOpenForm] = React.useState(false)
  const [currentNew, setCurrentNew] = React.useState<New | null>(null)

  return (
    <NewsTabContext.Provider value={{ formRef, openForm, setOpenForm, currentNew, setCurrentNew }}>
      {children}
    </NewsTabContext.Provider>
  )
}

export function useNewsTabContext() {
  const context = React.useContext(NewsTabContext)

  if (!context) {
    throw new Error('useNewsTabContext must be used within a NewsTabContextProvider')
  }

  return context
}
