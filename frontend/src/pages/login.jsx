import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { validateLoginForm } from "@/lib/validations"
import { FormField, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useClient } from "@/lib/dataContext"

export default function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const { client } = useClient()

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
      if (res.status === 200) {
        console.log(res.data.message, 'msg')
        toast.success("Logged in successfully")
        if (res.data?.message?.role === 'admin') {
          navigate('/admin')
        }
        else {
          if (res.data?.message?.is_first_login) {
            navigate('/onboard')
          }
          else {
            navigate('/')
          }
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
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs py-0 text-start" />
                    </FormItem>
                  )}
                />


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


