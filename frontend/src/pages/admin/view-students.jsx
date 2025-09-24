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
export default function ViewStudents() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@citytech.cuny.edu",
      major: "Computer Science",
      track: "Software Development",
      graduationYear: 2024,
      linkedin: "https://linkedin.com/in/johndoe",
      location: "New York, NY",
    }
    , {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@citytech.cuny.edu",
      major: "Information Technology",
      track: "Network Administration",
      graduationYear: 2023,
      linkedin: "https://linkedin.com/in/janesmith",
      location: "Brooklyn, NY",
    }
,
{
  id: 3,
  name: "Michael Johnson",
  email: "michael.johnson@citytech.cuny.edu",
  major: "Computer Engineering",
  track: "Embedded Systems",
  graduationYear: 2024,
  linkedin: "https://linkedin.com/in/michaeljohnson",
  location: "Queens, NY",
},
{
  id: 4,
  name: "Emily Davis",
  email: "emily.davis@citytech.cuny.edu",
  major: "Computer Science",
  track: "Software Development",
  graduationYear: 2025,
  linkedin: "https://linkedin.com/in/emilydavis",
  location: "Manhattan, NY",
},
{
  id: 5,
  name: "Daniel Martinez",
  email: "daniel.martinez@citytech.cuny.edu",
  major: "Information Technology",
  track: "Cybersecurity",
  graduationYear: 2023,
  linkedin: "https://linkedin.com/in/danielmartinez",
  location: "Bronx, NY",
},
{
  id: 6,
  name: "Sophia Lee",
  email: "sophia.lee@citytech.cuny.edu",
  major: "Computer Systems",
  track: "Database Administration",
  graduationYear: 2024,
  linkedin: "https://linkedin.com/in/sophialee",
  location: "Brooklyn, NY",
},
{
  id: 7,
  name: "David Kim",
  email: "david.kim@citytech.cuny.edu",
  major: "Computer Engineering",
  track: "Artificial Intelligence",
  graduationYear: 2025,
  linkedin: "https://linkedin.com/in/davidkim",
  location: "Staten Island, NY",
},

{
  id: 8,
  name: "Maya Aung",
  email: "maya.aung@citytech.cuny.edu",
  major: "Computer Engineering",
  track: "Web Development",
  graduationYear: 2024,
  linkedin: "https://linkedin.com/in/mayaaung",
  location: "Brooklyn, NY",
}
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient()
  const studentsPerPage = 5;
  async function fetchStudents(token) {
    console.log('func is called', token)
    setLoading(false);
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
        await fetchStudents(token);
      }
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const start = (currentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(start, start + studentsPerPage);
  const handleEdit = (id) => {
    alert(`Edit stu with ID: ${id}`);
    // Replace with your real edit logic or navigation
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this stu?")) return;
    // try {
    //   const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    //   if (!res.ok) throw new Error("Delete failed");
    //   setStudents((prev) => prev.filter((c) => c.id !== id));
    //   if (currentStudents.length === 1 && currentPage > 1) {
    //     setCurrentPage((p) => p - 1);
    //   }
    // } catch (error) {
    //   alert("Failed to delete stu");
    //   console.error(error);
    // }
  };
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Our Students" mode="read" creatable={false} />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">
        <h4 className='py-2 font-semibold uppercase'>Students</h4>
            {loading ? <p className="p-6 text-center">Loading...</p>:
              <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Graduation</TableHead>
                  <TableHead>Linkedin</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentStudents.map((stu) => (
                    <TableRow key={stu.id}>
                      <TableCell>{stu.name}</TableCell>
                      <TableCell>{stu.email}</TableCell>
                      <TableCell>{stu.major}</TableCell>
                      <TableCell>{stu.track}</TableCell>
                      <TableCell>{stu.graduationYear}</TableCell>
                      {/* Assuming stu.linkedin is a URL */}
                      <TableCell>
                        <Link
                          to={stu.linkedin}
                          className="text-blue-600 "
                        >
                          Linkedin
                        </Link>
                      </TableCell>
                      <TableCell>
                        <a
                          href={stu.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Visit
                        </a>
                      </TableCell>
                      <TableCell className={''}>{stu.location}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(stu.id)}
                          aria-label="Edit stu"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(stu.id)}
                          aria-label="Delete stu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            </div>
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
