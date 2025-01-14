import { Head } from '@inertiajs/react'

export default function ServerError(props: { error: any }) {
  return (
    <>
      <Head title="Erreur interne" />
      <main className="min-h-screen flex items-center justify-center flex-col gap-2">
        <h1 className="text-4xl font-bold">{props.error.status}</h1>
        <p>Erreur interne</p>
        <p className="text-muted">{props.error.message || "L'erreur est inconnue"}</p>
      </main>
    </>
  )
}
