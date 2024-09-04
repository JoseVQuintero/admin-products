"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { signIn, useSession } from "next-auth/react";

export default function DefaultLayout({ children,}: { children: React.ReactNode;}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerOpen, setHeaderOpen] = useState("lg:full");
  const { data: session, status: sessionStatus } = useSession();

  //const session = await getServerSession();

  useEffect(() => {
    if (sidebarOpen) {setHeaderOpen("lg:ml-72.5");} else { setHeaderOpen("lg:full"); }
  }, [sidebarOpen]);

  return session ? (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className={`relative flex flex-1 flex-col ${headerOpen}`}>
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
              {/* {
             <SessionProvider session={session}>
                <Providers>{children}</Providers>
             </SessionProvider>              
             } */}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  ) : (
    <>
          {children}
          {/* {
             <SessionProvider session={session}>
                <Providers>{children}</Providers>
             </SessionProvider>              
             } */}
    </>
  );
}
