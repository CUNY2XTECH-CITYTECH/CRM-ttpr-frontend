import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase } from "lucide-react"

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    department: "",
    role: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='bg-background w-full h-screen text-blue-500 text-bold text-lg text-center p-4 flex items-center justify-center'>
      <Card className="w-full max-w-md bg-white border-0">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Registration</CardTitle>
          <CardDescription>Create your administrator account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder="Enter your department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({...prev, role: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecturer">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Lecturer
                    </div>
                  </SelectItem>
                  <SelectItem value="coordinator">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Coordinator
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Administrator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Register Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}