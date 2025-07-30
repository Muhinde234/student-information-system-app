"use client"

import { useState } from "react"
import { Users, Plus, Edit, Trash, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


const initialStudents = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Computer Science",
    enrollmentYear: 2023,
    status: "Active",
    role: "student",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    course: "Mathematics",
    enrollmentYear: 2022,
    status: "Graduated",
    role: "student",
  },
]

export default function AdminDashboard() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)

  
  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.status === "Active").length


  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  )

 
  const handleAddStudent = (newStudent: any) => {
    setStudents([...students, { ...newStudent, id: `${students.length + 1}` }])
    setIsAddOpen(false)
  }


  const handleDelete = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }


  const handleToggleRole = (id: string) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, role: student.role === "student" ? "admin" : "student" }
          : student
      )
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#f0f4f4] p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl">{totalStudents}</p>
        </div>
        <div className="bg-[#f0f4f4] p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Active Students</h2>
          <p className="text-2xl">{activeStudents}</p>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      {/* Student Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Enrollment Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.enrollmentYear}</TableCell>
              <TableCell>{student.status}</TableCell>
              <TableCell>{student.role}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleToggleRole(student.id)}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(student.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Student Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddStudent({
                name: formData.get("name"),
                email: formData.get("email"),
                course: formData.get("course"),
                enrollmentYear: Number(formData.get("enrollmentYear")),
                status: formData.get("status"),
                role: "student",
              })
            }}
          >
            <div className="grid gap-4 py-4">
              <Input name="name" placeholder="Name" required />
              <Input name="email" placeholder="Email" type="email" required />
              <Input name="course" placeholder="Course" required />
              <Input name="enrollmentYear" placeholder="Enrollment Year" type="number" required />
              <Input name="status" placeholder="Status" required />
            </div>
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}