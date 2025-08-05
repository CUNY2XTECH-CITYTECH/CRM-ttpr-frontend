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
        school: "",
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
    return (
      <Layout>
        <Topbar title="Student Application Form" mode="form" />
        <div className="w-[80%] m-auto py-4">
          <Form {...studentForm}>
            <form onSubmit={studentForm.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                    control={studentForm.control}
                    name="school"                                               
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>School</FormLabel>
                        <FormControl>
                            <Input placeholder="School" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                    control={studentForm.control}   
                    name="graduationYear"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Graduation Year</FormLabel>  
                        <FormControl>
                            <Input placeholder="Graduation Year" {...field} />
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
                            <Input type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div> 
                <div className="grid grid-cols-2 gap-2">
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </Layout>
    );
}
