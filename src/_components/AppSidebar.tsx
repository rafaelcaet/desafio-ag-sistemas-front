import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Link from "next/link";
import { ChartPieIcon, HomeIcon, ShieldIcon, Ticket, UsersIcon } from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  {
    label: "Home",
    icon: <HomeIcon size={24}/>,
    subItems: [],
    href: "/",
  },
  {
    label: "Auditoria",
    icon: <ShieldIcon size={24}/>,
    subItems: [],
    href: "/auditoria",
  },
  {
    label: "Usuários",
    icon: <UsersIcon size={24}/>,
    subItems: [],
    href: "/usuarios",
  },
  {
    label: "Indicações",
    icon: <Ticket size={24} />,
    subItems: [],
    href: "/indicacoes",
  },
  {
    label: "Dashboard",
    icon: <ChartPieIcon size={24} />,
    href: "/dashboard",
  },
  // {
  //   icon: <Ticket size={24} />,
  //   label: "Indicações a pagar",
  //   subItems: [
  //     { label: "Indicadores a pagar", href: "/payment" },
  //     { label: "Indicações Agrupadas", href: "/payment/group" },
  //   ],
  // },
];

const SidebarItem = ({ label, icon, href }: { label: string, icon: React.ReactNode, href: string }) => {
  return (
    <Link href={href}>
      <div className="flex items-center text-[#13679F] justify-start
       rounded-md hover:bg-[#13679F] py-2 px-1 hover:text-slate-100 gap-6"
       title={label}>
        <span className="w-6 h-6">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="border" variant="sidebar" collapsible="icon">
      <SidebarHeader className="bg-slate-100" >
        <Image
          src="/logo.png"
          alt="Logo"
          width={200}
          height={200}
        />
      </SidebarHeader>
      <SidebarContent className="bg-slate-100">
        <SidebarGroup>
          {sidebarItems.map((item) =>
            item.href ? (
              <SidebarItem key={item.href} {...item} />
            ) : item?.subItems ? (
              <div key={item.label}>
                <div className="flex items-center text-[#13679F] justify-start
                    rounded-md py-2 px-1 gap-6">
                  <span className="w-6 h-6">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="pl-4">
                  {item.subItems.map((subItem:any) => (
                    <SidebarItem key={subItem.href} label={subItem.label} icon={null} href={subItem.href} />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}