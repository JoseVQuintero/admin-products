import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Interface | Store",
    description: "Connect your sales",
};


const Dashboard = async () => {

  const session = await getServerSession();

  if (!session) {
     
    redirect("/");
   
  }
  
  return (
    <></>
  );

};

export default Dashboard;
