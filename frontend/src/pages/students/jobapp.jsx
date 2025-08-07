import React from 'react'
import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import {
  FormField, FormControl, FormLabel, FormItem, FormMessage, Form
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateStudentForm } from '@/lib/validations';
import { Button } from '@/components/ui/button';

export default function StudentForm() {
  const studentForm = useForm({
    resolver: yupResolver(validateStudentForm),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      phoneNumber: "",
      age: "",
      DOB: "",
      address: "",
      studentId: "",
      graduationYear: "",
      resume: "",
      LinkedIn: "",
      GitHub: "",
      skills: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  const internship = {
    title: "",
    locations: [],
    workType: "",
    employmentType: "",
    salary: "",
    startDate: "",
    deadline: "",
    company: {
      name: "",
      industry: "",
      logo: "",
    },
    description: [],
  };

  return (
    <Layout>
      <Topbar title="Student Application Form" mode="form" />
      <div className="flex flex-col lg:flex-row w-[90%] m-auto py-4 gap-20">
        <div className="lg:w-1/2 w-full bg-white px-2">
          <h1 className="text-xl md:text-2xl font-bold mb-2">{internship.title || "Job Title Placeholder"}</h1>
          <div className="text-sm md:text-base text-gray-600 mb-4 space-y-1">
            <div>📍 {internship.locations.length > 0 ? internship.locations.join(" • ") : "Location TBD"}</div>
            <div>🕒 {internship.workType || "Work Type"} • {internship.employmentType || "Employment Type"}</div>
            <div>💰 {internship.salary || "Salary Range"} • Start: {internship.startDate || "Start Date"}</div>
            <div>📅 Apply by: {internship.deadline || "Deadline TBD"}</div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={internship.company.logo || "/default-logo.png"}
              alt="Company Logo"
              className="w-12 h-12 rounded-full bg-gray-200"
            />
            <div>
              <p className="font-semibold">{internship.company.name || "Company Name"}</p>
              <p className="text-sm text-gray-500">{internship.company.industry || "Industry"}</p>
            </div>
          </div>

          {internship.description.length > 0 ? (
            internship.description.map((para, idx) => (
              <p key={idx} className="text-sm md:text-base text-gray-800 mt-2 leading-relaxed">{para}</p>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">Description</p>
          )}
        </div>
        <div className="hidden lg:block w-[1px] bg-gray-300" />
        <div className="block lg:hidden h-[1px] bg-gray-300 my-6" />
        <div className="lg:w-1/2 w-full px-2">
          <Form {...studentForm}>
            <form onSubmit={studentForm.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="DOB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Student ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume</FormLabel>
                      <FormControl>
                        <Input type="file" className="truncate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={studentForm.control}
                  name="LinkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn Profile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={studentForm.control}
                  name="GitHub"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="GitHub Profile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                <FormField
                  control={studentForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="Skills (comma separated)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
