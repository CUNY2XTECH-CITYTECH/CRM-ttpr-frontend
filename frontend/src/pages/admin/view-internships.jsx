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
  const [internships, setInternships] = useState([
  {
    company: "TechNova Solutions",
    position: "Frontend Developer Intern",
    salary: "$18/hr",
    requirements: ["JavaScript", "React", "HTML/CSS"],
    responsibility: ["Build UI components", "Fix bugs", "Collaborate with design team"],
    details: "Work on web applications focusing on user experience and performance.",
    applicationDeadline: new Date("2025-10-15"),
    tags: ["frontend", "react", "webdev"],
    isActive: true
  },
  {
    company: "CodeCrafters Inc.",
    position: "Backend Developer Intern",
    salary: "$20/hr",
    requirements: ["Node.js", "Express", "MongoDB"],
    responsibility: ["Develop APIs", "Integrate database", "Write unit tests"],
    details: "Assist backend team in building scalable APIs with MongoDB.",
    applicationDeadline: new Date("2025-11-01"),
    tags: ["backend", "nodejs", "api"],
    isActive: true
  },
  {
    company: "DesignHub Studios",
    position: "UI/UX Design Intern",
    salary: "$17/hr",
    requirements: ["Figma", "Adobe XD", "Wireframing"],
    responsibility: ["Create mockups", "Test usability", "Collaborate with developers"],
    details: "Hands-on experience in user-centered design and prototyping.",
    applicationDeadline: new Date("2025-10-20"),
    tags: ["design", "ux", "ui"],
    isActive: true
  },
  {
    company: "DataMinds Analytics",
    position: "Data Analyst Intern",
    salary: "$22/hr",
    requirements: ["SQL", "Python", "Excel"],
    responsibility: ["Analyze datasets", "Generate reports", "Support BI dashboards"],
    details: "Work closely with analysts to derive insights from business data.",
    applicationDeadline: new Date("2025-10-25"),
    tags: ["data", "analytics", "sql"],
    isActive: true
  },
  {
    company: "SecureNet Systems",
    position: "Cybersecurity Intern",
    salary: "$21/hr",
    requirements: ["Networking", "Linux", "Security Fundamentals"],
    responsibility: ["Monitor threats", "Assist in audits", "Support incident response"],
    details: "Gain experience in securing enterprise systems and networks.",
    applicationDeadline: new Date("2025-11-05"),
    tags: ["security", "network", "cybersecurity"],
    isActive: true
  },
  {
    company: "CloudWorks Global",
    position: "Cloud Engineer Intern",
    salary: "$23/hr",
    requirements: ["AWS", "Docker", "Kubernetes"],
    responsibility: ["Deploy cloud services", "Monitor infrastructure", "Write automation scripts"],
    details: "Support cloud team in maintaining scalable deployments.",
    applicationDeadline: new Date("2025-11-10"),
    tags: ["cloud", "aws", "devops"],
    isActive: true
  },
  {
    company: "AI Innovators Lab",
    position: "Machine Learning Intern",
    salary: "$25/hr",
    requirements: ["Python", "TensorFlow", "Pandas"],
    responsibility: ["Train ML models", "Preprocess data", "Support research projects"],
    details: "Hands-on experience in applied machine learning projects.",
    applicationDeadline: new Date("2025-11-15"),
    tags: ["ai", "ml", "python"],
    isActive: true
  },
  {
    company: "FinTech Edge",
    position: "Software Engineering Intern",
    salary: "$19/hr",
    requirements: ["Java", "Spring Boot", "SQL"],
    responsibility: ["Develop backend services", "Assist with integration", "Fix issues"],
    details: "Work with engineering team to build financial tech applications.",
    applicationDeadline: new Date("2025-11-20"),
    tags: ["software", "java", "spring"],
    isActive: true
  },
  {
    company: "GreenTech Energy",
    position: "Sustainability Intern",
    salary: "$16/hr",
    requirements: ["Research Skills", "Excel", "Communication"],
    responsibility: ["Conduct research", "Prepare reports", "Support project planning"],
    details: "Assist sustainability team in research and data collection.",
    applicationDeadline: new Date("2025-11-25"),
    tags: ["sustainability", "research", "energy"],
    isActive: true
  },
  {
    company: "MediTech Solutions",
    position: "Healthcare IT Intern",
    salary: "$18/hr",
    requirements: ["SQL", "HIPAA Knowledge", "Excel"],
    responsibility: ["Support medical software", "Test applications", "Assist IT team"],
    details: "Work on healthcare-focused IT systems and software projects.",
    applicationDeadline: new Date("2025-12-01"),
    tags: ["healthcare", "it", "software"],
    isActive: true
  }
]
  ) 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();
  const { client } = useClient()
  const internshipsPerPage = 5;
  async function fetchInternships(token) {
    console.log('func is called', token)
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
      // if (currentUser && currentUser?.role !== "admin") {
      //   navigate("/not-authorized");
      // }
      // if (!token) {
      //
      //   navigate("/login");
      // }
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
    alert(`Edit intern with ID: ${id}`);
    // Replace with your real edit logic or navigation
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this intern?")) return;
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
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Responsibility</TableHead>
                    <TableHead>Requirements</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Deadline</TableHead>
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
                    currentInternships.map((intern,k) => (
                      <TableRow key={k}>
                        <TableCell>{intern.position}</TableCell>
                        <TableCell>{intern.company}</TableCell>
                           <TableCell>{intern.responsibility.join(", ")}</TableCell>
                        <TableCell>{intern.requirements.join(", ")}</TableCell>
                        <TableCell>{intern.details}</TableCell>
                        <TableCell>{intern.salary}</TableCell>
                        <TableCell>{new Date(intern.applicationDeadline).toLocaleDateString()}</TableCell>
                        {/* Assuming intern.website exists */}
                        <TableCell>
                          <a
                            href={intern.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Visit
                          </a>
                        </TableCell>
                        <TableCell className={''}>{intern.location}</TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(intern.id)}
                            aria-label="Edit intern"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(intern.id)}
                            aria-label="Delete intern"
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
