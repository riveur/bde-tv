import { Link } from '@inertiajs/react'
import { WallpaperIcon } from 'lucide-react'

import { Head } from '@/components/head'
import { LoginForm } from '@/components/login_form'
import { useAppSettings } from '@/hooks/use_app_settings'

export default function LoginPage() {
  const settings = useAppSettings()

  return (
    <>
      <Head title="Connexion" />
      <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 self-center font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-fuchsia-500 text-primary-foreground">
              <WallpaperIcon className="size-4" />
            </div>
            {settings.appName}
          </Link>
          <LoginForm />
        </div>
      </main>
    </>
  )
}
