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
import { Check, Edit, Trash2 } from "lucide-react";
import { useAuth, useClient } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import toast from "react-hot-toast";
export default function ViewStaffRequests() {
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
      const res = await client.user.fetchPendingStaffs();
      if (res.status === 200) {
        setStaffs(res.data.pendingStaffs);
      }
      else{
        console.log(res.error)
      }
    } catch (error) {
      console.error(error, 'cannot fetch staffs');
    } finally {
      setLoading(false);
    }
  }
  const handleAction= async (id,email,action) => {
    try {
      const res = await client.user.actionPendingStaff(id,{action},{ credentials: 'include' });
      if (res.status === 200) {
        if(action==='reject'){
          toast.success('Staff rejected successfully');
        }
        else if(action==='approve'){
          toast.success('Staff approved successfully');
        }
          const sendingEmail= await client.email.send({
            to: email,
            action:action
        },{ credentials: 'include' })
          console.log(sendingEmail,'..sending')

        // Refresh the list after approval
        fetchStaffs(token);
      }
      else{
        toast.error(res.error || 'Failed to approve staff');
      }
    }
    catch (error) {
      console.error(error);
      toast.error(`An error occurred while ${action}ing the staff`);
    }
  }
 
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchStaffs(token);
      }
    }
    loadData()
  }, [token]);
  const totalPages = Math.ceil(staffs.length / staffsPerPage);
  const start = (currentPage - 1) * staffsPerPage;
  const currentStaffs = staffs.slice(start, start + staffsPerPage);
  const handleEdit = (id) => {
    alert(`Edit staff with ID: ${id}`);
    // Replace with your real edit logic or navigation
  };
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Pending Staff Requests" mode="read" creatable={false} />

          <div className="p-6 mt-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">

            <h4 className='py-2 font-semibold uppercase'>Staffs</h4>
            {loading ? <p className="p-6 text-center">Loading...</p> :
              <Table className={'w-full'}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStaffs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No Pending Requests.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentStaffs.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell>{staff.name[0].toUpperCase()+staff.name.slice(1)}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              className="bg-red-500 hover:bg-red-600 text-white w-fit p-2"
                              size="icon"
                              onClick={() => handleAction(staff._id,staff.email,'reject')}
                            >
                              Reject
                            </Button>
                            <Button 
                              className="ml-2 bg-green-600 hover:bg-green-700 text-white w-fit p-2"
                              size="icon"
                              onClick={() => handleAction(staff._id,staff.email,'approve')}
                            >
                              Approve
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
