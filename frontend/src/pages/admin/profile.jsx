import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { useNavigate } from "react-router";
import { useAuth, useClient } from "@/lib/dataContext";
import { useForm } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Save, X, Camera, User, Mail, Phone, Briefcase, Linkedin } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { validateAdminProfile } from "@/lib/validations";
import { yupResolver } from "@hookform/resolvers/yup";


const AdminProfile = () => {
  const POSITIONS = ["Director", "Teacher", "Teacher Assistant", "Department Head", "Coordinator", "Administrator"]
  const DEPARTMENTS = [
    "Mathematics", "Science", "English", "History", "Art",
    "Physical Education", "Music", "Computer Science", "Administration",
  ]
  const { currentUser, token } = useAuth();
  const { client } = useClient()
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);


  // LinkedIn URL regex

  const [isEditing, setIsEditing] = useState(false)

  const defaultValues = {
    name: currentUser?.name || "Username",
    email: currentUser?.email || "user@example.com",
    phone: currentUser?.phone || "+1 (xxx) xxx-xxxx",
    department: staff?.department || "Mathematics",
    position: staff?.position || "Director",
    linkedin: staff?.linkedin || "https://linkedin.com/in/example",
    profileImage: staff?.profileImage || "/placeholder.svg?height=120&width=120",
  };
  const form = useForm({
    resolver: yupResolver(validateAdminProfile),
    defaultValues,
  })

  const watchData = form.watch()

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        form.setValue("profileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (values) => {
    console.log("Saved data:", values)
    setIsEditing(false)
  }
  useEffect(() => {
    const loadData = async () => {
      console.log('sd', currentUser)
      if (currentUser && currentUser.role !== "admin") {
        navigate("/not-authorized");
      }
      if (!token) {
        navigate("/login");
      }
      let res = await client.admin().fetchOne()
      if (res.status === 200) {
        setStaff(res.data[0])
      }
    };
    loadData()
  }, [token, currentUser]);


  const [imagePreview, setImagePreview] = useState(null);
  const [localTime, setLocalTime] = useState("");

  // Update local time
  useEffect(() => {
    if (currentUser && currentUser.role !== "admin") {
      navigate("/login");
    }
    const updateTime = () => {
      setLocalTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setStaff((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  const handleSocialLinkChange = (index, value) => {
    const newSocialLinks = [...staff.socialLinks];
    newSocialLinks[index] = value;
    setStaff((prev) => ({
      ...prev,
      socialLinks: newSocialLinks,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Staff profile updated:", staff);
    alert("Profile updated successfully!");
  };
  console.log(staff, currentUser, 'sf')
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>


          <div className=" px-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>

                <h4 className='py-2 font-semibold uppercase'>Profile Management</h4>
                <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                Administrator</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Avatar Card */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src={currentUser.profileImage} />
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
                        <p className="text-blue-600 font-medium">{watchData.position}</p>
                        <p className="text-gray-500 text-sm">{watchData.department}</p>
                      </div>
                      <Separator />
                      <div className="w-full space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{currentUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{currentUser.phone}</span>
                        </div>
                        {currentUser.linkedin && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Linkedin className="w-4 h-4" />
                            <a href={currentUser.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Form Card */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">Profile Information</CardTitle>
                        <p className="text-gray-600 text-sm mt-1">Update your personal and professional details</p>
                      </div>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                          <Edit className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button type="submit" form="admin-form" className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                          </Button>
                          <Button onClick={() => { form.reset(defaultValues); setIsEditing(false) }} variant="outline" className="border-gray-300 bg-transparent">
                            <X className="w-4 h-4 mr-2" /> Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Form {...form}>
                      <form id="admin-form" onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
                        {/* Personal Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField name="name" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input {...field} disabled={!isEditing} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField name="email" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input type="email" {...field} disabled={!isEditing} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField name="phone" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl><Input type="tel" {...field} disabled={!isEditing} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField name="linkedin" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn Profile</FormLabel>
                                <FormControl><Input type="url" placeholder="https://linkedin.com/in/username" {...field} disabled={!isEditing} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </div>

                        <Separator />

                        {/* Professional Info */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField name="department" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Department</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {DEPARTMENTS.map((dept) => (
                                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField name="position" control={form.control} render={({ field }) => (
                              <FormItem>
                                <FormLabel>Position</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                                  <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {POSITIONS.map((pos) => (
                                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
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
      )
        : <div></div>}
    </>
  )
}
export default AdminProfile
