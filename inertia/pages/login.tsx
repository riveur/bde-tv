import { Head, Link } from '@inertiajs/react'
import { GalleryVerticalEndIcon } from 'lucide-react'

import { LoginForm } from '@/components/login_form'

export default function LoginPage() {
  return (
    <>
      <Head title="Connexion" />
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            BDE Lycée Saint Joseph
          </Link>
          <LoginForm />
        </div>
      </main>
    </>
  )
}
