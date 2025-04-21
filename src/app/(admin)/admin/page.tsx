"use client";
import React from "react";
import DashboardContent from "../components/dashboard/content";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return <DashboardContent session={session} />;
};

export default Dashboard;
