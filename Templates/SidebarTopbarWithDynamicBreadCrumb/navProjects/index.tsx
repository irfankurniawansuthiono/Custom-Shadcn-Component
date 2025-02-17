import {
    AppWindow,
    MoreHorizontal,
  } from "lucide-react"
  
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { projectsDataType } from "@/config"
  import Link from "next/link"
  import { routesList } from "@/app/routes"
  
  export async function NavProjects({
    projectsData,
  }: {
    projectsData: projectsDataType
  }) {
  
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Other Projects</SidebarGroupLabel>
        <SidebarMenu>
          {projectsData.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <AppWindow size={20}/>
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <Link  href={routesList.menu}>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <span>More</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }
  