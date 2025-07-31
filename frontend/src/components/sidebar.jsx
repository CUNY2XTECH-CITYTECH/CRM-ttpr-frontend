import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
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
  ChevronDown
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


import React from "react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    childLinks: false,
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    url: "#",
    childLinks: true,
    icon: Building2,
  },
  {
    title: "Internships",
    url: "#",
    childLinks: true,
    icon: Rows4,
  },
  {
    title: "Staffs",
    url: "#",
    childLinks: true,
    icon: Users,
  },

  {
    title: "Students",
    url: "#",
    childLinks: false,
    icon: Users,
  },
  {
    title: "Calendar",
    url: "#",
    childLinks: false,
    icon: Calendar,
  },
  {
    title: "Appointments",
    url: "#",
    childLinks: true,
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    childLinks: false,
    icon: Settings,
  },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
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
