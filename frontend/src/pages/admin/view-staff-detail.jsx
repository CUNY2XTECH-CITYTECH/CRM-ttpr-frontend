import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, ExternalLink} from "lucide-react";
import { useAuth, useClient } from '@/lib/dataContext';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router'
import Layout from "@/components/layout";
import { Topbar } from '@/components/topbar';

// The data is defined here
export default function StaffDetail() {
  const { currentUser, token } = useAuth();
  const { client } = useClient()
  const [staffMember, setStaffMember] = useState(null);
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchStaffDetail = async () => {
      try {
        const res = await client.user.fetchById(id, { credentials: 'include' });
        const more = await client.adminProfile.fetchById(id, { credentials: 'include' });
        console.log(res.data, more.data, 'ressss');
        const combinedData = { ...res.data[0], ...more.data[0] };
        console.log(combinedData, 'combinedData');

        if (res.status === 200 && more.status === 200) {
          setStaffMember(combinedData);
        }
      } catch (error) {
        console.error("Error fetching staff details:", error);
      }
    }
    fetchStaffDetail();
  }
    , [token]);
  console.log(id, 'iddd')
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>

          <Topbar  title="Staff Detail" mode="read" creatable={false} />
          <div>
            {staffMember ?
              <div>
                <div className="mb-12 text-center">
                  <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Detailed information about our team member
                  </p>
                </div>

                <Card className="p-8 hover:shadow-lg transition-shadow">
                  {/* Profile image Section */}
                  <div className="flex justify-center mb-8"> 
                    <div className="bg-orange-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                    <span className="text-center self-center align-center">{staffMember?.name[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-balance">{staffMember.name[0].toUpperCase()+staffMember.name.slice(1)}</h2>
                        <p className="text-xl text-gray-800 font-medium mt-2">{staffMember.position[0].toUpperCase()+staffMember.position.slice(1)}</p>
                          <span>{staffMember.department?(" @ "+staffMember.department):""}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="w-5 h-5" />
                            <a href={`mailto:${staffMember.email}`} className="hover:text-accent transition-colors">
                              {staffMember.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5" />
                            <span>{staffMember.address}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button variant="outline" size="default" asChild>
                              <a href={staffMember.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4 mr-2" />
                                Connect on LinkedIn
                                <ExternalLink className="w-3 h-3 ml-2" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              : <p className="p-6 text-center">Loading...</p>}
          </div>
        </Layout>
      ) : (
        <div className='min-h-screen flex items-center justify-center'>
          <p className='text-lg'>Please log in to view staff details.</p>
        </div>
      )
        }
    </>

  );
}


