"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaLock, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import { Card } from '@/components/ui/card';
import { ThemeModeToggle } from '@/components/ThemeModeToggle';

const LoginPage = () => {
  // Theme state (true = dark, false = light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme changes when state changes
  useEffect(() => {
    // Update document class for theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='relative min-h-screen'>
    {/* Theme toggle positioned in the top right */}
    <div className="absolute top-4 right-4 z-50">
      <ThemeModeToggle />
    </div>
        {/* login main content */}
        <div className="flex min-h-screen w-full">

        {/* Left side image */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative">
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Healthcare professionals" 
              width={800} 
              height={1200}
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/20 to-transparent text-center">
            <h2 className="text-2xl font-bold text-primary">AidSphere Medical Portal</h2>
            <p className="text-foreground/80">Streamlining healthcare management for professionals</p>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="mt-2 text-foreground/70">
                Sign in to access your medical dashboard
              </p>
            </div>
            
            <Card className="p-6 shadow-lg border-sidebar-border">
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-foreground/40" />
                      </div>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        autoComplete="email" 
                        required 
                        className="pl-10 bg-background focus:border-primary"
                        placeholder="doctor@hospital.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-foreground/80">
                        Password
                      </label>
                      <a href="/auth/forgot-password" className="text-sm font-medium text-primary hover:text-primary-600 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-foreground/40" />
                      </div>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        autoComplete="current-password" 
                        required 
                        className="pl-10 bg-background focus:border-primary"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-sidebar-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70">
                      Remember me
                    </label>
                  </div>
                </div>
                
                <div>
                  <Button className="w-full bg-primary hover:bg-primary-600 text-white" size="lg">
                    Sign in
                  </Button>
                </div>
              </form>
            </Card>
            
            <div className="text-center">
              <p className="text-sm text-foreground/70">
                Don&apos;t have an account?{' '}
                <Link href="/importer/register" className="font-medium text-primary hover:text-primary-600 transition-colors">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default LoginPage;