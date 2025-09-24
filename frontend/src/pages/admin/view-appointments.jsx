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
import { Edit, Trash2 } from "lucide-react";
import { useAuth, useClient } from "@/lib/dataContext";
import { Link, useNavigate } from "react-router";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient()
  const appointmentsPerPage = 5;

  const formatTime= ( startTime, endTime ) => {
    // Validate the input strings before processing.
    if (!startTime || !endTime) {
      console.error("Input timestamps cannot be null or empty.");
      return null;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);


    // Get date components in UTC to avoid timezone issues.
    const month = (startDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = startDate.getUTCDate().toString().padStart(2, '0');
    const year = startDate.getUTCFullYear();

    // Get time components in UTC.
    const startHours = startDate.getUTCHours().toString().padStart(2, '0');
    const startMinutes = startDate.getUTCMinutes().toString().padStart(2, '0');
    const startSeconds = startDate.getUTCSeconds().toString().padStart(2, '0');

    const endHours = endDate.getUTCHours().toString().padStart(2, '0');
    const endMinutes = endDate.getUTCMinutes().toString().padStart(2, '0');
    const endSeconds = endDate.getUTCSeconds().toString().padStart(2, '0');
    console.log(`${month}/${day}/${year}`, `${startHours}:${startMinutes}:${startSeconds}`, `${endHours}:${endMinutes}:${endSeconds}`, 'formatted times');
    return {
      date: `${month}/${day}/${year}`,
      startTime: `${startHours}:${startMinutes}:${startSeconds}`,
      endTime: `${endHours}:${endMinutes}:${endSeconds}`,
    };
  }
  async function fetchAppointments(token) {
    console.log('func is called', token)
    setLoading(true);
    try {
      const res = await client.appointment.fetchAll();
      console.log(res, 'ressss');

      if (res.status === 200) {
        let data = res.data.data.map(app => {
          console.log(app.startTime, app.endTime, 'times');
          const { date, startTime, endTime} = formatTime(app.startTime, app.endTime);
          return {
            ...app,
            date: date,
            startTime: startTime,
            duration: Math.round((new Date(app.endTime) - new Date(app.startTime)) / 60000) // duration in minutes
          };
        }
        );
        console.log(data, 'dataaa');
        setAppointments(data);
      }
      else {
        console.log(res.error)
      }
    } catch (error) {
      console.error(error, 'cannot fetch appointments');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const loadData = async () => {
      // if (currentUser && currentUser?.role !== "admin") {
      //   navigate("/not-authorized");
      // }
      // if (!token) {
      //
      //   navigate("/login");
      // }
      if (token) {
        await fetchAppointments(token);
      }
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);
  const start = (currentPage - 1) * appointmentsPerPage;
  const currentAppointments = appointments.slice(start, start + appointmentsPerPage);
  const handleEdit = (id) => {
    alert(`Edit app with ID: ${id}`);
    // Replace with your real edit logic or navigation
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this app?")) return;
    // try {
    //   const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    //   if (!res.ok) throw new Error("Delete failed");
    //   setAppointments((prev) => prev.filter((c) => c.id !== id));
    //   if (currentAppointments.length === 1 && currentPage > 1) {
    //     setCurrentPage((p) => p - 1);
    //   }
    // } catch (error) {
    //   alert("Failed to delete app");
    //   console.error(error);
    // }
  };
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Add New Company" mode="read" createmultiple={false} />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">

            <h4 className='py-2 font-semibold uppercase'>Appointments</h4>
            {loading ? <p className="p-6 text-center">Loading...</p> :
              <Table className={'w-full'}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Attendee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Appointment Type</TableHead>
                    <TableHead>Location/Link</TableHead>
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
                    currentAppointments.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>{app.title}</TableCell>
                        <TableCell>{app.description.length > 30 ? app.description.slice(0, 30) + ".." : app.description}</TableCell>
                        <TableCell>{app.participant}</TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell>{app.startTime}</TableCell>
                        <TableCell>{app.duration} mins</TableCell>
                        <TableCell>{app.meetingType}</TableCell>
                        <TableCell>{app.meetingType=== "in-person" ? <span>app.location</span> : app.meetingLink!=="N/A" ?<Link className="text-blue-500" to={app.meetingLink}>{app.meetingLink}</Link>:"N/A"}</TableCell>
                        <TableCell>{app.status}</TableCell>
                        <TableCell className={''}>{app.location}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(app.id)}
                            aria-label="Edit app"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(app.id)}
                            aria-label="Delete app"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            }
            {/* Pagination */}
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
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}
