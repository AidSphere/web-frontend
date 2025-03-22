/* eslint-disable tailwindcss/no-custom-classname */
"use client"
import 
{
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import TopNavBar from '@/components/navBarTopRight';
import { Separator } from '@radix-ui/react-separator';
import DynamicBreadcrumb from '@/components/dynamicBreadcrumb';
import { UserDetailsType } from '@/components/sideBar/types/userDetailsType';
import { usePathname } from 'next/navigation';
import { DrugImporterSidebar } from '@/components/sideBar/ImporterSidebar';

const user: UserDetailsType = {
  name: 'ushan',
  email: 'u@example.com',
  Image: '',
};

export default function DImporterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current path to check if we're on the register page
  const pathname = usePathname();
  
  // If we're on the register page, just render the children without the layout
  if (pathname === '/importer/register' || pathname === '/login') {
    return <>{children}</>;
  }

  // Otherwise, render the full layout
  return (
    <SidebarProvider>
      <DrugImporterSidebar userData={user} />
      <SidebarInset className='dark:bg-background'>
        <header className='bg-accent flex h-16 shrink-0 items-center justify-between pr-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <DynamicBreadcrumb />
          </div>
          <TopNavBar />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}