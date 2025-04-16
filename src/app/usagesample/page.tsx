// app/page.tsx
"use client";

import { useState } from "react";
import { Sun, Moon, ArrowRight, Plus, Save, Trash, Star, Heart, Share2, Menu, X, Home, Settings, Users, BarChart } from "lucide-react";

export default function ColorExamplesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const primaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const secondaryShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <Users size={20} />, label: "Users" },
    { icon: <BarChart size={20} />, label: "Analytics" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      {/* Header with Theme Toggle */}
      <header className="bg-sidebar-primary text-sidebar-primary-foreground p-4 sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold">HeroUI Color System</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-sidebar-accent hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-sidebar-accent-foreground" />
          ) : (
            <Moon className="h-5 w-5 text-sidebar-accent-foreground" />
          )}
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Example */}
        <aside className={`
          md:sticky md:top-[73px] md:h-[calc(100vh-73px)] bg-sidebar w-64 border-r border-sidebar-border
          fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="text-lg font-bold text-sidebar-primary">Sidebar</h2>
            <p className="text-sm text-sidebar-foreground/70">Color Example</p>
          </div>

          <nav className="p-4">
            <h3 className="text-xs uppercase text-sidebar-foreground/50 font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                U
              </div>
              <div>
                <p className="text-sidebar-foreground font-medium">User Name</p>
                <p className="text-xs text-sidebar-foreground/70">user@example.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-4 right-4 z-50 md:hidden p-3 rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-foreground inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text pb-1">
                HeroUI Color System
              </h2>
              <p className="text-foreground/80 max-w-3xl">
                A comprehensive showcase of all colors and components in the HeroUI theme. This page demonstrates how to use the custom color system defined in your Tailwind configuration.
              </p>
            </section>

            {/* Color Palettes */}
            <section className="space-y-8">
              <h2 className="text-2xl font-semibold border-b border-sidebar-border pb-2">Color Palettes</h2>

              {/* Primary Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Primary Colors (Pink/Magenta)</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {primaryShades.map((shade) => (
                    <div key={`primary-${shade}`} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md bg-primary-${shade}`}
                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      ></div>
                      <span className="mt-1 text-xs text-foreground/70">{shade}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-primary"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">DEFAULT (#fa3a91)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-primary p-2 flex items-center justify-center">
                      <span className="text-primary-foreground text-xs">Foreground</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">foreground (#ffffff)</span>
                  </div>
                </div>
              </div>

              {/* Secondary Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Secondary Colors (Blue)</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {secondaryShades.map((shade) => (
                    <div key={`secondary-${shade}`} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md bg-secondary-${shade}`}
                        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      ></div>
                      <span className="mt-1 text-xs text-foreground/70">{shade}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-secondary"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">DEFAULT (#3298ff)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-secondary p-2 flex items-center justify-center">
                      <span className="text-secondary-foreground text-xs">Foreground</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">foreground (#ffffff)</span>
                  </div>
                </div>
              </div>

              {/* Focus and Utility Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Focus and Utility Colors</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-focus"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">focus (#8ed2ff)</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-background border border-sidebar-border"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">background</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-background p-2 flex items-center justify-center border border-sidebar-border">
                      <span className="text-foreground text-xs">Text</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">foreground</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Colors */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Sidebar Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-sidebar"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-sidebar p-2 flex items-center justify-center">
                      <span className="text-sidebar-foreground text-xs">Text</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-foreground</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-sidebar-primary"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-sidebar-primary p-2 flex items-center justify-center">
                      <span className="text-sidebar-primary-foreground text-xs">Text</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-primary-foreground</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md bg-sidebar-accent"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-accent</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-12 rounded-md bg-sidebar-accent p-2 flex items-center justify-center">
                      <span className="text-sidebar-accent-foreground text-xs">Text</span>
                    </div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-accent-foreground</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md border-2 border-sidebar-border"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-border</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-24 h-12 rounded-md ring-2 ring-sidebar-ring"
                      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                    ></div>
                    <span className="mt-1 text-xs text-foreground/70">sidebar-ring</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Button Examples */}
            <section className="space-y-8">
              <h2 className="text-2xl font-semibold border-b border-sidebar-border pb-2">Button Examples</h2>
              
              {/* Primary Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Primary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                    Default
                  </button>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                    <Plus size={16} />
                    <span>With Icon</span>
                  </button>
                  <button className="px-3 py-2 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 active:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                    Subtle
                  </button>
                  <button className="px-4 py-2 border border-primary text-primary hover:bg-primary-50 active:bg-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                    Outline
                  </button>
                  <button disabled className="px-4 py-2 bg-primary text-primary-foreground rounded-md opacity-30 cursor-not-allowed">
                    Disabled
                  </button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors">
                    Default
                  </button>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-600 active:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                    <Save size={16} />
                    <span>With Icon</span>
                  </button>
                  <button className="px-3 py-2 bg-secondary-50 text-secondary-700 rounded-md hover:bg-secondary-100 active:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors">
                    Subtle
                  </button>
                  <button className="px-4 py-2 border border-secondary text-secondary hover:bg-secondary-50 active:bg-secondary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors">
                    Outline
                  </button>
                  <button disabled className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md opacity-30 cursor-not-allowed">
                    Disabled
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Action Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                    <Trash size={16} />
                    <span>Delete</span>
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2 group">
                    <span>Continue</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Button Sizes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-colors">
                    Small
                  </button>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                    Medium
                  </button>
                  <button className="px-6 py-3 text-lg bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                    Large
                  </button>
                </div>
              </div>
            </section>

            {/* Card Examples */}
            <section className="space-y-8">
              <h2 className="text-2xl font-semibold border-b border-sidebar-border pb-2">Card Examples</h2>
              
              {/* Basic Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Cards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Card */}
                  <div className="rounded-lg border border-sidebar-border bg-background shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-sidebar-border bg-primary-50">
                      <h4 className="text-lg font-medium text-primary-800">Primary Card</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-foreground/80">
                        This card uses primary color accents to highlight important content.
                      </p>
                    </div>
                    <div className="p-4 bg-background border-t border-sidebar-border flex justify-end">
                      <button className="text-primary hover:text-primary-700 flex items-center gap-1 text-sm">
                        Learn more <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Card */}
                  <div className="rounded-lg border border-sidebar-border bg-background shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-sidebar-border bg-secondary-50">
                      <h4 className="text-lg font-medium text-secondary-800">Secondary Card</h4>
                    </div>
                    <div className="p-4">
                      <p className="text-foreground/80">
                        This card uses secondary color accents for a different visual hierarchy.
                      </p>
                    </div>
                    <div className="p-4 bg-background border-t border-sidebar-border flex justify-end">
                      <button className="text-secondary hover:text-secondary-700 flex items-center gap-1 text-sm">
                        Learn more <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feature Cards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Feature Card 1 */}
                  <div className="group rounded-lg border border-sidebar-border bg-background shadow-sm overflow-hidden hover:border-primary transition-colors">
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="text-lg font-medium mb-2 text-foreground group-hover:text-primary transition-colors">
                        Premium Features
                      </h4>
                      <p className="text-foreground/70">
                        Access exclusive tools and resources with our premium plan.
                      </p>
                    </div>
                    <div className="px-6 py-4 flex justify-end">
                      <a 
                        href="#" 
                        className="text-primary flex items-center gap-1 text-sm font-medium group-hover:underline"
                      >
                        Explore <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Feature Card 2 */}
                  <div className="group rounded-lg border border-sidebar-border bg-background shadow-sm overflow-hidden hover:border-secondary transition-colors">
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                        <Heart className="h-6 w-6 text-secondary" />
                      </div>
                      <h4 className="text-lg font-medium mb-2 text-foreground group-hover:text-secondary transition-colors">
                        User-Friendly
                      </h4>
                      <p className="text-foreground/70">
                        Our intuitive interface makes it easy to manage your content.
                      </p>
                    </div>
                    <div className="px-6 py-4 flex justify-end">
                      <a 
                        href="#" 
                        className="text-secondary flex items-center gap-1 text-sm font-medium group-hover:underline"
                      >
                        Learn more <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Feature Card 3 */}
                  <div className="group rounded-lg border border-sidebar-border bg-background shadow-sm overflow-hidden hover:border-primary transition-colors">
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <Share2 className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="text-lg font-medium mb-2 text-foreground group-hover:text-primary transition-colors">
                        Seamless Integration
                      </h4>
                      <p className="text-foreground/70">
                        Connect with your favorite tools and services effortlessly.
                      </p>
                    </div>
                    <div className="px-6 py-4 flex justify-end">
                      <a 
                        href="#" 
                        className="text-primary flex items-center gap-1 text-sm font-medium group-hover:underline"
                      >
                        Discover <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Card */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gradient Card</h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Premium Subscription</h3>
                    <p className="text-white/90">
                      Unlock all features with our premium plan. Get started today!
                    </p>
                  </div>
                  <div className="bg-white dark:bg-sidebar-background p-6">
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-foreground">Unlimited access to all templates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-foreground">Priority customer support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-foreground">Custom branding options</span>
                      </li>
                    </ul>
                    <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Alert Examples */}
            <section className="space-y-8">
              <h2 className="text-2xl font-semibold border-b border-sidebar-border pb-2">Alert Examples</h2>
              
              <div className="space-y-4">
                <div className="bg-primary-50 border-l-4 border-primary p-4 rounded-r-md">
                  <h4 className="text-primary-800 font-medium">Information</h4>
                  <p className="text-primary-700">This is an information message using the primary color.</p>
                </div>
                
                <div className="bg-secondary-50 border-l-4 border-secondary p-4 rounded-r-md">
                  <h4 className="text-secondary-800 font-medium">Success</h4>
                  <p className="text-secondary-700">This is a success message using the secondary color.</p>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-md">
                  <h4 className="text-yellow-800 font-medium">Warning</h4>
                  <p className="text-yellow-700">This is a warning message using a yellow accent.</p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <h4 className="text-red-800 font-medium">Error</h4>
                  <p className="text-red-700">This is an error message using a red accent.</p>
                </div>
              </div>
            </section>

            {/* Form Elements */}
            <section className="space-y-8">
              <h2 className="text-2xl font-semibold border-b border-sidebar-border pb-2">Form Elements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-secondary focus:ring-1 focus:ring-secondary"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Options</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="option1" 
                          className="h-4 w-4 rounded border-sidebar-border text-primary focus:ring-primary"
                        />
                        <label htmlFor="option1" className="ml-2 block text-sm text-foreground">
                          Option 1
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="option2" 
                          className="h-4 w-4 rounded border-sidebar-border text-primary focus:ring-primary"
                        />
                        <label htmlFor="option2" className="ml-2 block text-sm text-foreground">
                          Option 2
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="dropdown" className="block text-sm font-medium text-foreground">Dropdown</label>
                    <select 
                      id="dropdown"
                      className="block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option>Select an option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="block w-full rounded-md border border-sidebar-border bg-background px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">Theme</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="light" 
                          name="theme"
                          className="h-4 w-4 border-sidebar-border text-primary focus:ring-primary"
                          checked={!isDarkMode}
                          onChange={() => setIsDarkMode(false)}
                        />
                        <label htmlFor="light" className="ml-2 block text-sm text-foreground">
                          Light
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="dark" 
                          name="theme"
                          className="h-4 w-4 border-sidebar-border text-primary focus:ring-primary"
                          checked={isDarkMode}
                          onChange={() => setIsDarkMode(true)}
                        />
                        <label htmlFor="dark" className="ml-2 block text-sm text-foreground">
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
      <footer className="bg-sidebar-primary text-sidebar-primary-foreground p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">HeroUI</h3>
              <p className="text-sidebar-primary-foreground/70">A beautiful color system for your next project</p>
            </div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-sidebar-accent hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors">
                <Settings className="h-5 w-5 text-sidebar-accent-foreground" />
              </button>
              <button className="p-2 rounded-full bg-sidebar-accent hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors">
                <Heart className="h-5 w-5 text-sidebar-accent-foreground" />
              </button>
              <button className="p-2 rounded-full bg-sidebar-accent hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors">
                <Share2 className="h-5 w-5 text-sidebar-accent-foreground" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}