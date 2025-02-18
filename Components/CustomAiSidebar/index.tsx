"use client";
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import CustomAiNavMain  from "./CustomAiNavMain"
import DeleteAiChatHistoryButton from "../DeleteAllChat";
import { routesList } from "@/app/routes";

export default function CustomAiSidebar({navItems, basePath=routesList.ai, ...props }: {
  navItems: {
    title: string;
    href: string;
}[], basePath?: string} & React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname()
  const currentPath = pathName?.split("/")[pathName.split("/").length-1]
  
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row justify-between">
        <Link href={basePath || '/'} className="line-clamp-1">
          <h1 className="font-bold font-mono text-2xl">NanamiGPT v1</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between pb-10">
        <CustomAiNavMain items={navItems} currentPath={currentPath} />
        <div className="flex justify-center">
            <DeleteAiChatHistoryButton />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
