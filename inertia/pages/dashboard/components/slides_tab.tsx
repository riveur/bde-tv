import type { Slide } from '@/types'
import { SlidesForm } from './slides_form'
import { SlidesManager } from './slides_manager'

interface SlidesTabProps {
  slides: Slide[]
}

export function SlidesTab({ slides }: SlidesTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <SlidesForm />
      <SlidesManager slides={slides} />
    </div>
  )
}
