import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { usePathname } from "next/navigation";


export const metadata: Metadata = {
  title:
    "Admin Interface | Store",
  description: "Connect your sales",
};

const Dashboard = async () => {
  const session = await getServerSession();
  //const rootPathName = usePathname();

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
