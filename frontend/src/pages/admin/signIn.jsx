import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Users, Briefcase } from "lucide-react"


export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("student")

  return (
     <div className='bg-background w-full h-screen text-blue-500 text-bold text-lg text-center p-4 flex items-center justify-center'>
      <Card className="w-full max-w-md bg-white border-0">
     <CardHeader className="text-center">
       {/* logo */}
       <div className="mx-auto mb-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
       </div>
       <CardTitle className="text-2xl font-bold">Admin Hub</CardTitle>
       <CardDescription>{isLogin ? "Sign in to your account" : "Create your account"}</CardDescription>
     </CardHeader>
     <CardContent>
       <form className="space-y-4">
         {!isLogin && (
           <div className="space-y-2">
             <Label htmlFor="name">Full Name</Label>
             <Input
               id="name"
               type="text"
               placeholder="Enter your full name"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required={!isLogin}
             />
           </div>
         )}

         <div className="space-y-2">
           <Label htmlFor="email">Email</Label>
           <Input
             id="email"
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>

         <div className="space-y-2">
           <Label htmlFor="password">Password</Label>
           <Input
             id="password"
             type="password"
             placeholder="Enter your password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
           />
         </div>

         {!isLogin && (
           <div className="space-y-2">
             <Label htmlFor="role">I am a</Label>
             <Select value={role} onValueChange={(value) => setRole(value)}>
               <SelectTrigger>
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="student">
                   <div className="flex items-center gap-2">
                     <GraduationCap className="w-4 h-4" />
                     Student
                   </div>
                 </SelectItem>
                 <SelectItem value="staff">
                   <div className="flex items-center gap-2">
                     <Users className="w-4 h-4" />
                     Staff Member
                   </div>
                 </SelectItem>
               </SelectContent>
             </Select>
           </div>
         )}

         <Button type="submit" className="w-full">
           {isLogin ? "Sign In" : "Create Account"}
         </Button>
       </form>

       <div className="mt-4 text-center">
         <button
           type="button"
           onClick={() => setIsLogin(!isLogin)}
           className="text-sm text-blue-600 hover:underline"
         >
           {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
         </button>
       </div>
     </CardContent>
   </Card>
   </div>
  )
}


