import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  LayoutDashboard,
  Inbox,
  Search,
  Settings,
  Building2,
  Rows4,
  Users,
} from "lucide-react";

import React from "react";
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    url: "#",
    icon: Building2,
  },
  {
    title: "Internships",
    url: "#",
    icon: Rows4,
  },
  {
    title: "Staffs",
    url: "#",
    icon: Users,
  },

  {
    title: "Students",
    url: "#",
    icon: Users,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Appointments",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className={"bg-primary"}>
      <SidebarContent>
        <SidebarGroup className={"px-4 py-2"}>
          <SidebarGroupLabel className={"font-bold text-lg mb-2 mt-2 text-primary"}>
            CitytechCRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
