import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  Briefcase, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRegisterationForm } from "@/lib/validations";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { useClient } from "@/lib/dataContext";
import toast from "react-hot-toast";



export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { client } = useClient();
  const registerForm = useForm({
    resolver: yupResolver(validateRegisterationForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      id: "",
      role: "",
    },
  });

  const onSubmit = async (e) => {
    const { confirmPassword, ...submittedData } = e
    if (e) {
      // used http method from utils/http-method.js
      let res = await client.user.create(submittedData)
      // if registeration successed
      if (res.status == 200) {
        toast.success("successfully registered")
        if (res.data.role === "admin" && res.data.verified === false) {
          navigate("/admin/waiting");
        } else {
          navigate("/login");
        }
      } else if (res.status == 201) {
        navigate("/account-exists");
      } else {
        navigate("/error");
      }
    }
  };
  const onError = (e) => {
    console.log("error", e);
  };

  return (
    <div className="bg-background w-full h-screen text-blue-500 text-bold text-lg text-center p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white border-0">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Register Your Account
          </CardTitle>
          <CardDescription>Create your account in citytech CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit, onError)}
              className="grid space-y-6"
            >
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={"relative"}>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage className={" text-xs py-0  text-start"} />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={"relative"}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage className={" text-xs py-0   text-start  "} />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={registerForm.control}
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

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword? (
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


              <FormField
                control={registerForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem className={"relative"}>
                    <FormLabel>EmpID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your EmpID or Student ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={" text-xs py-0   text-start    "} />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem className={"relative"}>
                    <FormLabel>Choose Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="User Role" {...field} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage
                      className={" text-xs py-0 mr-auto  text-start"}
                    />
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="w-full cursor-pointer">
                Register Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
