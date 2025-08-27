import React from "react";
import { Header } from "./header";
import { AppSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function Layout({ children,user}) {
  return (
    <SidebarProvider >

      <AppSidebar role={user.role} />
      <main className="w-full box-border">
        <Header CloseSidebar={<SidebarTrigger />} currentUser={user} role={"staff"} />
        {/* <SidebarTrigger /> */}
        <div className="px-12 py-4 ">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default Layout
