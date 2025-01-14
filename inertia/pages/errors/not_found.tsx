import { Head } from '@inertiajs/react'

export default function NotFound() {
  return (
    <>
      <Head title="Page introuvable" />
      <main className="min-h-screen flex items-center justify-center flex-col gap-2">
        <h1 className="text-4xl font-bold">404</h1>
        <p>Page introuvable</p>
      </main>
    </>
  )
}
