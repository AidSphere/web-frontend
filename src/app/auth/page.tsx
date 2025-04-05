'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Tabs, Tab } from '@heroui/react';

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Handle login logic here
      console.log(data);
      // e.g., await signIn(data.email, data.password)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Login</CardTitle>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-center p-5'>
            <Tabs aria-label='Tabs radius' radius='full'>
              <Tab key='patient' title='Patient' />
              <Tab key='drugImporter' title='Drug Importer' />
              <Tab key='donor' title='Donor' />
            </Tabs>
          </div>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                {...form.register('email')}
                type='email'
                placeholder='m@example.com'
                disabled={isLoading}
              />
              {form.formState.errors.email && (
                <p className='text-sm text-red-500'>
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                {...form.register('password')}
                type='password'
                disabled={isLoading}
              />
              {form.formState.errors.password && (
                <p className='text-sm text-red-500'>
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-2'>
            <Button className='w-full' type='submit' disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <Link href='#' className='text-center text-sm' prefetch={false}>
              Forgot Password?
            </Link>
          </CardFooter>
        </form>
      </Card>
      <div className='mt-4'>
        <span className='text-sm'>Don't have an account? </span>
        <Link href='#' className='text-sm text-blue-500' prefetch={false}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
