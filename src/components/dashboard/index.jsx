import Brand from "../brand";
import DashboardNav from "./dashboard-nav";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Sidebar from "./sidebar";
import MainContent from "./main";
import { useRouter } from "next/router";

const Dashboard = ({ children, headerTitle, tab, handleTab }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(null); // Boshlang‘ich holat yo‘q

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth > 1024); // Sahifa yuklanganda aniqlash
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [router.pathname]);

  if (isSidebarOpen === null) return null;

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <div className="p-[30px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF] ">
            <Brand />
          </div>
          <DashboardNav />
        </Sidebar>

        <MainContent
          headTitle={headerTitle}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          tab={tab}
          handleTab={handleTab}
        >
          {children}
        </MainContent>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
