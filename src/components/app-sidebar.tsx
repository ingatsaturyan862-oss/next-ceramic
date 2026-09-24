/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CommandIcon } from "lucide-react";
import {
  ChartBarIcon,
  LayoutDashboardIcon,
  ListIcon,
} from "lucide-react";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Contact",
      url: "/dashboard/contact",
      icon: <ListIcon />,
    },
    {
      title: "Shop",
      url: "/dashboard/shop",
      icon: <ChartBarIcon />,
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Next Ceramic</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};
