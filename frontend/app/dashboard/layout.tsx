"use client"

import { ReactNode, createContext, useContext, useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-side-bar"
import { Toaster } from "@/components/ui/toast"
import AdminDashboard from "./admin/page"
import StudentDashboard from "./student/page"


type UserRole = "admin" | "student"
interface UserContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}
const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("admin") 

  return (
    <UserContext.Provider value={{ role, setRole }}>
      <SidebarProvider>
        <AppSidebar role={role} />
        
          <header className="flex items-center p-4">
            <SidebarTrigger />
          </header>
          <main className="px-6 w-full min-h-screen bg-white">
            {role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </UserContext.Provider>
    )
}