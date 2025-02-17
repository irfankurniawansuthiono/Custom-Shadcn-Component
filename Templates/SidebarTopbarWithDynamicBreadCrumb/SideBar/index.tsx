import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar";
  import { AppSidebar as SideBar } from "@/components/app-sidebar";
  import { Separator } from "@/components/ui/separator";
  import DynamicBreadcrumb from "@/components/DynamicBreadCrumb";
  import SignoutButton from "@/components/SignoutButton";
  import React from "react";
  export default async function PixelfolioLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    
    return (
      <SidebarProvider>
        <SideBar projectId="pixelfolio" />
        <SidebarInset className="w-full">
          <header className="sticky z-[2] top-0 bg-white flex w-full h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-2 border-gray-200">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex justify-between w-full items-center">
                <DynamicBreadcrumb />
                <div className="ml-2">
                  <SignoutButton />
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  