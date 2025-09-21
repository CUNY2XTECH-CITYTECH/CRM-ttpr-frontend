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
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Layout from "../../components/layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { validateAppointmentForm } from "@/lib/validations";
import { useNavigate } from "react-router";
import { useAuth, useClient } from "@/lib/dataContext";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Appointment() {
  const { currentUser, token } = useAuth();
  const { client } = useClient();
  const [view, setView] = useState("create");
  const [companies, setCompanies] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const appointmentForm = useForm({
    resolver: yupResolver(validateAppointmentForm),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      time: "",
      location: "",
      company: "",
      staff: "",
      client: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (currentUser && currentUser?.role !== "admin") {
      navigate("/not-authorized");
    }
    fetchDropdownData();
  }, [token]);

  const fetchDropdownData = async () => {
    try {
      // Fetch companies
      const companiesRes = await client.companies.fetchAll();
      if (companiesRes.status === 200) {
        setCompanies(companiesRes.data.data);
      }

      // Fetch staff members (users with staff role)
      const staffRes = await client.users.fetchAll();
      if (staffRes.status === 200) {
        setStaffMembers(staffRes.data.data.filter(user => user.role === "staff"));
      }

      // Fetch clients (users with client role)
      if (staffRes.status === 200) {
        setClients(staffRes.data.data.filter(user => user.role === "client"));
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      toast.error("Failed to load form data");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Combine date and time
      const startTime = new Date(data.date);
      const [hours, minutes] = data.time.split(':');
      startTime.setHours(parseInt(hours), parseInt(minutes));
      
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1); // Default 1 hour appointment

      const appointmentData = {
        title: data.title,
        description: data.description,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        company: data.company,
        staff: data.staff,
        client: data.client,
        location: data.location,
        notes: data.notes
      };

      const res = await client.appointments.create(appointmentData);
      
      if (res.status === 200) {
        toast.success("Appointment created successfully!");
        appointmentForm.reset();
        navigate("/appointments/view");
      } else {
        toast.error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

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
              <div className="flex flex-col items-center mb-6">
                <Calendar className="w-12 h-12 text-green-600 mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Schedule New Appointment
                </h2>
                <p className="text-gray-600 text-sm">
                  Set up meetings with students, companies, or staff members
                </p>
              </div>
              <form
                onSubmit={appointmentForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={appointmentForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter appointment title"
                            {...field}
                          />
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
                          <Input
                            placeholder="Enter appointment location"
                            {...field}
                          />
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
                        <Textarea
                          placeholder="Brief description of the appointment purpose..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Add details about the meeting agenda or purpose
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={appointmentForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company._id} value={company._id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appointmentForm.control}
                    name="staff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff Member</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select staff" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {staffMembers.map((staff) => (
                              <SelectItem key={staff._id} value={staff._id}>
                                {staff.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={appointmentForm.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client._id} value={client._id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center grid grid-cols-2 gap-6">
                  <FormField
                    control={appointmentForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-center justify-center">
                          Select Date
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
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Additional Notes
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Additional notes or special instructions..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Add any special instructions or notes for this appointment
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={loading}
                >
                  {loading ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </form>
            </Form>
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}