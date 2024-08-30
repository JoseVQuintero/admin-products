import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <DefaultLayout>
        <></>
      </DefaultLayout>
    </>
  );
};

export default Dashboard;
