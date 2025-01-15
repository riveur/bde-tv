import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import type { Event } from '@/types'
import { EventCard } from './event_card'

interface EventsTimelineProps {
  events: Event[]
}

export function EventsTimeline({ events }: EventsTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="group relative w-full">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => scroll('left')}
        >
          <ChevronLeftIcon />
        </Button>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => scroll('right')}
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-4 pt-2 scrollbar-hide relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20" />
        {events.map((event) => (
          <div key={event.id} className="relative flex-shrink-0 w-[300px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center z-10">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <EventCard className="rounded-lg h-24" event={event} />
          </div>
        ))}
      </div>
    </div>
  )
}
