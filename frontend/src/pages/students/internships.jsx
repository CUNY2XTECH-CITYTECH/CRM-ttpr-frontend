import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/dataContext";


export default function ViewInternships() {
  const navigate = useNavigate(); // ✅

  const [internships, setInternships] = useState([
    // Sample data...
    {
      _id: "1",
      title: "Software Engineer Intern",
      company: "TechNova",
      location: "San Francisco, CA",
      arrangement: "Hybrid",
      salary: "$4,500/month",
      posted: "2 days ago",
      logo: "",
      description: "Join our team to work on cutting-edge web applications using React and Node.js.",
    },
    {
      _id: "2",
      title: "Frontend Developer Intern",
      company: "PixelWave",
      location: "Remote",
      arrangement: "Remote",
      salary: "$3,800/month",
      posted: "1 day ago",
      logo: "",
      description: "Collaborate with designers and backend engineers to build engaging UIs with React.",
    },
    {
      _id: "3",
      title: "Product Management Intern",
      company: "InnoLogix",
      location: "Austin, TX",
      arrangement: "Onsite",
      salary: "$4,000/month",
      posted: "3 days ago",
      logo: "",
      description: "Assist in defining product features and roadmap, and conduct market research.",
    },
    {
      _id: "4",
      title: "Data Analyst Intern",
      company: "DataXpress",
      location: "New York, NY",
      arrangement: "Hybrid",
      salary: "$4,200/month",
      posted: "Today",
      logo: "",
      description: "Analyze datasets to generate insights and help drive data-informed decisions.",
    },
    {
      _id: "5",
      title: "UI/UX Designer Intern",
      company: "Designly",
      location: "Chicago, IL",
      arrangement: "Remote",
      salary: "$3,600/month",
      posted: "5 days ago",
      logo: "",
      description: "Create beautiful and user-friendly interface designs and wireframes.",
    },
    {
      _id: "6",
      title: "DevOps Intern",
      company: "CloudCore",
      location: "Seattle, WA",
      arrangement: "Onsite",
      salary: "$4,100/month",
      posted: "2 days ago",
      logo: "",
      description: "Work with cloud infrastructure, CI/CD pipelines, and monitoring systems.",
    }


  ]);


  const [loading, setLoading] = useState(true);
  const {token,currentUser} = useAuth()

  useEffect(() => {
   console.log(currentUser,'cu')
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => {
        setInternships(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading jobs:", err);
        setLoading(false);
      });
  }, [token]);

  const removeInternship = (id) => {
    setInternships(prev => prev.filter(job => job._id !== id));
  };

  return (
    <>
      {currentUser ?
        <Layout role={currentUser.role}>
          <Topbar title="Recent Internships for you" />
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-sm space-y-6">
            {loading ? (
              <p>Loading internships...</p>
            ) : internships.length === 0 ? (
              <p className="text-center text-gray-500 italic">No internships available.</p>
            ) : (
              internships.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/internships/apply/${job._id}`, { state: { job } })} // ✅ Navigates with ID param
                  className="flex items-start gap-4 border-b pb-4 relative cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  <div className="w-14 h-14 bg-gray-300 rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base">{job.title}</p>
                    <p className="text-sm text-gray-600">
                      {job.company}. {job.location}. ({job.arrangement}). {job.salary}
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
        : <div></div>
      }
    </>
  );
}
