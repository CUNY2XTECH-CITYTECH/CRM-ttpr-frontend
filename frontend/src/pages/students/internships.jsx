import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/dataContext";

export default function Internships() {
  const navigate = useNavigate(); // ✅

  const [internships, setInternships] = useState([
  {
    _id: "1",
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    location: "San Francisco, CA",
    arrangement: "Hybrid",
    salary: "$3,800/month",
    posted: "2 days ago",
    logo: "",
    description:
      "Work on responsive web applications, building UI components with React and collaborating with the design team."
  },
  {
    _id: "2",
    title: "Backend Developer Intern",
    company: "CodeCrafters Inc.",
    location: "New York, NY",
    arrangement: "Onsite",
    salary: "$4,200/month",
    posted: "1 day ago",
    logo: "",
    description:
      "Assist backend engineers in developing APIs, integrating databases, and writing unit tests using Node.js and Express."
  },
  {
    _id: "3",
    title: "UI/UX Design Intern",
    company: "DesignHub Studios",
    location: "Chicago, IL",
    arrangement: "Remote",
    salary: "$3,600/month",
    posted: "3 days ago",
    logo: "",
    description:
      "Create wireframes, prototypes, and user flows while collaborating with developers to ensure user-centered design."
  },
  {
    _id: "4",
    title: "Data Analyst Intern",
    company: "DataMinds Analytics",
    location: "Boston, MA",
    arrangement: "Hybrid",
    salary: "$4,500/month",
    posted: "Today",
    logo: "",
    description:
      "Analyze datasets, generate reports, and support the BI team in delivering data-driven insights."
  },
  {
    _id: "5",
    title: "Cybersecurity Intern",
    company: "SecureNet Systems",
    location: "Austin, TX",
    arrangement: "Onsite",
    salary: "$4,000/month",
    posted: "4 days ago",
    logo: "",
    description:
      "Support the cybersecurity team with monitoring systems, auditing, and incident response."
  },
  {
    _id: "6",
    title: "Cloud Engineer Intern",
    company: "CloudWorks Global",
    location: "Seattle, WA",
    arrangement: "Hybrid",
    salary: "$4,300/month",
    posted: "2 days ago",
    logo: "",
    description:
      "Assist cloud engineers with deployments, monitoring infrastructure, and writing automation scripts."
  },
  {
    _id: "7",
    title: "Machine Learning Intern",
    company: "AI Innovators Lab",
    location: "Palo Alto, CA",
    arrangement: "Onsite",
    salary: "$5,000/month",
    posted: "5 days ago",
    logo: "",
    description:
      "Train ML models, preprocess datasets, and support applied AI research projects."
  },
  {
    _id: "8",
    title: "Software Engineering Intern",
    company: "FinTech Edge",
    location: "New York, NY",
    arrangement: "Remote",
    salary: "$4,100/month",
    posted: "Yesterday",
    logo: "",
    description:
      "Collaborate with engineers to develop financial applications using Java and Spring Boot."
  },
  {
    _id: "9",
    title: "Sustainability Intern",
    company: "GreenTech Energy",
    location: "Denver, CO",
    arrangement: "Onsite",
    salary: "$3,700/month",
    posted: "3 days ago",
    logo: "",
    description:
      "Conduct research, prepare sustainability reports, and support project planning initiatives."
  },
  {
    _id: "10",
    title: "Healthcare IT Intern",
    company: "MediTech Solutions",
    location: "Philadelphia, PA",
    arrangement: "Hybrid",
    salary: "$3,900/month",
    posted: "Today",
    logo: "",
    description:
      "Assist in testing medical software, supporting IT teams, and ensuring HIPAA compliance."
  }
  ]);

  const [loading, setLoading] = useState(true);
  const { token, currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser, "cu");
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setInternships(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
        setLoading(false);
      });

    // if (currentUser && currentUser.role !== 'student') {
    //   navigate('/not-authorized')
    // }
    // if (!token) {
    //   navigate('/login')
    // }
  }, [token]);

  const removeInternship = (id) => {
    setInternships((prev) => prev.filter((job) => job._id !== id));
  };

  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Recent Internships for you" />
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-sm space-y-6">
            {loading ? (
              <p>Loading internships...</p>
            ) : internships.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                No internships available.
              </p>
            ) : (
              internships.map((job) => (
                <div
                  key={job._id}
                  onClick={() =>
                    navigate(`/internships/apply/${job._id}`, {
                      state: { job },
                    })
                  } // ✅ Navigates with ID param
                  className="flex items-start gap-4 border-b pb-4 relative cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  <div className="w-14 h-14 bg-gray-300 rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base">
                      {job.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {job.company}. {job.location}. ({job.arrangement}).{" "}
                      {job.salary}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeInternship(job._id);
                    }}
                    className="text-gray-400 hover:text-gray-600 absolute top-0 right-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}
