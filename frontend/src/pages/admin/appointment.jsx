import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import { Calendar, Clock, MapPin } from "lucide-react";
import Layout from "../../components/layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { validateAppointmentForm } from "@/lib/validations";

export default function Appointment() {
 const [view, setView] = useState('create');
 
 const appointmentForm = useForm({
    resolver: yupResolver(validateAppointmentForm),
    defaultValues: {
        title: '',
        description: '',
        date: new Date(),
        time: '',
        location: '',
        attendees: ''
    }
 });

 const onSubmit = (data) => {
    console.log('Appointment Data:', data);
 };

 return (
   <Layout>
    <Topbar view={view} setView={setView} title="Schedule New Appointment" mode="create" />
    <Button type="submit" className=" mt-6 float-right">
                Schedule Appointment
            </Button>
     <div className='w-[80%] m-auto py-4'>
        <Form {...appointmentForm}>
            <div className="flex flex-col items-center mb-6">
                <Calendar className="w-12 h-12 text-green-600 mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Schedule New Appointment</h2>
                <p className="text-gray-600 text-sm">Set up meetings with students, companies, or staff members</p>
            </div>
            <form onSubmit={appointmentForm.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={appointmentForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Appointment Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter appointment title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={appointmentForm.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter appointment location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                        
                <FormField
                    control={appointmentForm.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief description of the appointment purpose..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Optional: Add details about the meeting agenda or purpose
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center grid grid-cols-2 gap-6">
                    <FormField
                        control={appointmentForm.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-center justify-center">Select Date</FormLabel>
                                <FormControl>
                                    <div className="flex justify-center">
                                    <CalendarComponent 
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        className="item-center justify-center rounded-md border"
                                    />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        <FormField
                            control={appointmentForm.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Time
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={appointmentForm.control}
                            name="attendees"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attendees</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="List attendees (emails, names, etc.)" 
                                            className="min-h-[120px]"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Add attendee information (names, emails, student IDs, etc.)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

          </form>
        </Form>
    </div>
   </Layout>
 );
}
