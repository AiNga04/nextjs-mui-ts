"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import DashboardContent from "../components/dashboard/content";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <>
      <DashboardContent session={session} />
      <ToastContainer />
    </>
  );
};

export default Dashboard;
