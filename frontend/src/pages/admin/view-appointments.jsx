import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Calendar, Clock, MapPin, User, Mail } from "lucide-react";
import { useAuth, useClient } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient();
  
  const appointmentsPerPage = 5;

  async function fetchAppointments() {
    setLoading(true);
    try {
      const res = await client.appointments.fetchAll();
      if (res.status === 200) {
        setAppointments(res.data.data);
        setFilteredAppointments(res.data.data);
      } else {
        console.log(res.error);
        toast.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error(error, 'Cannot fetch appointments');
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      if (currentUser && currentUser?.role !== "admin") {
        navigate("/not-authorized");
      }
      if (!token) {
        navigate("/login");
      }
      if (token) {
        await fetchAppointments();
      }
    };
    loadData();
  }, [token]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(app => app.status === statusFilter)
      );
    }
    setCurrentPage(1);
  }, [statusFilter, appointments]);

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const start = (currentPage - 1) * appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(start, start + appointmentsPerPage);

  const handleEdit = (id) => {
    navigate(`/appointments/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    
    try {
      const res = await client.appointments.delete(id);
      if (res.status === 200) {
        toast.success("Appointment deleted successfully");
        setAppointments(prev => prev.filter(app => app._id !== id));
      } else {
        toast.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment");
    }
  };

  const handleSendInvite = async (id) => {
    try {
      const res = await client.appointments.sendInvite(id);
      if (res.status === 200) {
        toast.success("Invitation sent successfully!");
        // Update the appointment to show invite was sent
        setAppointments(prev => 
          prev.map(app => 
            app._id === id ? { ...app, inviteSent: true } : app
          )
        );
      } else {
        toast.error("Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      toast.error("Failed to send invitation");
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      scheduled: "bg-blue-100 text-blue-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-gray-100 text-gray-800"
    };
    
    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Manage Appointments" mode="read" />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold">Appointments</h4>
              
              <div className="flex items-center gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={() => navigate("/appointments/create")}>
                  Create New Appointment
                </Button>
              </div>
            </div>

            {loading ? (
              <p className="p-6 text-center">Loading appointments...</p>
            ) : (
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No appointments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentAppointments.map((appointment) => {
                      const datetime = formatDateTime(appointment.startTime);
                      return (
                        <TableRow key={appointment._id}>
                          <TableCell className="font-medium">
                            {appointment.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{datetime.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{datetime.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{appointment.client?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{appointment.staff?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            {!appointment.inviteSent && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleSendInvite(appointment._id)}
                                aria-label="Send invite"
                                title="Send invitation email"
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(appointment._id)}
                              aria-label="Edit appointment"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(appointment._id)}
                              aria-label="Delete appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {filteredAppointments.length > 0 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}