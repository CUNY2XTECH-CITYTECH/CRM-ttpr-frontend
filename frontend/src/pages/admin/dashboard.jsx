import React, { useEffect,useState } from 'react'
import { Header } from '@/components/header'
import { useNavigate } from 'react-router'
import { useAuth } from '@/lib/dataContext'
import { Card, CardContent, CardHeader, CardTitle,CardDescription} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Users, Building2, GraduationCap, Briefcase, Bell, Calendar, TrendingUp, UserCheck, Clock } from "lucide-react"
import Layout from '@/components/layout'

// Mock data
const statsData = [
  { name: "Staff", value: 45, icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
  { name: "Students", value: 1247, icon: GraduationCap, color: "text-green-600", bgColor: "bg-green-50" },
  { name: "Companies", value: 89, icon: Building2, color: "text-purple-600", bgColor: "bg-purple-50" },
  { name: "Internships", value: 324, icon: Briefcase, color: "text-orange-600", bgColor: "bg-orange-50" },
]

const internshipData = [
  { month: "Jan", applied: 45, accepted: 32 },
  { month: "Feb", applied: 52, accepted: 38 },
  { month: "Mar", applied: 48, accepted: 35 },
  { month: "Apr", applied: 61, accepted: 44 },
  { month: "May", applied: 55, applied: 41 },
  { month: "Jun", applied: 67, accepted: 48 },
]

const departmentData = [
  { name: "Computer Science", students: 456, fill: "var(--color-chart-1)" },
  { name: "Engineering", students: 324, fill: "var(--color-chart-2)" },
  { name: "Business", students: 267, fill: "var(--color-chart-3)" },
  { name: "Design", students: 200, fill: "var(--color-chart-4)" },
]

const pendingApprovals = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Admin", department: "HR", time: "2 hours ago" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", role: "Admin", department: "IT", time: "4 hours ago" },
  { id: 3, name: "Emily Davis", email: "e.davis@email.com", role: "Admin", department: "Finance", time: "1 day ago" },
]

const todayAppointments = [
  { id: 1, student: "Alex Thompson", company: "TechCorp", time: "10:00 AM", type: "Interview" },
  { id: 2, student: "Maria Garcia", company: "StartupXYZ", time: "2:00 PM", type: "Meeting" },
  { id: 3, student: "James Wilson", company: "InnovateLab", time: "4:30 PM", type: "Interview" },
]
export default function Dashboard() {
  const { token, currentUser } = useAuth()
  const navigate = useNavigate()
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const handleApproval = (id, action) => {
    console.log(`${action} approval for ID: ${id}`)
    // Handle approval logic here
  }
  useEffect(() => {
    console.log(currentUser, 'cu')
    if (currentUser && currentUser.role !== 'admin') {
      navigate('/not-authorized')
    }
    if (!token) {
      navigate('/login')
    }
  }, [token])


  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <div className="w-[80%] m-auto py-4">
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Welcome back, manage your CRM platform</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Today
                  </Button>
                  <div className="relative">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingApprovals.length}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <Card key={stat.name} className="relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                          </div>
                          <div className={`p-3 rounded-full ${stat.bgColor}`}>
                            <Icon className={`h-6 w-6 ${stat.color}`} />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">+12%</span>
                          <span className="text-gray-600 ml-1">from last month</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Internship Applications Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Internship Applications</CardTitle>
                    <CardDescription>Monthly applications vs acceptances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        applied: {
                          label: "Applied",
                          color: "hsl(var(--chart-1))",
                        },
                        accepted: {
                          label: "Accepted",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px]"
                    >
                        <BarChart data={internshipData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="applied" fill="var(--color-chart-1)" radius={4} />
                          <Bar dataKey="accepted" fill="var(--color-chart-2)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Department Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Students by Department</CardTitle>
                    <CardDescription>Current enrollment distribution</CardDescription>
                  </CardHeader>
                  <CardContent className={'w-full'}>
                    <ChartContainer
                      config={{
                        students: {
                          label: "Students",
                        },
                      }}
                      className="h-[200px] max-w-[200px]"
                    >
                        <PieChart>
                          <Pie data={departmentData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="students">
                            {departmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                    </ChartContainer>
                    <div className="mt-4 space-y-2">
                      {departmentData.map((dept, index) => (
                        <div key={dept.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dept.fill }} />
                            <span className="text-gray-600">{dept.name}</span>
                          </div>
                          <span className="font-medium">{dept.students}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Approvals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCheck className="h-5 w-5 mr-2" />
                      Pending Admin Approvals
                    </CardTitle>
                    <CardDescription>Registration requests awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${approval.name}`} />
                            <AvatarFallback>
                              {approval.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{approval.name}</p>
                            <p className="text-sm text-gray-600">{approval.email}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="secondary" className="text-xs mr-2">
                                {approval.role}
                              </Badge>
                              <span className="text-xs text-gray-500">{approval.department}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{approval.time}</span>
                          <Button size="sm" variant="outline" onClick={() => handleApproval(approval.id, "reject")}>
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApproval(approval.id, "approve")}>
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Today's Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Today's Appointments
                    </CardTitle>
                    <CardDescription>Scheduled meetings and interviews</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todayAppointments.map((appointment, index) => (
                      <div key={appointment.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex flex-col items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {index < todayAppointments.length - 1 && <div className="w-px h-12 bg-gray-200 mt-2"></div>}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.student}</p>
                              <p className="text-sm text-gray-600">{appointment.company}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {appointment.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{appointment.time}</p>
                          </div>
                        </div>
                        {index < todayAppointments.length - 1 && <div className="mt-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Users className="h-6 w-6 mb-2" />
                      Manage Staff
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <GraduationCap className="h-6 w-6 mb-2" />
                      View Students
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Building2 className="h-6 w-6 mb-2" />
                      Add Company
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <Briefcase className="h-6 w-6 mb-2" />
                      Post Internship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </Layout>
      ) : (
        <div></div>
      )}
    </>
  )
}


