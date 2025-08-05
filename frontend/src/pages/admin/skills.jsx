import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import { GraduationCap, Users, Briefcase } from "lucide-react";
import Layout from "../../components/layout";


export default function Skills() {
    const skills = [
        { id: 1, name: "JavaScript", description: "Proficient in JavaScript and its frameworks." },
        { id: 2, name: "React", description: "Experience with React and its ecosystem." },
        { id: 3, name: "Node.js", description: "Familiarity with Node.js and backend development." },
    ];
}