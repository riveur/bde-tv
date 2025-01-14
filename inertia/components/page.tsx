import * as React from 'react'

import { cn } from '@/lib/utils'

const Page = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('w-full flex flex-col gap-4', className)} {...props} />
}

const PageTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 className={cn('text-xl md:text-2xl font-bold', className)} {...props} />
}

export { Page, PageTitle }
