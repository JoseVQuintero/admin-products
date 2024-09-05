"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { ProductsModel } from "@/types/product";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import React, { useEffect, useState, useCallback } from "react";

import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/components/common/Loader";
import { redirect } from "next/navigation";


const headersData = [
  { id:"description", field:"row?.description", title:`Descripción`, class:"min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11" },
  { id:"subCategory", field:"`${row?.category}->${row?.subCategory}`", title: "Categoria", class:"min-w-[150px] px-4 py-4 font-medium text-black dark:text-white" },
  { id:"vendorName", field:"row?.vendorName", title: "Marca", class:"min-w-[150px] px-4 py-4 font-medium text-black dark:text-white" },
  { id:"ingramPartNumber", field:"row?.ingramPartNumber", title: "SKU" , class:"px-4 py-4 font-medium text-black dark:text-white" },
  { id:"vendorPartNumber", field:"row?.vendorPartNumber", title: "VPN" , class:"px-4 py-4 font-medium text-black dark:text-white" },
  { id:"upcCode", field:"row?.upcCode", title: "UPC" , class:"px-4 py-4 font-medium text-black dark:text-white" }  
];

const Products = () => {

  const [error, setError] = useState("");
  const [search, setSearch] = useState({ value: "", type: "description" });
  const [recordsData, setRecordsData] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [currentPage, setCurrentPage] = useState(1)
  const nbPerPage = 30
  const lastIndex = currentPage * nbPerPage
  const startIndex = lastIndex - nbPerPage 
  const numberOfPages = Math.ceil(recordsData.length / nbPerPage);
  const records = recordsData.slice(startIndex, lastIndex);

  const fetchData = useCallback(async () => {

      try {
        const res = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r:any)=>r.json()).then((k:any)=>k.data);

        return res;
      } catch (error) {
        toast.error("Error, try again");
        setError("Error, try again");
        return null;
      }

  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData().then((res: any) => { setDataProducts(res); setRecordsData(res); }).catch(console.error);
  }, [fetchData]);  

  useEffect(() => {
    //if (!!search.value) {
      setRecordsData(dataProducts.filter((r: any) => r[search.type].toLowerCase().includes(search?.value.toLowerCase())));
    //}
  }, [search,dataProducts]); 

  if (!session) {     
    redirect("/");   
  }
  
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className='w-full flex flex-row items-center p-5'>
              <div className='flex flex-row items-center gap-4'>
                  <span className='cursor-pointer font-semibold' onClick={() => prevPage()}>prev</span>
                  <div className='flex flex-row items-center'>
                      <span>{currentPage}</span>
                      <span>/</span>
                      <span>{numberOfPages}</span>
                  </div>
                  <span className='cursor-pointer font-semibold' onClick={() => nextPage()}>next</span>
              </div>
          </div>
          <table className="w-full table-auto text-xs">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {headersData.map((v: any) =>
                  <th className={v.class}>{v.title}<input type="text" placeholder="Search" onChange={(e) => setSearch({ type: `${v.id}`, value: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-4 pr-10 text-black focus:border-primary focus-visible:shadow-none" />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {records.map((row) => {
                  return <tr>{headersData.map((k: any) => <td>{eval(k.field)}</td>)}</tr>
                }
              )}
            </tbody>
          </table>
          
        </div>
      </div>
    </>
  );

  function nextPage(){
      if (currentPage != numberOfPages){
          setCurrentPage(prev => prev + 1)
      }
  }

  function prevPage(){
      if (currentPage != 1){
          setCurrentPage(prev => prev - 1)
      }
  }

};

export default Products;
