import Dashboard from "@/components/dashboard";
import EmptyPage from "@/components/empty-page";
import GridExample from "@/components/grid-table";
import ButtonCellRenderer from "@/components/grid-table/buttonCell";

const Index = () => {
  const rowData = [
    {
      id: "1",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 75,
    },
    {
      id: "2",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 0,
    },
    {
      id: "3",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 0,
    },
    {
      id: "4",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 0,
    },
    {
      id: "5",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 0,
    },
    {
      id: "6",
      theme: "Сравнение натуральных чисел.\nДвойное неравенство",
      startTime: "23:34, 10.01.2025",
      status: "Активный",
      endTime: "23:34, 10.01.2025",
      progress: 0,
    },
  ];

  const colDefs = [
    { headerName: "№", field: "id", width: 80 },
    { headerName: "Тема", field: "theme", flex: 2 },
    { headerName: "Дата назначения", field: "startTime", flex: 1 },
    {
      headerName: "Статус",
      field: "status",
      flex: 1,
      cellRenderer: () => <span className="text-green-500">Активный</span>,
    },
    { headerName: "Крайний срок", field: "endTime", flex: 1 },
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
      headerName: "Действие",
      field: "progress",
      cellRenderer: ({ value }) => (
        <ButtonCellRenderer
          url={"/dashboard/student/individual/"}
          value={value === 0 ? "Начать" : "Продолжить"}
        />
      ),
    },
  ];
  return (
    <Dashboard headerTitle={"Самостоятельные"}>
      {/* <EmptyPage
        title={"Пока еще нет самостоятельных заданий"}
        desc={" Самостоятельные задания будет назначать ваш учитель"}
      /> */}

      <GridExample rowData={rowData} colDefs={colDefs} />
    </Dashboard>
  );
};

export default Index;
