import React from 'react'
import { useTranslation } from 'react-i18next'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

const ActivityTable = ({ activityData }) => {
  const { t } = useTranslation()

  const columnDefs = [
    {
      headerName: t('date'),
      field: 'date',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (params) => {
        const date = new Date(params.value)
        return date.toLocaleDateString('uz-UZ')
      }
    },
    {
      headerName: t('loginTime'),
      field: 'loginTime',
      sortable: true,
      filter: true,
      width: 120
    },
    {
      headerName: t('logoutTime'),
      field: 'logoutTime',
      sortable: true,
      filter: true,
      width: 120
    },
    {
      headerName: t('sessionDuration'),
      field: 'sessionDuration',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: t('testsCompleted'),
      field: 'testsCompleted',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (params) => {
        return `${params.value} ta`
      }
    },
    {
      headerName: t('subjects'),
      field: 'subjectsStudied',
      sortable: false,
      filter: true,
      flex: 1,
      cellRenderer: (params) => {
        return params.value?.join(', ') || '-'
      }
    },
    {
      headerName: t('pointsEarned'),
      field: 'pointsEarned',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (params) => {
        return `${params.value} ball`
      }
    },
    {
      headerName: t('status'),
      field: 'status',
      sortable: true,
      filter: true,
      width: 120,
      cellRenderer: (params) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {params.value === 'completed' ? t('completed') : t('inProgress')}
        </span>
      )
    }
  ]

  return (
    <div className="bg-white rounded-[12px]">
      <div className=" rounded-[8px] w-full">
        <div className="ag-theme-alpine w-full h-[400px]">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={activityData}
            pagination={false}
            paginationPageSize={10}
            domLayout="autoHeight"
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ActivityTable
