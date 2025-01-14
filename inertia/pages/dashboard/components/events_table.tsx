import { router } from '@inertiajs/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Edit2Icon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

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
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/date'
import { DateTime } from '@/lib/luxon'
import type { Event } from '@/types'
import { EventsForm } from './events_form'
import { useEventsTabContext } from './events_tab'
import { cn } from '@/lib/utils'

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
  },
  {
    accessorKey: 'startAt',
    header: 'Date de début',
    cell: ({ row }) => {
      return formatDate(row.original.startAt, DateTime.DATE_MED)
    },
  },
  {
    accessorKey: 'endAt',
    header: 'Date de fin',
    cell: ({ row }) => {
      return formatDate(row.original.endAt, DateTime.DATE_MED)
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const { formRef, setOpenForm, setCurrentEvent } = useEventsTabContext()
      return (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => {
              setCurrentEvent(row.original)
              setOpenForm(true)
              formRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="sr-only">Modifier</span>
            <Edit2Icon />
          </Button>
          <AlertDialogDeleteEvent
            onConfirm={() => {
              router.delete(`/events/${row.original.id}`, {
                preserveState: true,
                onSuccess() {
                  toast.success('Evènement supprimé avec succès !')
                },
              })
            }}
          >
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span className="sr-only">Supprimer</span>
              <Trash2Icon />
            </Button>
          </AlertDialogDeleteEvent>
        </div>
      )
    },
  },
]

interface DataTableProps {
  data: Event[]
}

export function DataTable({ data }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const { currentEvent, setCurrentEvent, setOpenForm, openForm } = useEventsTabContext()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          value={globalFilter}
          placeholder="Recherche..."
          className="w-auto col-span-1 md:col-span-3"
          onChange={(event) => setGlobalFilter(String(event.target.value))}
        />
        <Button
          type="button"
          variant="outline"
          className="col-span-1"
          onClick={() => {
            setCurrentEvent(null)
            setOpenForm(true)
          }}
        >
          Ajouter un évènement
        </Button>
      </div>
      {openForm && <EventsForm />}
      <Card>
        <CardContent className="p-0">
          <Table className="text-nowrap">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    data-current={currentEvent?.id === row.original.id}
                    className="data-[current=true]:bg-accent"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Aucun résultat.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

function AlertDialogDeleteEvent({
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
          <AlertDialogTitle>Voulez-vous vraiment supprimer cet évènement ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement l'évènement.
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
