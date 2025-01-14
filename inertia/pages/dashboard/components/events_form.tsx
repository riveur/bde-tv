import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { CalendarIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDate } from '@/lib/date'
import { DateTime } from '@/lib/luxon'
import { cn } from '@/lib/utils'
import type { Event } from '@/types'
import { useEventsTabContext } from './events_tab'

const createSchema = z.object({
  title: z.string().min(1),
  startAt: z.date(),
  endAt: z.date(),
})

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  startAt: z.date().optional(),
  endAt: z.date().optional(),
})

export function EventsForm() {
  const { formRef, currentEvent, setOpenForm } = useEventsTabContext()

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Card ref={formRef}>
      <CardHeader className="flex-row space-y-0 justify-between">
        <CardTitle>{currentEvent ? 'Modifier un évènement' : 'Ajouter un évènement'}</CardTitle>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => setOpenForm(false)}
        >
          <span className="sr-only">Fermer le formulaire</span>
          <XIcon />
        </Button>
      </CardHeader>
      {currentEvent ? <UpdateForm data={{ ...currentEvent }} /> : <CreateForm />}
    </Card>
  )
}

function CreateForm() {
  const { setOpenForm } = useEventsTabContext()

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: '',
      startAt: DateTime.now().toJSDate(),
      endAt: DateTime.now().toJSDate(),
    },
  })

  const onSubmit = form.handleSubmit(async (result) => {
    await new Promise((resolve, reject) => {
      router.post(
        '/events',
        {
          ...result,
          startAt: result.startAt ? DateTime.fromJSDate(result.startAt).toSQLDate() : undefined,
          endAt: result.endAt ? DateTime.fromJSDate(result.endAt).toSQLDate() : undefined,
        },
        {
          preserveState: true,
          onSuccess() {
            setOpenForm(false)
            toast.success('Evènement ajouté avec succès !')
            resolve(undefined)
          },
          onError: reject,
        }
      )
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Concours d'anecdotes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="space-y-0 flex flex-row items-center gap-2">
                  <FormLabel className="text-nowrap">Date de début :</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateTime.DATE_SHORT)
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem className="space-y-0 flex flex-row items-center gap-2">
                  <FormLabel className="text-nowrap">Date de fin :</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateTime.DATE_SHORT)
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Enregistrer
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}

function UpdateForm({ data }: { data: Event }) {
  const { setOpenForm, setCurrentEvent } = useEventsTabContext()

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: data.title,
      startAt: DateTime.fromISO(data.startAt).toJSDate(),
      endAt: DateTime.fromISO(data.endAt).toJSDate(),
    },
  })

  useEffect(() => {
    form.reset({
      title: data.title,
      startAt: DateTime.fromISO(data.startAt).toJSDate(),
      endAt: DateTime.fromISO(data.endAt).toJSDate(),
    })
  }, [data])

  const onSubmit = form.handleSubmit(async (result) => {
    await new Promise((resolve, reject) => {
      router.put(
        `/events/${data.id}`,
        {
          ...result,
          startAt: result.startAt ? DateTime.fromJSDate(result.startAt).toSQLDate() : undefined,
          endAt: result.endAt ? DateTime.fromJSDate(result.endAt).toSQLDate() : undefined,
        },
        {
          preserveState: true,
          onSuccess() {
            setCurrentEvent(null)
            setOpenForm(false)
            toast.success('Evènement modifié avec succès !')
            resolve(undefined)
          },
          onError: reject,
        }
      )
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Concours d'anecdotes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="space-y-0 flex flex-row items-center gap-2">
                  <FormLabel className="text-nowrap">Date de début :</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateTime.DATE_SHORT)
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem className="space-y-0 flex flex-row items-center gap-2">
                  <FormLabel className="text-nowrap">Date de fin :</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateTime.DATE_SHORT)
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Modifier
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
