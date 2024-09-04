import {
  Home,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Toaster } from "sonner";

const sidebars = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    href: "/order",
  },
  {
    name: "Products",
    icon: Package,
    href: "/products",
  },
  {
    name: "Users2",
    icon: Users2,
    href: "/customers",
  },
  {
    name: "Types",
    icon: Users2,
    href: "/types",
  },
];

export const Layout = memo(() => {
  const location = useLocation();
  const breadcrumbs = location.pathname
    .split("/")
    .filter((path) => path && isNaN(Number(path)));
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <a
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <TooltipProvider>
              {sidebars.map(({ name, href, icon: IconComponent }, index) => {
                const isActive = location.pathname.startsWith(href);
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={href}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                          { "bg-accent": isActive }
                        )}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="sr-only">{name}</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">{name}</TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <SheetHeader className="">
                    <SheetTitle>
                      {" "}
                      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    </SheetTitle>
                    <SheetDescription>Acme Inc</SheetDescription>
                  </SheetHeader>
                  {sidebars.map(
                    ({ name, href, icon: IconComponent }, index) => {
                      const isActive = location.pathname.startsWith(href);
                      return (
                        <NavLink
                          key={index}
                          to={href}
                          className={cn(
                            "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                            { "text-foreground": isActive }
                          )}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{name}</span>
                        </NavLink>
                      );
                    }
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    {index !== 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {breadcrumbs.length - 1 === index ? (
                        <BreadcrumbPage className="capitalize">
                          {breadcrumb}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={`/${breadcrumb}`} className="capitalize">
                            {breadcrumb}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              /> */}
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
      {/* package declare */}
      <Toaster />
    </>
  );
});
