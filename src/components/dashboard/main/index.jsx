import MainContentHead from "../main-content-head";

const MainContent = ({ children, isSidebarOpen, setIsSidebarOpen, headTitle, tab, handleTab }) => {
  return (
    <div
      className={`transition-all duration-300 flex-1 w-full overflow-auto font-sf ${
        isSidebarOpen ? "lg:ml-[350px]" : "lg:ml-0"
      }`}
    >
      <div className="sticky top-0 z-10 bg-white">
      <MainContentHead
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        title={headTitle}
        tab={tab}
        handleTab={handleTab}
      />
      </div>
      <div className=" w-full h-[calc(100vh-64px)] overflow-x-scroll p-8">{children}</div>
    </div>
  );
};

export default MainContent;
