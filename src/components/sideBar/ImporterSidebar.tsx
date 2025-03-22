'use client';
import { useEffect, useState } from 'react';
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
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { UserDetailsType } from './types/userDetailsType';
import { NavUser } from './nav-user';
import { useTheme } from 'next-themes';
import data from './navData/importerNavData';

/**
 * Sidebar for Drug Importer with navigation items:
 * - Dashboard
 * - Bill Requests
 * - Quotations
 * - Medicines
 */

export function DrugImporterSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  userData: UserDetailsType;
}) {
  // Get the current theme
  const { theme } = useTheme();
  
  // Get pageName when sidebar is rendered first time
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const pageName = pathSegments.length > 2 ? pathSegments[2]?.replaceAll('-', ' ') : undefined;
  
  // State for active navigation item
  const [activeNavName, setActiveNavName] = useState<string>(
    pageName !== undefined ? pageName : 'Dashboard'
  );
  
  // Update active nav name when pathname changes
  useEffect(() => {
    if (pageName !== undefined) {
      setActiveNavName(pageName);
    }
  }, [pathname, pageName]);
  
  const { state } = useSidebar();
  const navData = data;
  
  // Determine logo path based on theme
  const logoPath = theme === 'dark' ? '/images/logo-dark.png' : '/images/logo.png';
  
  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border dark:bg-background/95"
      {...props}
    >
      <SidebarHeader className="border-b border-border/50 py-2">
        {state === 'expanded' ? (
          <div className="flex flex-row items-center justify-center gap-2 px-4 font-bold">
            <span>
              <Image
                src={logoPath}
                width={28}
                height={28}
                priority
                alt="MediPharm logo"
                className="h-7 w-7 object-contain"
              />
            </span>
            <span className="text-lg">MediPharm</span>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <span>
              <Image
                src={logoPath}
                width={28}
                height={28}
                priority
                alt="MediPharm logo"
                className="h-7 w-7 object-contain"
              />
            </span>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="px-1 py-2">
        <SidebarGroup>
          <SidebarMenu>
            {navData.map((item) =>
              item.type === 'sub' ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={
                    item.isActive || 
                    item.items.some(subItem => 
                      subItem.name.toLowerCase() === activeNavName?.toLowerCase()
                    )
                  }
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        tooltip={state === 'collapsed' ? item.title : undefined}
                        className="hover:bg-accent/80"
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                              className="transition-colors"
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
                    tooltip={state === 'collapsed' ? item.name : undefined}
                    className="hover:bg-accent/80"
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className="size-5" />}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 py-2">
        <NavUser user={userData}  />
      </SidebarFooter>
    </Sidebar>
  );
}