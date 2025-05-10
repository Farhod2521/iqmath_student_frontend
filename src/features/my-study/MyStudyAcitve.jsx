import React from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from '@heroui/table'
import { Button, Pagination, Progress, Select, SelectItem } from '@heroui/react'

const columns = [
  { label: '№', key: 'id' },
  { label: 'Дата начала', key: 'startTime' },
  { label: 'Дата завершения', key: 'endTime' },
  { label: 'Задачи', key: 'value' },
  { label: 'Оценка', key: 'stars' },
  { label: 'Прогресс', key: 'progress' },
  { label: 'Действие', key: 'buttonType' }
]

function MyStudyAcitve({ data }) {
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
          <Button className="m-0 p-0 h-8 rounded-md w-full" color="primary">
            {cellValue}
          </Button>
        )

      default:
        return cellValue
    }
  }, [])

  const [value, setValue] = React.useState(new Set(['10']))
  const pageSize = Number([...value][0]) || 10
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
              className="w-[160px]"
            >
              <SelectItem key="5">Показать по 5</SelectItem>
              <SelectItem key="10">Показать по 10</SelectItem>
              <SelectItem key="20">Показать по 20</SelectItem>
              <SelectItem key="50">Показать по 50</SelectItem>
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
              Показаны 1-{pageSize} из {data.length} элементов
            </p>
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>{(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MyStudyAcitve
