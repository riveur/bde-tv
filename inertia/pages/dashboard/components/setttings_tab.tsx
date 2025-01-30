import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAppSettings } from '@/hooks/use_app_settings'

const schema = z.object({
  appName: z.string().min(1),
  refreshInterval: z.number().or(z.string()).pipe(z.coerce.number()),
  carouselInterval: z.number().or(z.string()).pipe(z.coerce.number()),
  weatherCity: z.string().min(1),
  weatherTtl: z.string().min(1),
  googleNewsTopicToken: z.string(),
})

export function SettingsTab() {
  const settings = useAppSettings()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...settings },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await new Promise((resolve, reject) => {
      router.put('/settings', data, {
        onSuccess(event) {
          form.reset(event.props.appSettings as typeof settings)
          toast.success('Paramètres enregistrés avec succès')
          resolve(undefined)
        },
        onError(error) {
          toast.error("Une erreur est survenue lors de l'enregistrement des paramètres")
          reject(error)
        },
      })
    })
  })

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent className="pt-6 px-0 grid gap-4">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Nom de l'application</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="refreshInterval"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Délai d'actualisation des données</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Ce délai est effectif uniquement sur la page d'accueil (en minutes)
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="carouselInterval"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Délai de la diaporama</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Ce délai est effectif uniquement sur la page d'accueil (en secondes)
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <Separator className="my-2" />
            <FormField
              control={form.control}
              name="weatherCity"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Ville pour la météo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="weatherTtl"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Durée de validité de la météo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Le format de la durée doit suivre un format de durée (ex: 30min, 1h, 2h)
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="googleNewsTopicToken"
              render={({ field }) => {
                return (
                  <FormItem className="px-6">
                    <FormLabel>Google News: Topic Token</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Le token du sujet à afficher pour récupérer les actualités sur Google News
                    </FormDescription>
                  </FormItem>
                )
              }}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              Enregistrer
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
