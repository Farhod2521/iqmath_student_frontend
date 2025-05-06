import Dashboard from "@/components/dashboard";
import GridExample from "@/components/grid-table";
import { useState } from "react";
import ProgressCellRenderer from "@/components/grid-table/progressCell";
import ButtonCellRenderer from "@/components/grid-table/buttonCell";

const Index = () => {
  const [tab, setTab] = useState("active");

  const handleTab = (tabName) => {
    setTab(tabName);
  };

  const rowData = [
    {
      id: "01",
      startTime: "10:00, 01.01.2024",
      endTime: "12:00, 01.01.2024",
      value: 15,
      progress: 75,
      stars: "⭐⭐⭐",
      buttonType: "Продолжить",
    },
    {
      id: "02",
      startTime: "14:00, 02.01.2024",
      endTime: "16:00, 02.01.2024",
      value: 20,
      progress: 45,
      stars: "⭐⭐⭐⭐",
      buttonType: "Продолжить",
    },
    {
      id: "03",
      startTime: "14:00, 02.01.2024",
      endTime: "16:00, 02.01.2024",
      value: 20,
      progress: 40,
      stars: "⭐⭐⭐",
      buttonType: "Продолжить",
    },
    {
      id: "04",
      startTime: "14:00, 02.01.2024",
      endTime: "16:00, 02.01.2024",
      value: 20,
      progress: 60,
      stars: "⭐⭐⭐",
      buttonType: "Продолжить",
    },
  ];

  const colDefs = [
    { headerName: "№", field: "id", width: 80 },
    { headerName: "Дата начала", field: "startTime", flex: 1 },
    { headerName: "Дата завершения", field: "endTime", flex: 1 },
    { headerName: "Задачи", field: "value" },
    { headerName: "Оценка", field: "stars" },
    {
      headerName: "Прогресс",
      field: "progress",
      flex: 1,
      cellRenderer: ({ value }) => (
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-3 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      ),
    },
    {
      headerName: "",
      field: "buttonType",
      cellRenderer: ButtonCellRenderer,
    },
  ];
  return (
    <Dashboard headerTitle={"Мое обучение"} tab={tab} handleTab={handleTab}>
      {tab === "active" ? (
        <GridExample rowData={rowData} colDefs={colDefs} />
      ) : (
        <p>Muzlatilgan darslar ro'yxati</p>
      )}
    </Dashboard>
  );
};

export default Index;
