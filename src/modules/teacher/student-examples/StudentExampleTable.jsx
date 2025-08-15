import Image from "next/image";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ContentLoader from "@/components/loader/content-loader";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import StudentExamplePagination from "./StudentExamplePagination";

ModuleRegistry.registerModules([AllCommunityModule]);

function StudentExampleTable({ data, pagination, onPageChange, onPageSizeChange, isLoading, actionLoading, onViewDetails, context }) {
  const router = useRouter();
  const { t } = useTranslation();

  // Global funksiya sifatida saqlash
  if (typeof window !== 'undefined') {
    window.showCommentModal = context?.onShowComment || (() => {})
  }

  const formatDate = (dateString) => {
    // "2025 M06 30 20:28" formatini parse qilish
    const match = dateString.match(/(\d{4})\s+M(\d{2})\s+(\d{2})\s+(\d{2}):(\d{2})/);
    
    if (match) {
      const [, year, month, day, hour, minute] = match;
      
      // Oylar nomlari
      const monthNames = {
        '01': 'yanvar', '02': 'fevral', '03': 'mart', '04': 'aprel',
        '05': 'may', '06': 'iyun', '07': 'iyul', '08': 'avgust',
        '09': 'sentabr', '10': 'oktabr', '11': 'noyabr', '12': 'dekabr'
      };
      
      const monthName = monthNames[month] || month;
      
      return `${year} ${day}-${monthName} ${hour}:${minute}`;
    }
    
    // Agar format to'g'ri kelmasa, asl qiymatni qaytarish
    return dateString;
  };

  const formatTeacherDate = (dateString) => {
    try {
      const date = new Date(dateString);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'kutmoqda':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'tasdiqlangan':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rad etilgan':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'javob berilgan':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'kutmoqda':
        return t('waiting');
      case 'tasdiqlangan':
        return t('approved');
      case 'rad etilgan':
        return t('rejected');
      case 'javob berilgan':
        return 'Javob berilgan';
      default:
        return status;
    }
  };

  const colDefs = [
    {
      headerName: t("number"),
      valueGetter: "node.rowIndex + 1",
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      flex: 0.5,
      sortable: false,
      checkboxSelection: true,
      resizable: false,
    },
    {
      headerName: t("student"),
      field: "student_name",
      width: 200,
      minWidth: 150,
      maxWidth: 300,
      flex: 1.5,
      cellRenderer: (params) => (
        <div className={`flex items-center gap-2 cursor-pointer ${params.data.has_answers ? 'text-green-600' : ''}`}>
          <Image src={"/icons/pupil.svg"} alt="pupil" width={23} height={22} />
          <span className={`font-medium ${params.data.has_answers ? 'text-green-600' : ''}`}>{params.value}</span>
          {params.data.has_answers && (
            <div className="w-2 h-2 bg-green-500 rounded-full ml-1 flex-shrink-0"></div>
          )}
        </div>
      ),
    },
    {
      headerName: t("class"),
      field: "class_name",
      width: 180,
      minWidth: 120,
      maxWidth: 200,
      flex: 1,
      cellClass: "text-center",
    },
    {
      headerName: t("submittedTime"),
      field: "created_at",
      width: 180,
      minWidth: 130,
      maxWidth: 220,
      flex: 1.2,
      cellClass: "text-center",
      cellRenderer: (params) => {
        return formatDate(params.value);
      },
    },
    {
      headerName: t("status"),
      field: "status",
      width: 140,
      minWidth: 100,
      maxWidth: 160,
      flex: 0.8,
      cellRenderer: (params) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(params.value)}`}>
          {getStatusText(params.value)}
        </span>
      ),
    },
    {
      headerName: "Javob bergan o'qituvchi",
      field: "teacher.full_name",
      width: 200,
      minWidth: 150,
      maxWidth: 280,
      flex: 1.3,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-gray-400 italic text-xs">-</span>
        }
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 text-sm">{params.value}</span>
          </div>
        )
      },
    },
    {
      headerName: "Javob berilgan vaqti",
      field: "teacher.reviewed_at",
      width: 160,
      minWidth: 120,
      maxWidth: 180,
      flex: 1,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-gray-400 italic text-xs">-</span>
        }
        return (
          <span className="text-center">
            {formatTeacherDate(params.value)}
          </span>
        )
      },
    },
    {
      headerName: "Izoh",
      field: "teacher.commit",
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      flex: 0.5,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-gray-400 italic text-xs">-</span>
        }
        
        return (
          <div className="flex items-center justify-center">
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && window.showCommentModal) {
                  window.showCommentModal(params.value, params.data.student_name)
                }
              }}
              className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
              title="Izohni ko'rish"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        )
      },
    },
    {
      headerName: "",
      field: "actions",
      width: 120,
      minWidth: 80,
      maxWidth: 140,
      flex: 0.6,
      resizable: false,
      cellRenderer: (params) => {
        const isLoading = actionLoading[params.data.id];
        
        return (
          <div className="flex gap-2 justify-end">
            <button 
              onClick={() => onViewDetails(params.data.id, params.data.student_name)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
            >
              {t("details")}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <div style={{ width: "100%", height: "auto" }} className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <ContentLoader classNames="!min-h-[400px] !w-full" />
          </div>
        )}
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          domLayout="autoHeight"
          className="custom-grid"
          pagination={false}
          context={context}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            suppressSizeToFit: false,
            flex: 1,
          }}
          suppressColumnVirtualisation={false}
          suppressRowVirtualisation={false}
          suppressCellFocus={true}
          onGridReady={(params) => {
            params.api.setGridOption('context', context)
          }}
        />
      </div>
      <StudentExamplePagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default StudentExampleTable; 