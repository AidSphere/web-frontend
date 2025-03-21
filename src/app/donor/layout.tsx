import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import TopNavBar from '@/components/navBarTopRight';
import { Separator } from '@radix-ui/react-separator';
import DynamicBreadcrumb from '@/components/dynamicBreadcrumb';
import { UserDetailsType } from '@/components/sideBar/types/userDetailsType';
import { DonerSidebar } from '@/components/sideBar/DonerSidebar';

const user: UserDetailsType = {
  name: 'ushan',
  email: 'u@example.com',
  Image: '',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DonerSidebar userData={user} />
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
