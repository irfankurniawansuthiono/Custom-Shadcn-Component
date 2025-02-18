"use client";
import { MessageCircle} from "lucide-react"
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import CustomAiDeleteById from "../../CustomAiDeleteById";

export default function CustomAiNavMain({
  items, currentPath
}: {items?: {title:string, href:string}[], currentPath: string}) {
  return (
    <SidebarGroup>
      <SidebarMenu >
        {items && items.map((item) => (
            <Link key={item.title} href={item.href}>
            <SidebarMenuButton key={item.title}  className="flex items-center justify-around group">
            {currentPath !== item.title.toLowerCase() ? <MessageCircle/> : <MessageCircle color={"hsl(var(--sidebar-ring))"}/>}
                <span className={cn(currentPath === item.title.toLowerCase() && "text-sidebar-ring font-bold")}>{item.title}</span> 
                <CustomAiDeleteById id={item.title} className="group-hover:opacity-100 opacity-0 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
            </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
