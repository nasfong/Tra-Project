import { Toaster } from "sonner";
import {
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { open } = useSidebar();
  return (
    <SidebarLayout defaultOpen={open}>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          <Outlet />
        </div>
      </main>
      <Toaster />
    </SidebarLayout>
  );
};
