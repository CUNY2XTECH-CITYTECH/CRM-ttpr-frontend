import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import { GraduationCap, Users, Briefcase } from "lucide-react";
import Layout from "../../components/layout";
import { validateSkillsForm } from "@/lib/validations";

const skills = [ {
    options: "Programming Language"
},
{
    options: "Framework"
},
{
    options: "Database"
},
{
    options: "DevOps"
},
{
    options: "Cloud Computing"
},
{
    options: "Machine Learning"
},
{
    options: "Data Science"
},
{
    options: "Cybersecurity"
},
{
    options: "UI/UX Design"
},
{
    options: "Project Management"
}
]

export default function Skills() {
    const [view, setView] = useState('create');

    const skillsForm = useForm({
        resolver: yupResolver(validateSkillsForm),
        defaultValues: {
            name: '',
            description: '',
            category: ''
        }
    });

    const onSubmit = (values) => {
        console.log('Skills Data:', values);
    };

    return (
        <Layout>
            <Topbar view={view} setView={setView} title="Create New Skill" mode="create" />
             <Button type="submit" className=" mt-4 float-right">Create Skill</Button>
             <div className='w-[80%] m-auto py-4'>
                <Form {...skillsForm}>
                    <div className="flex flex-col items-center mb-6">
                        <GraduationCap className="w-12 h-12 text-blue-600 mb-2" />
                        <h2 className="text-2xl font-semibold text-gray-800">Create New Skill</h2>
                        <p className="text-gray-600 text-sm">Fill out the details below to create a new skill</p>
                    </div>
                    <form onSubmit={skillsForm.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={skillsForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skill Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Skill Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={skillsForm.control}
                                name="description"              
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Skill Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={skillsForm.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Choose Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {skills.map((skill) => (
                                                        <SelectItem key={skill.options} value={skill.options}>
                                                            {skill.options}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </div>
        </Layout>
    )
}