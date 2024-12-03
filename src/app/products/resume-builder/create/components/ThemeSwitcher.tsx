'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Theme = 'modern' | 'classic' | 'creative'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('modern')

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    // Here you would apply the theme to your resume template
    console.log(`Theme changed to: ${newTheme}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Theme:</span>
      <Select onValueChange={handleThemeChange} defaultValue={theme}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="modern">Modern</SelectItem>
          <SelectItem value="classic">Classic</SelectItem>
          <SelectItem value="creative">Creative</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

