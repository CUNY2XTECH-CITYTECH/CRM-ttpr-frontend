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
import { useNavigate } from "react-router";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
export default function ViewInternships() {
  const [internships, setInternships] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient()
  const internshipsPerPage = 5;
  async function fetchInternships(token) {
    console.log('func is called', token)
    setLoading(true);
    // try {
    //   const res = await client.internships.fetchAll();
    //   if (res.status === 200) {
    //     setInternships(res.data.data);
    //   }
    //   else{
    //     console.log(res.error)
    //   }
    // } catch (error) {
    //   console.error(error, 'cannot fetch internships');
    // } finally {
    //   setLoading(false);
    // }
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
        await fetchInternships(token);
      }
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(internships.length / internshipsPerPage);
  const start = (currentPage - 1) * internshipsPerPage;
  const currentInternships = internships.slice(start, start + internshipsPerPage);
  const handleEdit = (id) => {
    alert(`Edit company with ID: ${id}`);
    // Replace with your real edit logic or navigation
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    // try {
    //   const res = await fetch(`/api/internships/${id}`, { method: "DELETE" });
    //   if (!res.ok) throw new Error("Delete failed");
    //   setInternships((prev) => prev.filter((c) => c.id !== id));
    //   if (currentInternships.length === 1 && currentPage > 1) {
    //     setCurrentPage((p) => p - 1);
    //   }
    // } catch (error) {
    //   alert("Failed to delete company");
    //   console.error(error);
    // }
  };
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Add New Internship" mode="read" />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">

            <h4 className='py-2 font-semibold uppercase'>Internships</h4>
            {loading ? <p className="p-6 text-center">Loading...</p> :
              <Table className={'w-full'}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mission</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentInternships.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No internships found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentInternships.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.mission.slice(0, 40)}...</TableCell>
                        <TableCell>{company.industry}</TableCell>
                        <TableCell>
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Visit
                          </a>
                        </TableCell>
                        <TableCell className={''}>{company.location}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(company.id)}
                            aria-label="Edit company"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(company.id)}
                            aria-label="Delete company"
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
