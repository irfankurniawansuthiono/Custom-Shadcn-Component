import { ChevronRight} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { NavGroup } from "@/config"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"

export async function NavMain({
  items, currentPath
}: {items: NavGroup[], currentPath: string}) {
  const nextHeaders =  await headers()
  const basePath = nextHeaders.get("x-full-pathname")
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={basePath?.split("/").includes(item.id)}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span className="font-semibold text-nowrap">{item.title}</span> 
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={currentPath === subItem.title.toLowerCase()}>
                        <a href={subItem.url}>
                          {subItem.icon && currentPath !== subItem.title.toLowerCase() ? <subItem.icon/> : subItem.icon && <subItem.icon color={"hsl(var(--sidebar-ring))"}/>}
                          <span className={cn(currentPath === subItem.title.toLowerCase() && "text-sidebar-ring font-bold")} >{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
