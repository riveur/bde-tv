import { Link } from '@inertiajs/react'
import { LogOutIcon, WallpaperIcon } from 'lucide-react'

import { ThemeToggler } from '@/components/theme_toggler'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps extends React.ComponentProps<'main'> {}

export function DashboardLayout({ className, children, ...props }: DashboardLayoutProps) {
  return (
    <>
      <header className="container mx-auto max-w-4xl flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-fuchsia-500 text-primary-foreground">
            <WallpaperIcon className="size-4" />
          </div>
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggler className="w-8 h-8" />
          <Button size="icon" variant="ghost" className="w-8 h-8" asChild>
            <Link method="post" href="/logout">
              <span className="sr-only">Se déconnecter</span>
              <LogOutIcon />
            </Link>
          </Button>
        </div>
      </header>
      <main className={cn('container mx-auto max-w-4xl p-4', className)} {...props}>
        {children}
      </main>
      <Toaster />
    </>
  )
}
