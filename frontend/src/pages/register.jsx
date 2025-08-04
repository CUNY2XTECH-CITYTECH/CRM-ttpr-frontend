import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase } from "lucide-react"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateRegisterationForm } from '@/lib/validations'
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';

export default function Register() {
  const registerForm = useForm({
    resolver: yupResolver(validateRegisterationForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      empId: "",
      role: "",

    }
  })
  const onSubmit = async (e) => {
    console.log("hello", e)
    if (e) {
      await fetch('http://localhost:8080/api/user/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        e).then(res => console.log(res)).then(err => console.log(err))
    }
  }
  const onError = (e) => {

    console.log("error", e)
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

          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit, onError)} className='grid space-y-6'>
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage className={' text-xs py-0  text-start'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className={' text-xs py-0   text-start  '} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage className={' text-xs py-0  text-start'} />
                  </FormItem>
                )}
              >
              </FormField>

              <FormField
                control={registerForm.control}
                name="empId"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>EmpID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your EmpID or Student ID" {...field} />
                    </FormControl>
                    <FormMessage className={' text-xs py-0   text-start    '} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Choose Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="User Role" {...field} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student" >Student</SelectItem>
                          <SelectItem value="staff" >Staff</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className={' text-xs py-0 mr-auto  text-start'} />
                  </FormItem>
                )}
              >
              </FormField>

              <Button type="submit" className="w-full cursor-pointer">
                Register Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}
