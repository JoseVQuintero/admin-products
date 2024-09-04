//import ECommerce from "@/components/Dashboard/E-commerce";
import Login from "@/app/login/page";
import { Metadata } from "next";
//import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Admin Interface | Store",
  description: "Connect your sales",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <Login />
      {/*  </DefaultLayout> */}
    </>
  );
}
