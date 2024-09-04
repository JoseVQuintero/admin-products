"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ProductsModel } from "@/types/product";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import React, { useEffect, useState, useCallback } from "react";

import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/common/Loader";
import { redirect } from "next/navigation";


const Products = () => {

  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const fetchData = useCallback(async () => {
      try {
        const res = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r:any)=>r.json()).then((k:any)=>k.data);

        if (res.status === 400) {
          toast.error("This email is already registered");
          setError("The email already in use");
        }

        if (res.status === 200) {
          setError("");
          toast.success("Registration successful");
          //router.push("/login");
        }
        console.log(res)
        return true;
      } catch (error) {
        toast.error("Error, try again");
        setError("Error, try again");
        console.log(error);
        return null;
      }

  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);  

  if (!session) {
     
    redirect("/");
   
  }
  
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Package
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Invoice date
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );

};

export default Products;
