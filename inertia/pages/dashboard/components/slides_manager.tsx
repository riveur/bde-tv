import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Slide } from '@/types'
import { SortableSlide } from './sortable_slide'

interface SlidesManagerProps {
  slides: Slide[]
}

export function SlidesManager({ slides }: SlidesManagerProps) {
  const [optimisticSlides, setOptimisticSlides] = useState<Slide[] | null>(null)
  const displayedSlides = optimisticSlides || slides

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = displayedSlides.findIndex((item) => item.id === active.id)
      const newIndex = displayedSlides.findIndex((item) => item.id === over.id)

      const updatedSlides = arrayMove(displayedSlides, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: item.order !== null ? index + 1 : null,
      }))

      setOptimisticSlides(updatedSlides)

      try {
        await new Promise((resolve, reject) => {
          router.post(
            '/slides/order',
            { data: updatedSlides.map(({ id, order }) => ({ id, order })) },
            { onSuccess: resolve, onError: reject, only: ['slides'] }
          )
        })
        toast.success("L'ordre des slides a été mis à jour")
      } catch (error) {
        toast.error("Une erreur est survenue lors de la mise à jour de l'ordre des slides")
      } finally {
        setOptimisticSlides(null)
      }
    }
  }

  const toggleSlide = (slideId: number) => {
    toast.promise(
      new Promise((resolve, reject) => {
        router.post(
          `/slides/${slideId}/toggle`,
          {},
          {
            onSuccess: resolve,
            onError: reject,
            only: ['slides'],
          }
        )
      }),
      {
        loading: 'Mise à jour de la slide...',
        success: 'La slide a été mise à jour',
        error: 'Une erreur est survenue lors de la mise à jour de la slide',
      }
    )
  }

  const deleteSlide = (slideId: number) => {
    toast.promise(
      new Promise((resolve, reject) => {
        router.delete(`/slides/${slideId}`, {
          onSuccess: resolve,
          onError: reject,
          only: ['slides'],
        })
      }),
      {
        loading: 'Suppression de la slide...',
        success: 'La slide a été supprimée',
        error: 'Une erreur est survenue lors de la suppression de la slide',
      }
    )
  }

  const activeItems = displayedSlides
    .filter((slide) => slide.order !== null)
    .toSorted((a, b) => {
      if (a.order === null) return 1
      if (b.order === null) return -1
      return a.order - b.order
    })

  const inactiveItems = displayedSlides.filter((slide) => slide.order === null)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Slides actifs</CardTitle>
        </CardHeader>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={activeItems} strategy={verticalListSortingStrategy}>
            <CardContent className="p-4 pt-0 flex flex-col gap-4">
              {activeItems.map((slide) => (
                <SortableSlide
                  key={slide.id}
                  slide={slide}
                  onToggle={toggleSlide}
                  onDelete={deleteSlide}
                />
              ))}
            </CardContent>
          </SortableContext>
        </DndContext>
      </Card>
      {inactiveItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Slides inactifs</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col gap-4">
            {inactiveItems.map((slide) => (
              <SortableSlide
                key={slide.id}
                slide={slide}
                onToggle={toggleSlide}
                onDelete={deleteSlide}
                disabled
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
