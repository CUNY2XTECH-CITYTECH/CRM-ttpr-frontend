import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { useClient } from "@/lib/dataContext";
import { Calendar, Clock, MapPin } from "lucide-react";
import Layout from "../../components/layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { validateAppointmentForm } from "@/lib/validations";
import { useNavigate } from "react-router";
import { useAuth } from "@/lib/dataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function Appointment() {
  const meetingTypes = [
    { value: "online", label: "Online" },
    { value: "inperson", label: "In-Person" },
    { value: "hybrid", label: "Hybrid" },
  ];
  const status = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "canceled", label: "Canceled" },
    { value: "completed", label: "Completed" },
    { value: "noshow", label: "No Show" },
    { value: "rescheduled", label: "Rescheduled" }

  ];
  const { client } = useClient();
  const { currentUser, token } = useAuth();
  const [view, setView] = useState("create");
  const navigate = useNavigate();
  const appointmentForm = useForm({
    resolver: yupResolver(validateAppointmentForm),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      participant: "",
      staff: currentUser?.id || "",
      remainderSent: false,
      inviteSent: false,
      notes: "",
      status: "confirmed",
      meetingType: "",
      meetingLink: "",
      participant: "",
      startTime: "",
      endTime: "",
    },
  });
  const onSubmit = async(data) => {
    try{
      console.log(data,'data');
    const trial = await client.appointment.create(data, { credentials: 'include' });
      console.log(trial, 'trial');
    }
    catch(err){
      console.log(err,'err');
    }
  };
  const onError = (e) => {
    console.log(e, 'error');
  }

  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar
            view={view}
            setView={setView}
            title="Schedule New Appointment"
            mode="create"
          />

          <div className="w-[80%] m-auto py-4">
            <Form {...appointmentForm}>
              <form
                onSubmit={appointmentForm.handleSubmit(onSubmit,onError)}
                className="space-y-6"
              >
                <div >
                  <FormField
                    control={appointmentForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Title <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            required
                            placeholder="Enter appointment title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the appointment purpose..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Add details about the meeting agenda or
                          purpose
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  <div className="lg:grid grid-cols-2 gap-6 grid">
                    <FormField
                      control={appointmentForm.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Start Time
                            <span className="text-red-500">*</span>
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
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            End Time
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="participant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attendees<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List attendees (emails)"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="meetingType"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Choose meeting type<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Meeting Type" {...field} />
                            </SelectTrigger>
                            <SelectContent>
                              {meetingTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage
                          className={" text-xs py-0 mr-auto  text-start"}
                        />
                      </FormItem>
                    )}
                  ></FormField>

                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="meetingLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting URL<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter meeting url (N/A if in-person)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter appointment location (N/A if online)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Set Appointment Status<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Select defaultValue={"confirmed"} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Status" {...field} />
                            </SelectTrigger>
                            <SelectContent>
                              {status.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage
                          className={" text-xs py-0 mr-auto  text-start"}
                        />
                      </FormItem>
                    )}
                  ></FormField>

                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={appointmentForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-center justify-center">
                          Select Date
                          <span className="text-red-500">*</span>
                        </FormLabel>
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
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Schedule Appointment
                </Button>
              </form>
            </Form>
          </div>
        </Layout >
      ) : (
        <div></div>
      )
      }
    </>
  );
}
