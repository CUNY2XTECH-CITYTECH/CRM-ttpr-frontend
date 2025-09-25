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
  const [students, setStudents] =useState([])

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
      const  stu = await client.user.fetchStudents({credentials: 'include'});
      console.log("Fetched students:", stu);
      if (stu.status==200) {
        // if some of the fields are missing, add them with default values
        const updatedStudents = stu?.data?.map((s, index) => ({
        
          id: s.id || index + 1,
          name: s.name || "N/A",
          email: s.email || "N/A",
          major: s.major || "N/A",
          track: s.track || "N/A",
          graduationYear: s.graduationYear || "N/A",
          linkedin: s.linkedin || "#",
          location: s.location || "N/A",
        }));
        setStudents(updatedStudents);
      }
      setLoading(false);
    
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(students?.length / studentsPerPage);
  const start = (currentPage - 1) * studentsPerPage;
  const currentStudents = students?.slice(start, start + studentsPerPage);
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
                {currentStudents?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentStudents?.map((stu) => (
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
