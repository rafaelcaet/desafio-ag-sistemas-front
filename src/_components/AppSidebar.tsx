import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Link from "next/link";
import { ChartPieIcon, GroupIcon, HomeIcon, UsersIcon } from "lucide-react";

const sidebarItems = [
  {
    label: "Home",
    icon: <HomeIcon size={24}/>,
    href: "/",
  },
  {
    label: "Usuários",
    icon: <UsersIcon size={24}/>,
    href: "/users",
  },
  {
    label: "Dashboard",
    icon: <ChartPieIcon size={24} />,
    href: "/dashboard",
  },
];

const SidebarItem = ({ label, icon, href }: { label: string, icon: React.ReactNode, href: string }) => {
  return (
    <Link href={href}>
      <div className="flex items-center text-[#13679F] justify-start
       rounded-md hover:bg-[#13679F] py-2 px-1 hover:text-slate-100 gap-6"
       title={label}>
        <span>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};
export function AppSidebar() {
  return (
    <Sidebar className="border" variant="sidebar" collapsible="icon">
      <SidebarContent className="bg-slate-100">
        <SidebarGroup>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item}/>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}