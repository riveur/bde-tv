import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@/components/theme_provider'
import { Button } from '@/components/ui/button'

export function ThemeToggler(
  props: Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onClick' | 'children'>
) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <span className="sr-only">Basculer le thème</span>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
