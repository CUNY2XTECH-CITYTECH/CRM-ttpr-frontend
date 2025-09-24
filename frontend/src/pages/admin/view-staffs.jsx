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
import { useNavigate, useParams } from "react-router";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";

export default function ViewStaffs() {
  const [staffs, setStaffs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient()
  const staffsPerPage = 5;
  async function fetchStaffs(token) {
    console.log('func is called', token)
    setLoading(true);
    try {
      const res = await client.user.fetchAll()
      const more = await client.adminProfile.fetchAll();

      console.log(res.data, more, 'ressss')
      const staffData = res.data.map(async (staff) => {
        const profile = more.data.find(p => p._id === staff._id);
        const department = profile?.department_id ? await client.department.fetchOne(profile?.department_id) : null;
        console.log(department, 'dept')
        return {
          ...staff,
          department: department || 'N/A',
          position: profile?.position || 'N/A',
          linkedin: profile?.linkedin || 'N/A'
        };
      })
      let data = await Promise.all(staffData);
      if (res.status === 200 && more.status === 200) {
        console.log(data, 'final data')
        setStaffs(data);
      }
      else {
        console.log(res.error)
      }
    } catch (error) {
      console.error(error, 'cannot fetch staffs');
    } finally {
      setLoading(false);
    }
  }
  const viewDetails = (id) => {
    navigate(`/admin/view-staff-details/${id}`);
  }
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchStaffs(token);
      }
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(staffs?.length / staffsPerPage);
  const start = (currentPage - 1) * staffsPerPage;
  const currentStaffs = staffs?.slice(start, start + staffsPerPage);
  const handleDelete = async (id, name) => {
    console.log(id, 'id to delete')
    try {
      const res = await client.user.deleteOne({id:id}, { credentials: 'include' });
      const more = await client.adminProfile.deleteOne({id:id}, { credentials: 'include' });
      if (res.status !== 200 || more.status !== 200) toast.error(`Deleting ${name} failed`);
      else {
        toast.success(`Staff ${name} is deleted successfully`);
        setStaffs((prev) => prev.filter((c) => c._id !== id));
        if (currentStaffs.length === 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        }
      }
    } catch (error) {
      toast.error("Failed to delete staff");
      console.error(error);
    }
  };

  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Our Staffs" mode="read" creatable={false} />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">

            <h4 className='py-2 font-semibold uppercase'>Staffs</h4>
            {loading ? <p className="p-6 text-center">Loading...</p> :
              <Table className={'w-full'}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Linkedin</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStaffs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No staffs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStaffs.map((staff) => (
                      <TableRow key={staff._id} onClick={() => viewDetails(staff._id)} className="cursor-pointer hover:bg-gray-50">

                        <TableCell>{staff.name}</TableCell>
                        <TableCell>
                          {staff.id}
                        </TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>{staff.phoneNumber || 'N/A'}</TableCell>
                        <TableCell>{staff.department}</TableCell>
                        <TableCell>{staff.position}</TableCell>
                        <TableCell>
                          <a
                            href={staff.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={staff.linkedin ? "text-blue-600 " : "text-gray-500"}
                          >
                            {staff.linkedin === 'N/A' ? 'N/A' : 'LinkedIn'}
                          </a>
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">

                          <AlertDialog >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="icon"
                                aria-label="Delete staff"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete staff <b>{staff.name}</b>'s data
                                  from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(staff._id, staff.name)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>

                          </AlertDialog>

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
