import React, { useState } from "react";
import { Header } from "@/components/header";
import "./App.css";
import Layout from "./components/layout";
import { Topbar } from "./components/topbar";

function App() {
  return (
    <>
      <Layout>
        <Topbar title="Internships" />
        <div>Hello</div>
      </Layout>
    </>
  );
}

export default App;
