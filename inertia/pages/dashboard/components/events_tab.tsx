import * as React from 'react'

import type { Event } from '@/types'
import { DataTable } from './events_table'

interface EventsTabProps {
  events: Event[]
}

export function EventsTab({ events }: EventsTabProps) {
  return (
    <EventsTabContextProvider>
      <DataTable data={events} />
    </EventsTabContextProvider>
  )
}

type EventsTabContextValue = {
  formRef: React.RefObject<HTMLDivElement | null>
  openForm: boolean
  setOpenForm: (value: boolean) => void
  currentEvent: Event | null
  setCurrentEvent: (value: Event | null) => void
}

const EventsTabContext = React.createContext<EventsTabContextValue>({} as EventsTabContextValue)

function EventsTabContextProvider({ children }: { children: React.ReactNode }) {
  const formRef = React.useRef<HTMLDivElement | null>(null)
  const [openForm, setOpenForm] = React.useState(false)
  const [currentEvent, setCurrentEvent] = React.useState<Event | null>(null)

  return (
    <EventsTabContext.Provider
      value={{
        formRef,
        openForm,
        setOpenForm,
        currentEvent,
        setCurrentEvent,
      }}
    >
      {children}
    </EventsTabContext.Provider>
  )
}

export function useEventsTabContext() {
  const context = React.useContext(EventsTabContext)

  if (!context) {
    throw new Error('useEventsTabContext must be used within a EventsTabContextProvider')
  }

  return context
}
