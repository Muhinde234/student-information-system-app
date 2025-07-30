"use client"

import { useState } from "react"
import { UserCircle2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/app/dashboard/layout"
import { useToast } from "@/components/ui/use-toast"


const initialProfile = {
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
  role: "student",
  course: "Computer Science",
  profilePicture: "",
}

export default function StudentDashboard() {
  const { role } = useUser()
  const { toast } = useToast()
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)

 
  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      variant: "success",
    })
   
  }

  if (role !== "student") {
    return <div>Access Denied</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="bg-[#f0f4f4] p-6 rounded-lg shadow max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <UserCircle2 className="h-12 w-12" />
          <h2 className="text-xl font-semibold">{profile.fullName}</h2>
        </div>
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              value={profile.phoneNumber}
              onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Course</label>
            <Input
              value={profile.course}
              onChange={(e) => setProfile({ ...profile, course: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Role</label>
            <Input value={profile.role} disabled />
          </div>
        </div>
        <div className="mt-4">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>
    </div>
  )
}