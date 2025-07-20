import Image from 'next/image'
import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useRouter } from 'next/router'
import ContentLoader from '@/components/loader/content-loader'

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import StudentPagination from './StudentPagination'
import { postLoginAsStudent } from '@/services/controllers'

ModuleRegistry.registerModules([AllCommunityModule])

function StudentTable({ data, pagination, onPageChange, onPageSizeChange, isLoading }) {
  const router = useRouter()

  const handleSignAsStudent = (s) => {
    postLoginAsStudent(s.id)
      .then((res) => {
        const oldAccessTeken = sessionStorage.getItem('access_token')
        sessionStorage.setItem('access_token', res.data?.access_token)
        sessionStorage.setItem('old_token', oldAccessTeken)
        router.push('/dashboard/student/subjects')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const colDefs = [
    {
      headerName: 'ID',
      field: 'id',
      maxWidth: 80,
      checkboxSelection: true
    },
    {
      headerName: 'Ученик',
      field: 'full_name',
      flex: 1.5,
      onCellClicked: (params) => {
        router.push(`/dashboard/teacher/pupils/${params.data.id}`)
      },
      cellRenderer: (params) => (
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={'/icons/pupil.svg'} alt="pupil" width={23} height={22} />
          <span className="font-medium">{params.value}</span>
        </div>
      )
    },
    {
      headerName: 'Класс',
      field: 'class_name_uz',
      maxWidth: 150,
      cellClass: 'text-center',
      cellRenderer: (params) => {
        const classText = params.value || ''
        const classNumber = classText.split(' ')[0]
        return classNumber
      }
    },
    {
      headerName: 'Телефон',
      field: 'phone',
      flex: 1
    },
    {
      headerName: 'Регион',
      field: 'region',
      flex: 1
    },
    {
      headerName: '',
      field: 'actions',
      flex: 2,
      cellRenderer: (p) => (
        <div className="flex gap-2 justify-end">
          {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm">
            Отправить смс
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
            Назначить задание
          </button> */}
          <button
            onClick={() => handleSignAsStudent(p.data)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Войти как студент
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="flex flex-col">
      <div style={{ width: '100%', height: 'auto' }} className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <ContentLoader classNames="!min-h-[400px]" />
          </div>
        )}
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          domLayout="autoHeight"
          className="custom-grid"
          pagination={false}
        />
      </div>
      <StudentPagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}

export default StudentTable
