import React, { useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Progress,
  Select,
  SelectItem
} from '@heroui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

function Individual({ data }) {
  const { t } = useTranslation()

  const router = useRouter()

  const columns = [
    { label: '№', key: 'id' },
    { label: t('theme'), key: 'theme' },
    { label: t('startTime'), key: 'startTime' },
    { label: t('status'), key: 'status' },
    { label: t('stopTime'), key: 'endTime' },
    { label: t('progress'), key: 'progress' },
    { label: t('action'), key: 'action' }
  ]
  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data[columnKey]

    switch (columnKey) {
      case 'status':
        return <span className="text-green-500">{cellValue}</span>
      case 'progress':
        return (
          <div className="flex gap-4 w-[140px]">
            <Progress aria-label="Loading..." color="warning" value={cellValue} /> <span>{cellValue}%</span>
          </div>
        )
      case 'action':
        return (
          <Button
            onPress={() => router.push('/dashboard/student/individual/1')}
            className="m-0 p-0 h-8 rounded-md w-full"
            color={cellValue ? 'primary' : 'default'}
          >
            {cellValue ? t('continueTest') : t('begin')}
          </Button>
        )
      default:
        return cellValue
    }
  }, [])

  const [value, setValue] = React.useState(new Set(['100']))
  const pageSize = Number([...value][0]) || 100
  return (
    <div>
      <Table
        radius="sm"
        className="rounded-md"
        aria-label="Example static collection table"
        selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-between">
            <Select
              size="sm"
              aria-label="Example static collection table"
              selectedKeys={value}
              onSelectionChange={(e) => {
                e.size && setValue(e)
              }}
              radius="sm"
              className="w-[180px]"
            >
              {['100', '200', '500'].map((i) => (
                <SelectItem key={i}>{`${t('showby')} ${i}`}</SelectItem>
              ))}
            </Select>
            <Pagination
              isCompact
              showControls
              showShadow
              size="sm"
              radius="sm"
              color="primary"
              page={1}
              total={Math.ceil(data.length / pageSize)}
            />

            <p className="text-[15px] text-[#8a8a8e]">
              {t('paginationInfo', { pageSize: pageSize > data.length ? data.length : pageSize, total: data.length })}
            </p>
          </div>
        }
      >
        <TableHeader className="border">
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody className="border">
          {data.map((row) => (
            <TableRow className="border" key={row.id}>
              {(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Individual
