import React from "react";
import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateViewBoard } from "@/lib/validations";

export default function ViewBoard() {
  const internshipForm = useForm({
    resolver: yupResolver(validateViewBoard),
    defaultValues: {
      title: "",
      locations: [],
      workType: "",
      employmentType: "",
      salary: "",
      startDate: "",
      deadline: "",
      company: {
        name: "",
        industry: "",
        logo: "",
      },
      description: [],
    },
  });
}
