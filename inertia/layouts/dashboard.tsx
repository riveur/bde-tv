import { Link } from '@inertiajs/react'
import { GalleryVerticalEndIcon, LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps extends React.ComponentProps<'main'> {}

export function DashboardLayout({ className, children, ...props }: DashboardLayoutProps) {
  return (
    <>
      <header className="container mx-auto max-w-4xl flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          Zeluck Inc.
        </Link>
        <Button size="icon" variant="secondary" className="w-8 h-8" asChild>
          <Link method="post" href="/logout">
            <span className="sr-only">Se déconnecter</span>
            <LogOutIcon />
          </Link>
        </Button>
      </header>
      <main className={cn('container mx-auto max-w-4xl min-h-dvh py-4', className)} {...props}>
        {children}
      </main>
      <Toaster />
    </>
  )
}
