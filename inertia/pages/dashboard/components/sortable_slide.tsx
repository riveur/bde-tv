import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EyeIcon, EyeOffIcon, GripVerticalIcon, Trash2Icon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert_dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Slide } from '@/types'

interface SortableSlideProps {
  slide: Slide
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  disabled?: boolean
}

export function SortableSlide({ slide, onToggle, onDelete, disabled = false }: SortableSlideProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slide.id,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-lg flex items-center gap-4 p-4',
        isDragging && 'opacity-50',
        disabled && 'opacity-75'
      )}
    >
      {!disabled && (
        <Button
          size="icon"
          variant="ghost"
          className="cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon />
        </Button>
      )}
      <div className="relative w-24 h-16 rounded overflow-hidden">
        <img
          src={slide.imageUrl}
          alt={`Slide ${slide.id}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="text-sm">ID: {slide.id}</p>
        <p className="text-sm">Position: {slide.order ?? 'Inactive'}</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(slide.id)}
          className="rounded-full"
          title={slide.order === null ? 'Activer la slide' : 'Désactiver la slide'}
        >
          {slide.order === null ? <EyeOffIcon /> : <EyeIcon />}
        </Button>

        <AlertDialogDeleteSlide onConfirm={() => onDelete(slide.id)}>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive-foreground hover:text-destructive rounded-full"
            title="Supprimer la slide"
          >
            <Trash2Icon />
          </Button>
        </AlertDialogDeleteSlide>
      </div>
    </Card>
  )
}

function AlertDialogDeleteSlide({
  onConfirm,
  children,
}: {
  onConfirm: () => void
  children: React.ReactNode
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voulez-vous vraiment supprimer cette slide ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement la slide.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
