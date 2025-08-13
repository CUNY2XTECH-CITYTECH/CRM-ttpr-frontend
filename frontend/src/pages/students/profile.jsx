import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import { useAuth } from '@/lib/dataContext';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Save,
  X,
  Camera,
  User,
  Mail,
  Phone,
  GraduationCap,
  Linkedin,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react"
import { validateStudentProfile } from '@/lib/validations';
const POSITIONS = [
  "Undergraduate Student",
  "Graduate Student",
  "PhD Candidate",
  "Research Assistant",
  "Teaching Assistant",
]

const DEPARTMENTS = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Psychology",
  "Economics",
  "Marketing",
  "Finance",
  "Data Science",
]

const COMMON_INTERESTS = [
  "Machine Learning",
  "Web Development",
  "Data Analysis",
  "Mobile Development",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
  "Software Engineering",
  "Product Management",
  "Digital Marketing",
  "Finance",
  "Consulting",
  "Research",
  "Entrepreneurship",
]

const COMMON_SKILLS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "SQL",
  "Java",
  "C++",
  "HTML/CSS",
  "Git",
  "AWS",
  "Docker",
  "MongoDB",
  "TypeScript",
  "Excel",
  "PowerBI",
  "Tableau",
  "Figma",
  "Adobe Creative Suite",
]



const StudentProfileUpdate = ({ userId }) => {
  const { currentUser, token } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [newInterest, setNewInterest] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const defaultValues = currentUser ? {
    name: currentUser?.name || "Username",
    email: currentUser?.email || "example@email.com",
    department: currentUser.department || "Computer Science",
    position: currentUser.position || "Undergraduate Student",
    linkedin: currentUser.linkedin || "",
    phone: currentUser.phone || "+1 (555) 123-4567",
    profileImage: currentUser.profileImage || "/placeholder.svg?height=120&width=120",
    interests: currentUser.interests || ["Machine Learning", "Web Development"],
    skills: currentUser.skills || ["JavaScript", "Python"],
    internshipsApplied: currentUser.internshipsApplied || 0,
    responsesReceived: currentUser.responsesReceived || 0,
  } : {
    name: "Username",
    email: "example@email.com",
    department: "Computer Science",
    position: "Undergraduate Student",
    linkedin: "",
    phone: "+1 (555) 123-4567",
    profileImage: "/placeholder.svg?height=120&width=120",
    interests: ["Machine Learning", "Web Development"],
    skills: ["JavaScript", "Python"],
    internshipsApplied: 0,
    responsesReceived: 0,
  };
  const form = useForm({
    resolver: yupResolver(validateStudentProfile),
    defaultValues: defaultValues
  })

  const { watch, setValue, reset } = form
  const formData = watch()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = (data) => {
    setIsEditing(false)
    // Here you would typically send data to your API
    console.log("Saved data:", data)
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setValue("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addInterest = (interest) => {
    if (interest && !formData.interests.includes(interest)) {
      setValue("interests", [...formData.interests, interest])
      setNewInterest("")
    }
  }

  const removeInterest = (interest) => {
    setValue("interests", formData.interests.filter((i) => i !== interest))
  }

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setValue("skills", [...formData.skills, skill])
      setNewSkill("")
    }
  }

  const removeSkill = (skill) => {
    setValue("skills", formData.skills.filter((s) => s !== skill))
  }

  const responseRate =
    formData.internshipsApplied > 0
      ? Math.round((formData.responsesReceived / formData.internshipsApplied) * 100)
      : 0


  useEffect(() => {
    if (currentUser && currentUser.role !== 'student') {
      navigate('/not-authorized')
    }
    if (!token) {
      navigate('/login')
    }

  }, [token]);
  console.log('cu',currentUser)
  return (
    <>
      {currentUser &&
        <Layout user={currentUser}>
          <div className="px-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
 
                <h4 className='py-2 font-semibold uppercase'>Profile Management</h4>
                <p className="text-gray-600 mt-1">Manage your academic and career information</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                Student
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src={formData.profileImage} />
                          <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                            {currentUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 shadow-lg">
                            <Camera className="w-3 h-3" />
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </label>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{currentUser.name}</h3>
                        <p className="text-blue-600 font-medium">{formData.position}</p>
                        <p className="text-gray-500 text-sm">{formData.department}</p>
                      </div>
                      <Separator />
                      <div className="w-full space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{currentUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{formData.phone}</span>
                        </div>
                        {formData.linkedin && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Linkedin className="w-4 h-4" />
                            <a
                              href={formData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline truncate"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 mt-4 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Internship Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Applications Sent</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {formData.internshipsApplied}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Responses Received</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {formData.responsesReceived}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Response Rate</span>
                        <Badge
                          variant="outline"
                          className={`${responseRate >= 50 ? "bg-green-50 text-green-700 border-green-200" : responseRate >= 25 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}
                        >
                          {responseRate}%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">Profile Information</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">Update your personal and academic details</p>
                      </div>
                      {!isEditing ? (
                        <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={form.handleSubmit(handleSave)} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button onClick={handleCancel} variant="outline" className="border-gray-300 bg-transparent">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input {...field} type="email" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input {...field} type="tel" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">LinkedIn Profile</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="url"
                                        placeholder="https://linkedin.com/in/username"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      {field.value ? (
                                        <a
                                          href={field.value}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm font-medium text-blue-600 hover:underline"
                                        >
                                          {field.value}
                                        </a>
                                      ) : (
                                        <p className="text-sm font-medium text-gray-500">Not provided</p>
                                      )}
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="department"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Department</FormLabel>
                                  {isEditing ? (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                          <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {DEPARTMENTS.map((dept) => (
                                          <SelectItem key={dept} value={dept}>
                                            {dept}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="position"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Academic Level</FormLabel>
                                  {isEditing ? (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                          <SelectValue placeholder="Select academic level" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {POSITIONS.map((pos) => (
                                          <SelectItem key={pos} value={pos}>
                                            {pos}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="internshipsApplied"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Internships Applied</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        min="0"
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                      />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="responsesReceived"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-medium text-gray-700">Responses Received</FormLabel>
                                  {isEditing ? (
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        min="0"
                                        max={formData.internshipsApplied}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                      />
                                    </FormControl>
                                  ) : (
                                    <div className="px-3 py-2 bg-gray-50 rounded-md border">
                                      <p className="text-sm font-medium text-gray-900">{field.value}</p>
                                    </div>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Interests</h3>
                          </div>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {formData.interests.map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                                >
                                  {interest}
                                  {isEditing && (
                                    <button
                                      onClick={() => removeInterest(interest)}
                                      className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                            {isEditing && (
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Add new interest..."
                                    value={newInterest}
                                    onChange={(e) => setNewInterest(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addInterest(newInterest)}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  <Button
                                    onClick={() => addInterest(newInterest)}
                                    variant="outline"
                                    className="border-gray-300"
                                  >
                                    Add
                                  </Button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {COMMON_INTERESTS.filter((interest) => !formData.interests.includes(interest)).map(
                                    (interest) => (
                                      <button
                                        key={interest}
                                        onClick={() => addInterest(interest)}
                                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                      >
                                        + {interest}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                          </div>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              {formData.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 hover:bg-green-200"
                                >
                                  {skill}
                                  {isEditing && (
                                    <button
                                      onClick={() => removeSkill(skill)}
                                      className="ml-2 text-green-600 hover:text-green-800"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  )}
                                </Badge>
                              ))}
                            </div>
                            {isEditing && (
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Add new skill..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addSkill(newSkill)}
                                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  <Button onClick={() => addSkill(newSkill)} variant="outline" className="border-gray-300">
                                    Add
                                  </Button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {COMMON_SKILLS.filter((skill) => !formData.skills.includes(skill)).map((skill) => (
                                    <button
                                      key={skill}
                                      onClick={() => addSkill(skill)}
                                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                    >
                                      + {skill}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

        </Layout>
      }
    </>
  );
};

export default StudentProfileUpdate;

