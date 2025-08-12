import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, Briefcase } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validateLoginForm } from "@/lib/validations"
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useCookies } from "react-cookie"
import { useAuth,useClient} from "@/lib/dataContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { token,currentUser} = useAuth()
  const {client} = useClient()

  const loginForm = useForm({
    resolver: yupResolver(validateLoginForm),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const onSubmit = async (e) => {
    try {
      let res = await client.auth.login(e, { credentials: 'include' })
      console.log('response',res)
      if (res.status === 200) {
        console.log(res.data.message,'msg')
        toast.success("Logged in successfully")
        if (res.data?.message?.role === 'admin') {
          navigate('/admin')
        }
        else {
          navigate('/')
        }
      }
      else {
        toast.error(res.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onError = (e) => {
    console.log(e, 'error')
  }
  return (
    <div className='bg-background w-full h-screen text-blue-500 text-bold text-lg text-center p-4 flex items-center justify-center'>
      <Card className="w-full max-w-md bg-white border-0">
        <CardHeader className="text-center">
          {/* logo */}
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          </div>
          <CardTitle className="text-2xl font-bold">Citytech CRM</CardTitle>
          <CardDescription>Log in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit, onError)} className='grid space-y-6'>
              <div className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={'relative'}>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage className={' text-xs py-0  text-start'} />
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={loginForm.control}
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
                <Button type="submit" className="w-full">
                  Log In</Button>

              </div>
            </form>
          </Form>
          <div className="mt-4 flex gap-2 justify-center items-center">
            <span className="text-sm ">
              Don't have an account?
            </span>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              <a href="/register">
                Register Account </a>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


