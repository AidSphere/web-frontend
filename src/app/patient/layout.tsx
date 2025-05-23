import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { PatientSidebar } from '@/components/sideBar/PatientSidebar';
import TopNavBar from '@/components/navBarTopRight';
import { Separator } from '@radix-ui/react-separator';
import DynamicBreadcrumb from '@/components/dynamicBreadcrumb';
import { UserDetailsType } from '@/components/sideBar/types/userDetailsType';
import { Toaster } from '@/components/ui/toaster';

const user: UserDetailsType = {
  name: 'Kumari Perera',
  email: 'kumari.perera@gmail.com',
  Image:
    'https://res.cloudinary.com/duvfarjid/image/upload/v1746292730/profile-images/onovopi3tu2utyxc6tri.jpg',
};

export default function PatientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <PatientSidebar userData={user} />
      <SidebarInset className='dark:bg-background'>
        <header className='bg-accent flex h-16 shrink-0 items-center justify-between pr-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <DynamicBreadcrumb />
          </div>
          <TopNavBar />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {children}
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
