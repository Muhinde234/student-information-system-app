"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, UserCircle2, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

type SidebarProps = {
  role: "admin" | "student"
  onLogout: () => void
}

const adminLinks = [
  { href: "/dashboard/admin", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
  { href: "/dashboard/admin/students", label: "Students", icon: <Users className="h-4 w-4" /> },
]

const studentLinks = [
  { href: "/dashboard/student", label: "Dashboard", icon: <Home className="h-4 w-4" /> },
  { href: "/dashboard/student/profile", label: "My Profile", icon: <UserCircle2 className="h-4 w-4" /> },
]

export function AppSidebar({ role, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const links = role === "admin" ? adminLinks : studentLinks

  const handleLogout = () => {
    onLogout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
    })
  }

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarContent className="flex flex-col min-h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
                    tooltip={link.label}
                  >
                    <Link href={link.href}>
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Logout Option */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip="Log Out"
                  className="flex items-center w-full px-3 py-2 text-left rounded-md hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}