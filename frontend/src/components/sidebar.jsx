import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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
  LayoutDashboard,
  Settings,
  Building2,
  Rows4,
  Users,
  Handshake, CalendarDays, Server,
  BuildingIcon
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React from "react";
import { Link } from "react-router";
const studentItems = [
  {
    title: "Internships",
    url: "/internships",
    childLinks: null,
    icon: Handshake,
  },
  {
    title: "Calendar",
    url: "/coming-soon",
    childLinks: null,
    icon: CalendarDays,
  },
  {
    title: "Techstacks",
    url: "/coming-soon",
    childLinks: null,
    icon: Server,
  },
  {
    title: "Profile",
    url: "/profile",
    childLinks: null,
    icon: Settings,
  },
];
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    childLinks: null,
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    url: "#",
    childLinks: [
      {
        title: "create companies",
        url: "/admin/create-companies",
      }
      ,
      {
        title: "view companies",
        url: "/admin/view-companies",
      }

    ],
    icon: Building2,
  },
  {
    title: "Internships",
    url: "#",
    childLinks: [{
      title: "create internships",
      url: "/admin/create-internships",
    }
      ,
    {
      title: "view internships",
      url: "/admin/view-internships",
    }],
    icon: Rows4,
  },
  {
    title: "Departments",
    url: "#",
    childLinks: [{
      title: "create departments",
      url: "/admin/create-departments",
    }
      ,
    {
      title: "view departments",
      url: "/admin/view-departments",
    }],
    icon: BuildingIcon,
  },

  {
    title: "Staffs",
    url: "#",
    childLinks: [{
      title: "create staffs",
      url: "/admin/create-staffs",
    }
      ,
    {
      title: "view staffs",
      url: "/admin/view-staffs",
    }],
    icon: Users,
  },

  {
    title: "Students",
    url: "/admin/view-students",
    childLinks: null,
    icon: Users,
  },
  {
    title: "Calendar",
    url: "#",
    childLinks: null,
    icon: Calendar,
  },
  {
    title: "Appointments",
    url: "#",
    childLinks: [{
      title: "create appointments",
      url: "/admin/create-appointments",
    }
      ,
    {
      title: "view appointments",
      url: "/admin/view-appointments",
    }],
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    childLinks: null,
    icon: Settings,
  },
];

export function AppSidebar({ role }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Sidebar className={"bg-primary"}>
      <SidebarContent>
        <SidebarGroup className={"px-8 py-3"}>
          <SidebarGroupLabel className={"font-bold text-lg mb-2 mt-2 text-primary"}>
            CitytechCRM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {role==='admin' ? (
              <SidebarMenu>
                {items.map((item, e) => (

                  <div key={e}>
                    {item.childLinks ?
                      <Collapsible className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              <a className="flex gap-2">
                                <item.icon className="w-4 h-4" />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub className={'mx-2'}>
                              {item.childLinks.map(cl =>
                                <SidebarMenuSubItem key={cl.url} className={'px-4 py-1 hover:bg-secondary rounded-sm '}>
                                  <Link className="flex gap-1" to={cl.url}>
                                    <span>{cl.title}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              )}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                      :
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url} className="flex gap-2">
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    }
                  </div>
                ))}

              </SidebarMenu>
            ) : (
              <SidebarMenu>
                {studentItems.map((item, e) => (

                  <div key={e}>
                    {item.childLinks ?
                      <Collapsible className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              <a className="flex gap-2">
                                <item.icon className="w-4 h-4" />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub className={'mx-2'}>
                              {item.childLinks.map(cl =>
                                <SidebarMenuSubItem key={cl.url} className={'px-4 py-1 hover:bg-secondary rounded-sm '}>
                                  <Link className="flex gap-1" to={cl.url}>
                                    <span>{cl.title}</span>
                                  </Link>
                                </SidebarMenuSubItem>
                              )}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                      :
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link to={item.url} className="flex gap-2">
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    }
                  </div>
                ))}

              </SidebarMenu>

            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
