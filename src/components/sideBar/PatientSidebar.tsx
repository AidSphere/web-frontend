'use client';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { data } from '@/components/sideBar/navData/patientNavData';
import { UserDetailsType } from './types/userDetailsType';
import { NavUser } from './nav-user';

/**
 * sidebar has two type of navitems ---> single nav items , nav items with sub menu items
 */

export function PatientSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: UserDetailsType;
}) {
  /**
   * get pageName when sidebar is rendered first time.(replace '-' in path with ' ' when the name has more than 1 words)
   * set the pageName to find active navigation name in the sidebar.
   */
  const pageName = usePathname().split('/')[2]?.replaceAll('-', ' ');
  const [activeNavName, setActiveNavName] = useState(
    pageName !== undefined ? pageName : 'Overview'
  );
  const { state } = useSidebar();
  const navData = data;
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {state === 'expanded' ? (
          <div className='m-auto mt-2 flex flex-row gap-2 font-bold'>
            <span>
              <Image
                src={'/images/logo.png'}
                width={24}
                height={24}
                priority
                alt='aidsphere logo'
              />
            </span>
            AidSphere
          </div>
        ) : (
          <div className='ml-1 mt-2 flex flex-row items-center gap-2'>
            <span>
              <Image
                src={'/images/logo.png'}
                width={25}
                height={25}
                priority
                alt='aidsphere logo'
              />
            </span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <div className='mt-0'></div>
        <SidebarGroup>
          <SidebarMenu>
            {navData.map((item) =>
              item.type === 'sub' ? ( // <-- Type-based check
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.name}
                            onClick={() => setActiveNavName(subItem.name)}
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                subItem.name.toLowerCase() ===
                                activeNavName?.toLowerCase()
                              }
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem
                  key={item.name}
                  onClick={() => setActiveNavName(item.name)}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.name.toLowerCase() === activeNavName?.toLowerCase()
                    }
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
