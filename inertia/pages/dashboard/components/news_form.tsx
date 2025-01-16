import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { New } from '@/types'
import { toast } from 'sonner'
import { useNewsTabContext } from './news_tab'

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  level: z.enum(['low', 'medium', 'high']),
})

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  level: z.enum(['low', 'medium', 'high']).optional(),
})

export function NewsForm() {
  const { formRef, currentNew, setOpenForm, setCurrentNew } = useNewsTabContext()

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Card ref={formRef}>
      <CardHeader className="flex-row space-y-0 justify-between">
        <CardTitle>{currentNew ? 'Modifier une actualité' : 'Ajouter une actualité'}</CardTitle>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={() => {
            setCurrentNew(null)
            setOpenForm(false)
          }}
        >
          <span className="sr-only">Fermer le formulaire</span>
          <XIcon />
        </Button>
      </CardHeader>
      {currentNew ? <UpdateForm data={{ ...currentNew }} /> : <CreateForm />}
    </Card>
  )
}

function CreateForm() {
  const { setOpenForm } = useNewsTabContext()

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: '',
      description: '',
      level: 'low',
    },
  })

  const onSubmit = form.handleSubmit(async (result) => {
    await new Promise((resolve, reject) => {
      router.post('/news', result, {
        preserveState: true,
        onSuccess() {
          setOpenForm(false)
          toast.success('Actualité ajoutée avec succès !')
          resolve(undefined)
        },
        onError: reject,
        only: ['news'],
      })
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
                  <Input autoFocus placeholder="Ramassage des ordures" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Ohlala c'est sale par ici..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Importance</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

function UpdateForm({ data }: { data: New }) {
  const { setOpenForm, setCurrentNew } = useNewsTabContext()

  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      level: data.level,
    },
  })

  useEffect(() => {
    form.reset({ title: data.title, description: data.description, level: data.level })
  }, [data])

  const onSubmit = form.handleSubmit(async (result) => {
    await new Promise((resolve, reject) => {
      router.put(`/news/${data.id}`, result, {
        preserveState: true,
        onSuccess() {
          setCurrentNew(null)
          setOpenForm(false)
          toast.success('Actualité modifiée avec succès !')
          resolve(undefined)
        },
        onError: reject,
        only: ['news'],
      })
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
                  <Input autoFocus placeholder="Ramassage des ordures" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Ohlala c'est sale par ici..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Importance</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
