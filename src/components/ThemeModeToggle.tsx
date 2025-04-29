/* eslint-disable tailwindcss/no-custom-classname */
// components/ThemeModeToggle.tsx
'use client';
import * as React from 'react';
import { Moon, Sun, MonitorCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './theme-provider';

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  // Add this to prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='w-fit'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            {/* Moon icon for dark mode */}
            <Moon className='absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />

            {/* Sun icon for light mode */}
            <Sun className='absolute size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />

            {/* System icon */}
            <MonitorCheck className='size-[1.2rem] rotate-0 scale-0 transition-all group-[.system]:rotate-0 group-[.system]:scale-100 dark:rotate-90 dark:scale-0' />

            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className={theme === 'light' ? 'bg-accent' : ''}
          >
            <Sun className='mr-2 size-4' />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className={theme === 'dark' ? 'bg-accent' : ''}
          >
            <Moon className='mr-2 size-4' />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className={theme === 'system' ? 'bg-accent' : ''}
          >
            <MonitorCheck className='mr-2 size-4' />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
