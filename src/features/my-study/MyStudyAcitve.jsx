import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Pagination,
  Progress,
  Select,
  SelectItem
} from '@heroui/react'
import { useTranslation } from 'react-i18next'

function MyStudyAcitve({ data }) {
  const { t } = useTranslation()

  const columns = [
    { label: '№', key: 'id' },
    { label: t('startTime'), key: 'startTime' },
    { label: t('endTime'), key: 'endTime' },
    { label: t('task'), key: 'value' },
    { label: t('grade'), key: 'stars' },
    { label: t('progress'), key: 'progress' },
    { label: t('action'), key: 'buttonType' }
  ]

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey]

    switch (columnKey) {
      case 'progress':
        return (
          <div className="flex gap-4 w-[140px]">
            <Progress aria-label="Loading..." color="warning" value={cellValue} /> <span>{cellValue}%</span>
          </div>
        )
      case 'buttonType':
        return (
          <Button className="w-full h-8 p-0 m-0 rounded-md" color="primary">
            {cellValue}
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
          <div className="flex justify-between w-full">
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
        <TableHeader>
          {columns?.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data?.map((row) => (
            <TableRow className="border" key={row.id}>
              {(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MyStudyAcitve
