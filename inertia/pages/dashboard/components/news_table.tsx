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
import type { New } from '@/types'
import { NewBadge } from './new_badge'
import { NewsForm } from './news_form'
import { useNewsTabContext } from './news_tab'

const columns: ColumnDef<New>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
  },
  {
    accessorKey: 'level',
    header: 'Importance',
    cell: ({ row }) => {
      return <NewBadge level={row.original.level} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date de création',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Date de modification',
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const { formRef, setOpenForm, setCurrentNew } = useNewsTabContext()
      return (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => {
              setCurrentNew(row.original)
              setOpenForm(true)
              formRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="sr-only">Modifier</span>
            <Edit2Icon className="size-4" />
          </Button>
          <AlertDialogDeleteNew
            onConfirm={() => {
              router.delete(`/news/${row.original.id}`, {
                preserveState: true,
                onSuccess() {
                  toast.success('Actualité supprimée avec succès !')
                },
              })
            }}
          >
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <span className="sr-only">Supprimer</span>
              <Trash2Icon className="size-4" />
            </Button>
          </AlertDialogDeleteNew>
        </div>
      )
    },
  },
]

interface DataTableProps {
  data: New[]
}

export function DataTable({ data }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState('')
  const { currentNew, setCurrentNew, setOpenForm, openForm } = useNewsTabContext()

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
            setCurrentNew(null)
            setOpenForm(true)
          }}
        >
          Ajouter une actualité
        </Button>
      </div>
      {openForm && <NewsForm />}
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
                    data-current={currentNew?.id === row.original.id}
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

function AlertDialogDeleteNew({
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
          <AlertDialogTitle>Voulez-vous vraiment supprimer cette actualité ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement l'actualité.
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
