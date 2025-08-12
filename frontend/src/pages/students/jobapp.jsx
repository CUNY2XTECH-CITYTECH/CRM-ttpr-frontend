import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateStudentForm } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 👇 fallback mock data
const fallbackMockJob = {
  title: "Default Internship Title",
  location: "Unknown",
  arrangement: "Remote",
  salary: "$0/month",
  posted: "N/A",
  description: "This is placeholder data shown because the backend fetch did not return anything.",
};

export default function StudentForm() {
  const { id } = useParams();
  const location = useLocation();

  const passedJob = location.state?.job;

  const [internship, setInternship] = useState(passedJob || null);

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
      description: "",

    },
  });

  const onSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  useEffect(() => {
    // Skip fetch if job is already passed from location
    if (passedJob) return;

    if (id) {
      fetch(`http://localhost:5000/api/jobs/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Network response not ok");
          return res.json();
        })
        .then(data => {
          if (!data || Object.keys(data).length === 0) {
            throw new Error("Empty job data");
          }
          setInternship(data);
        })
        .catch(err => {
          console.error("Fetch failed or no data, using fallback:", err);
          setInternship(fallbackMockJob); // 👈 fallback to mock job
        });
    } else {
      setInternship(fallbackMockJob); // 👈 fallback if no ID at all
    }
  }, [id, passedJob]);

  if (!internship) return <p>Loading job details...</p>;

  return (
    <Layout>
      <Topbar title="Student Application Form" mode="form" />
      <div className="flex flex-col lg:flex-row w-[90%] m-auto py-4 gap-20">
        <div className="lg:w-1/2 w-full bg-white px-2">
          <h1 className="text-xl md:text-2xl font-bold mb-2">{internship.title}</h1>
          <div className="text-sm md:text-base text-gray-600 mb-4 space-y-1">
            <div>📍 {internship.location}</div>
            <div>🕒 {internship.arrangement}</div>
            <div>💰 {internship.salary}</div>
            <div>📅 Posted: {internship.posted}</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{internship.description}</p>
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