"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const ITEMS_TO_DISPLAY = 1;

const BreadcrumbSkeleton = ({className}: {className?: string}) => {
  return (
      <Skeleton className={cn(className ? className : "h-6 w-[70%] md:w-[40%]")}/>
  );
};

const formatSegment = (text: string) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


const MobileDrawerContent = ({ 
  segments, 
  getHref 
}: { 
  segments: string[]; 
  getHref: (index: number) => string; 
}) => {
  return (
    <>
      <DrawerHeader className="text-left">
        <DrawerTitle>Navigate to</DrawerTitle>
        <DrawerDescription>Select a page to navigate to.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-1 px-4">
        {segments.slice(0, -1).map((segment, index) => (
          <BreadcrumbLink
            key={index}
            href={getHref(index)}
            className="py-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {formatSegment(segment)}
          </BreadcrumbLink>
        ))}
      </div>
      <DrawerFooter className="pt-4">
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};

const DesktopBreadcrumbs = ({
  segments, 
  getHref 
}: { 
  segments: string[]; 
  getHref: (index: number) => string; 
}) => {
  return segments.map((segment, index) => (
    <React.Fragment key={index}>
      <BreadcrumbSeparator />
      <BreadcrumbLink
        href={getHref(index)}
        className={`text-sm ${
          index === segments.length - 1
            ? "font-semibold text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {formatSegment(segment)}
      </BreadcrumbLink>
    </React.Fragment>
  ));
};

const DynamicBreadcrumb = () => {
  const [mounted, setMounted] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const pathSegments = pathname.split("/").filter(Boolean);

  const getHref = (index: number) => {
    return "/" + pathSegments.slice(0, index).join("/");
  };

  if(!mounted) return <BreadcrumbSkeleton/>
  return mounted &&  (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-sm font-medium">
              <Link href="/menu">Menu</Link>
            </BreadcrumbLink>
        </BreadcrumbItem>
        {mounted && !isDesktop && pathSegments.length >= ITEMS_TO_DISPLAY && (
          <BreadcrumbSeparator />
        )}

        {/* Main Content */}
        {pathSegments.length > ITEMS_TO_DISPLAY && (
          <BreadcrumbItem>
            {!isDesktop ? (
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger aria-label="Toggle Menu">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DrawerTrigger>
                <DrawerContent>
                  <MobileDrawerContent 
                    segments={pathSegments} 
                    getHref={getHref} 
                  />
                </DrawerContent>
              </Drawer>
            ) : (
              <DesktopBreadcrumbs 
                segments={pathSegments} 
                getHref={getHref} 
              />
            )}
          </BreadcrumbItem>
        )}

        {/* Mobile Last Segments */}
        {mounted && !isDesktop && pathSegments.length >= ITEMS_TO_DISPLAY && (
          pathSegments
            .slice(-ITEMS_TO_DISPLAY)
            .map((segment, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbLink  className={"text-sm font-semibold text-foreground"} href={getHref(pathSegments.length - 1)}>
                  {formatSegment(segment)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;