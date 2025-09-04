import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { GraduationCap, Users, Briefcase } from "lucide-react";
import Layout from "../../components/layout";
import { validateInterest } from "@/lib/validations";

export default function InterestForm() {
  const [view, setView] = useState("create");
    const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const interestForm = useForm({
    resolver: yupResolver(validateInterest),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Interest Data:", values);
  };
 useEffect(() => {
    if (currentUser && currentUser?.role !== "admin") {
      navigate("/not-authorized");
    }
    if(!token){
        navigate('/login') 
    }

  }, [token]);
  return (
    <>
    { currentUser && 
    <Layout user={currentUser}>
      <Topbar
        view={view}
        setView={setView}
        title="Add New Interest"
        mode="form"
      />
      <div className="w-{80%} m-auto py-4">
        <div className="flex flex-col items-center mb-6">
          <Users className="w-12 h-12 text-purple-600 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Interest
          </h2>
          <p className="text-gray-600 text-sm">
            Fill out the details below to add a new interest
          </p>
        </div>
        <Form {...interestForm}>
          <form
            onSubmit={interestForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={interestForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Interest Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </Layout>}
    </>
  );
}
