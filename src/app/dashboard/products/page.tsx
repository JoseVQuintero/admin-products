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
  const [clickCons, seClickCons] = useState("");
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
        <div className="h-100 max-w-full overflow-x-auto">          
          <table className="w-full text-xs overflow-x-auto">
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
              {records.map((row,index) => {
                return <tr>{headersData.map((k: any) => <td key={k.id} className={k.class}>{eval(k.field)}</td>)}</tr>
                }
              )}
            </tbody>
          </table>          
        </div>
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando <span className="font-semibold text-gray-900 dark:text-white">{`${currentPage} / ${numberOfPages}`}</span> de <span className="font-semibold text-gray-900 dark:text-white">{`${recordsData.length} Registros`}</span></span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                  {
                      clickCons === "prev" ?
                          <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-gray-300  dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => prevPage()}>Prev</a>
                          :
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => prevPage()}>Prev</a>
                  }
                  </li>
                  {[1,2,3,4,5].map((n)=>
                    <li>
                      {
                        currentPage === n ?
                          <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-gray-300  dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => numberPage(n)}>{ n }</a>
                          :
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => numberPage(n)}>{ n }</a>
                      }
                    </li>
                  )}                  
                  <li>
                    {
                      clickCons === "next" ?
                          <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-gray-300  dark:border-gray-700 dark:bg-gray-700 dark:text-white" onClick={() => nextPage()}>{`Next${(currentPage>5?`(${currentPage})`:``)}`}</a>
                          :
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => nextPage()}>{`Next${(currentPage>5?`(${currentPage})`:``)}`}</a>
                    }       
                  </li>
              </ul>
          </nav>
      </div>
    </>
  );

  function nextPage(){
      if (currentPage != numberOfPages){
        setCurrentPage(prev => prev + 1)
        seClickCons("next");
      }
  }

  function prevPage(){
      if (currentPage != 1){
        setCurrentPage(prev => prev - 1)
        seClickCons("prev");
      }
  }

  function numberPage(num:any) {
    //if (currentPage != 1) {
    setCurrentPage(num);
    seClickCons("number");
    //}
  }

};

export default Products;
