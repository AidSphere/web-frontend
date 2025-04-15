// app/page.tsx
'use client';

import { useState } from 'react';
import {
  Sun,
  Moon,
  ArrowRight,
  Plus,
  Save,
  Trash,
  Star,
  Heart,
  Share2,
  Menu,
  X,
  Home,
  Settings,
  Users,
  BarChart,
} from 'lucide-react';

export default function ColorExamplesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const secondaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard' },
    { icon: <Users size={20} />, label: 'Users' },
    { icon: <BarChart size={20} />, label: 'Analytics' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}
    >
      {/* Header with Theme Toggle */}
      <header className='sticky top-0 z-50 flex items-center justify-between bg-sidebar-primary p-4 text-sidebar-primary-foreground'>
        <h1 className='text-xl font-bold'>HeroUI Color System</h1>
        <button
          onClick={toggleTheme}
          className='rounded-full bg-sidebar-accent p-2 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900'
          aria-label='Toggle theme'
        >
          {isDarkMode ? (
            <Sun className='h-5 w-5 text-sidebar-accent-foreground' />
          ) : (
            <Moon className='h-5 w-5 text-sidebar-accent-foreground' />
          )}
        </button>
      </header>

      <div className='flex flex-col md:flex-row'>
        {/* Sidebar Example */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out md:sticky md:top-[73px] md:h-[calc(100vh-73px)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <div className='border-b border-sidebar-border p-4'>
            <h2 className='text-lg font-bold text-sidebar-primary'>Sidebar</h2>
            <p className='text-sm text-sidebar-foreground/70'>Color Example</p>
          </div>

          <nav className='p-4'>
            <h3 className='mb-3 text-xs font-semibold uppercase text-sidebar-foreground/50'>
              Navigation
            </h3>
            <ul className='space-y-2'>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href='#'
                    className='flex items-center gap-3 rounded-md p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className='absolute bottom-0 w-full border-t border-sidebar-border p-4'>
            <div className='flex items-center gap-3 p-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground'>
                U
              </div>
              <div>
                <p className='font-medium text-sidebar-foreground'>User Name</p>
                <p className='text-xs text-sidebar-foreground/70'>
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg md:hidden'
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Main Content */}
        <main className='flex-1 p-6 md:p-8'>
          <div className='mx-auto max-w-6xl space-y-12'>
            {/* Introduction */}
            <section>
              <h2 className='mb-4 inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text pb-1 text-3xl font-bold text-foreground'>
                HeroUI Color System
              </h2>
              <p className='text-foreground/80 max-w-3xl'>
                A comprehensive showcase of all colors and components in the
                HeroUI theme. This page demonstrates how to use the custom color
                system defined in your Tailwind configuration.
              </p>
            </section>

            {/* Color Palettes */}
            <section className='space-y-8'>
              <h2 className='border-b border-sidebar-border pb-2 text-2xl font-semibold'>
                Color Palettes
              </h2>

              {/* Primary Colors */}
              <div className='space-y-3'>
                <h3 className='text-lg font-medium'>
                  Primary Colors (Pink/Magenta)
                </h3>
                <div className='grid grid-cols-5 gap-2 md:grid-cols-10'>
                  {primaryShades.map((shade) => (
                    <div
                      key={`primary-${shade}`}
                      className='flex flex-col items-center'
                    >
                      <div
                        className={`h-16 w-16 rounded-md bg-primary-${shade}`}
                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      ></div>
                      <span className='text-foreground/70 mt-1 text-xs'>
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='mt-2 flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-primary'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      DEFAULT (#fa3a91)
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md bg-primary p-2'>
                      <span className='text-xs text-primary-foreground'>
                        Foreground
                      </span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      foreground (#ffffff)
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Colors */}
              <div className='space-y-3'>
                <h3 className='text-lg font-medium'>Secondary Colors (Blue)</h3>
                <div className='grid grid-cols-5 gap-2 md:grid-cols-10'>
                  {secondaryShades.map((shade) => (
                    <div
                      key={`secondary-${shade}`}
                      className='flex flex-col items-center'
                    >
                      <div
                        className={`h-16 w-16 rounded-md bg-secondary-${shade}`}
                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      ></div>
                      <span className='text-foreground/70 mt-1 text-xs'>
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='mt-2 flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-secondary'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      DEFAULT (#3298ff)
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md bg-secondary p-2'>
                      <span className='text-xs text-secondary-foreground'>
                        Foreground
                      </span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      foreground (#ffffff)
                    </span>
                  </div>
                </div>
              </div>

              {/* Focus and Utility Colors */}
              <div className='space-y-3'>
                <h3 className='text-lg font-medium'>
                  Focus and Utility Colors
                </h3>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-focus'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      focus (#8ed2ff)
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md border border-sidebar-border bg-background'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      background
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md border border-sidebar-border bg-background p-2'>
                      <span className='text-xs text-foreground'>Text</span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      foreground
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Colors */}
              <div className='space-y-3'>
                <h3 className='text-lg font-medium'>Sidebar Colors</h3>
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-sidebar'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md bg-sidebar p-2'>
                      <span className='text-xs text-sidebar-foreground'>
                        Text
                      </span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-foreground
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-sidebar-primary'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-primary
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md bg-sidebar-primary p-2'>
                      <span className='text-xs text-sidebar-primary-foreground'>
                        Text
                      </span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-primary-foreground
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md bg-sidebar-accent'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-accent
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex h-12 w-24 items-center justify-center rounded-md bg-sidebar-accent p-2'>
                      <span className='text-xs text-sidebar-accent-foreground'>
                        Text
                      </span>
                    </div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-accent-foreground
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md border-2 border-sidebar-border'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-border
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div
                      className='h-12 w-24 rounded-md ring-2 ring-sidebar-ring'
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className='text-foreground/70 mt-1 text-xs'>
                      sidebar-ring
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Button Examples */}
            <section className='space-y-8'>
              <h2 className='border-b border-sidebar-border pb-2 text-2xl font-semibold'>
                Button Examples
              </h2>

              {/* Primary Buttons */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Primary Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                  <button className='rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-700'>
                    Default
                  </button>
                  <button className='flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-700'>
                    <Plus size={16} />
                    <span>With Icon</span>
                  </button>
                  <button className='rounded-md bg-primary-50 px-3 py-2 text-primary-700 transition-colors hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-200'>
                    Subtle
                  </button>
                  <button className='rounded-md border border-primary px-4 py-2 text-primary transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:bg-primary-100'>
                    Outline
                  </button>
                  <button
                    disabled
                    className='cursor-not-allowed rounded-md bg-primary px-4 py-2 text-primary-foreground opacity-30'
                  >
                    Disabled
                  </button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Secondary Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                  <button className='rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:bg-secondary-700'>
                    Default
                  </button>
                  <button className='flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:bg-secondary-700'>
                    <Save size={16} />
                    <span>With Icon</span>
                  </button>
                  <button className='rounded-md bg-secondary-50 px-3 py-2 text-secondary-700 transition-colors hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:bg-secondary-200'>
                    Subtle
                  </button>
                  <button className='rounded-md border border-secondary px-4 py-2 text-secondary transition-colors hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:bg-secondary-100'>
                    Outline
                  </button>
                  <button
                    disabled
                    className='cursor-not-allowed rounded-md bg-secondary px-4 py-2 text-secondary-foreground opacity-30'
                  >
                    Disabled
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Action Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                  <button className='flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700'>
                    <Trash size={16} />
                    <span>Delete</span>
                  </button>
                  <button className='flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-700'>
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                  <button className='group flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                    <span>Continue</span>
                    <ArrowRight
                      size={16}
                      className='transition-transform group-hover:translate-x-1'
                    />
                  </button>
                </div>
              </div>

              {/* Button Sizes */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Button Sizes</h3>
                <div className='flex flex-wrap items-center gap-4'>
                  <button className='rounded-sm bg-primary px-2 py-1 text-xs text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'>
                    Small
                  </button>
                  <button className='rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                    Medium
                  </button>
                  <button className='rounded-lg bg-primary px-6 py-3 text-lg text-primary-foreground transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                    Large
                  </button>
                </div>
              </div>
            </section>

            {/* Card Examples */}
            <section className='space-y-8'>
              <h2 className='border-b border-sidebar-border pb-2 text-2xl font-semibold'>
                Card Examples
              </h2>

              {/* Basic Cards */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Basic Cards</h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {/* Primary Card */}
                  <div className='overflow-hidden rounded-lg border border-sidebar-border bg-background shadow-sm'>
                    <div className='border-b border-sidebar-border bg-primary-50 p-4'>
                      <h4 className='text-lg font-medium text-primary-800'>
                        Primary Card
                      </h4>
                    </div>
                    <div className='p-4'>
                      <p className='text-foreground/80'>
                        This card uses primary color accents to highlight
                        important content.
                      </p>
                    </div>
                    <div className='flex justify-end border-t border-sidebar-border bg-background p-4'>
                      <button className='flex items-center gap-1 text-sm text-primary hover:text-primary-700'>
                        Learn more <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Card */}
                  <div className='overflow-hidden rounded-lg border border-sidebar-border bg-background shadow-sm'>
                    <div className='border-b border-sidebar-border bg-secondary-50 p-4'>
                      <h4 className='text-lg font-medium text-secondary-800'>
                        Secondary Card
                      </h4>
                    </div>
                    <div className='p-4'>
                      <p className='text-foreground/80'>
                        This card uses secondary color accents for a different
                        visual hierarchy.
                      </p>
                    </div>
                    <div className='flex justify-end border-t border-sidebar-border bg-background p-4'>
                      <button className='flex items-center gap-1 text-sm text-secondary hover:text-secondary-700'>
                        Learn more <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Feature Cards</h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                  {/* Feature Card 1 */}
                  <div className='group overflow-hidden rounded-lg border border-sidebar-border bg-background shadow-sm transition-colors hover:border-primary'>
                    <div className='p-6'>
                      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100'>
                        <Star className='h-6 w-6 text-primary' />
                      </div>
                      <h4 className='mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary'>
                        Premium Features
                      </h4>
                      <p className='text-foreground/70'>
                        Access exclusive tools and resources with our premium
                        plan.
                      </p>
                    </div>
                    <div className='flex justify-end px-6 py-4'>
                      <a
                        href='#'
                        className='flex items-center gap-1 text-sm font-medium text-primary group-hover:underline'
                      >
                        Explore <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Feature Card 2 */}
                  <div className='group overflow-hidden rounded-lg border border-sidebar-border bg-background shadow-sm transition-colors hover:border-secondary'>
                    <div className='p-6'>
                      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100'>
                        <Heart className='h-6 w-6 text-secondary' />
                      </div>
                      <h4 className='mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-secondary'>
                        User-Friendly
                      </h4>
                      <p className='text-foreground/70'>
                        Our intuitive interface makes it easy to manage your
                        content.
                      </p>
                    </div>
                    <div className='flex justify-end px-6 py-4'>
                      <a
                        href='#'
                        className='flex items-center gap-1 text-sm font-medium text-secondary group-hover:underline'
                      >
                        Learn more <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Feature Card 3 */}
                  <div className='group overflow-hidden rounded-lg border border-sidebar-border bg-background shadow-sm transition-colors hover:border-primary'>
                    <div className='p-6'>
                      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100'>
                        <Share2 className='h-6 w-6 text-primary' />
                      </div>
                      <h4 className='mb-2 text-lg font-medium text-foreground transition-colors group-hover:text-primary'>
                        Seamless Integration
                      </h4>
                      <p className='text-foreground/70'>
                        Connect with your favorite tools and services
                        effortlessly.
                      </p>
                    </div>
                    <div className='flex justify-end px-6 py-4'>
                      <a
                        href='#'
                        className='flex items-center gap-1 text-sm font-medium text-primary group-hover:underline'
                      >
                        Discover <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Card */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Gradient Card</h3>
                <div className='overflow-hidden rounded-lg shadow-md'>
                  <div className='bg-gradient-to-r from-primary to-secondary p-6'>
                    <h3 className='mb-2 text-xl font-bold text-white'>
                      Premium Subscription
                    </h3>
                    <p className='text-white/90'>
                      Unlock all features with our premium plan. Get started
                      today!
                    </p>
                  </div>
                  <div className='dark:bg-sidebar-background bg-white p-6'>
                    <ul className='mb-4 space-y-2'>
                      <li className='flex items-center gap-2'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary-100'>
                          <div className='h-2 w-2 rounded-full bg-primary'></div>
                        </div>
                        <span className='text-foreground'>
                          Unlimited access to all templates
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary-100'>
                          <div className='h-2 w-2 rounded-full bg-primary'></div>
                        </div>
                        <span className='text-foreground'>
                          Priority customer support
                        </span>
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary-100'>
                          <div className='h-2 w-2 rounded-full bg-primary'></div>
                        </div>
                        <span className='text-foreground'>
                          Custom branding options
                        </span>
                      </li>
                    </ul>
                    <button className='w-full rounded-md bg-secondary py-2 text-secondary-foreground transition-colors hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'>
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Alert Examples */}
            <section className='space-y-8'>
              <h2 className='border-b border-sidebar-border pb-2 text-2xl font-semibold'>
                Alert Examples
              </h2>

              <div className='space-y-4'>
                <div className='rounded-r-md border-l-4 border-primary bg-primary-50 p-4'>
                  <h4 className='font-medium text-primary-800'>Information</h4>
                  <p className='text-primary-700'>
                    This is an information message using the primary color.
                  </p>
                </div>

                <div className='rounded-r-md border-l-4 border-secondary bg-secondary-50 p-4'>
                  <h4 className='font-medium text-secondary-800'>Success</h4>
                  <p className='text-secondary-700'>
                    This is a success message using the secondary color.
                  </p>
                </div>

                <div className='rounded-r-md border-l-4 border-yellow-500 bg-yellow-50 p-4'>
                  <h4 className='font-medium text-yellow-800'>Warning</h4>
                  <p className='text-yellow-700'>
                    This is a warning message using a yellow accent.
                  </p>
                </div>

                <div className='rounded-r-md border-l-4 border-red-500 bg-red-50 p-4'>
                  <h4 className='font-medium text-red-800'>Error</h4>
                  <p className='text-red-700'>
                    This is an error message using a red accent.
                  </p>
                </div>
              </div>
            </section>

            {/* Form Elements */}
            <section className='space-y-8'>
              <h2 className='border-b border-sidebar-border pb-2 text-2xl font-semibold'>
                Form Elements
              </h2>

              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-foreground'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      className='block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary'
                      placeholder='Enter your name'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-foreground'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary'
                      placeholder='Enter your email'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-foreground'>
                      Options
                    </label>
                    <div className='space-y-2'>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='option1'
                          className='h-4 w-4 rounded border-sidebar-border text-primary focus:ring-primary'
                        />
                        <label
                          htmlFor='option1'
                          className='ml-2 block text-sm text-foreground'
                        >
                          Option 1
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='option2'
                          className='h-4 w-4 rounded border-sidebar-border text-primary focus:ring-primary'
                        />
                        <label
                          htmlFor='option2'
                          className='ml-2 block text-sm text-foreground'
                        >
                          Option 2
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='dropdown'
                      className='block text-sm font-medium text-foreground'
                    >
                      Dropdown
                    </label>
                    <select
                      id='dropdown'
                      className='block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary'
                    >
                      <option>Select an option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-foreground'
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      rows={4}
                      className='block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary'
                      placeholder='Enter your message'
                    ></textarea>
                  </div>

                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-foreground'>
                      Theme
                    </label>
                    <div className='space-y-2'>
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='light'
                          name='theme'
                          className='h-4 w-4 border-sidebar-border text-primary focus:ring-primary'
                          checked={!isDarkMode}
                          onChange={() => setIsDarkMode(false)}
                        />
                        <label
                          htmlFor='light'
                          className='ml-2 block text-sm text-foreground'
                        >
                          Light
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='dark'
                          name='theme'
                          className='h-4 w-4 border-sidebar-border text-primary focus:ring-primary'
                          checked={isDarkMode}
                          onChange={() => setIsDarkMode(true)}
                        />
                        <label
                          htmlFor='dark'
                          className='ml-2 block text-sm text-foreground'
                        >
                          Dark
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className='bg-sidebar-primary p-6 text-sidebar-primary-foreground'>
        <div className='mx-auto max-w-6xl'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <div className='mb-4 md:mb-0'>
              <h3 className='text-xl font-bold'>HeroUI</h3>
              <p className='text-sidebar-primary-foreground/70'>
                A beautiful color system for your next project
              </p>
            </div>
            <div className='flex gap-4'>
              <button className='rounded-full bg-sidebar-accent p-2 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900'>
                <Settings className='h-5 w-5 text-sidebar-accent-foreground' />
              </button>
              <button className='rounded-full bg-sidebar-accent p-2 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900'>
                <Heart className='h-5 w-5 text-sidebar-accent-foreground' />
              </button>
              <button className='rounded-full bg-sidebar-accent p-2 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900'>
                <Share2 className='h-5 w-5 text-sidebar-accent-foreground' />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
