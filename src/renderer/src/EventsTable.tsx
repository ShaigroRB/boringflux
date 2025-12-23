import { Alert } from '@mantine/core'

import { IconChevronDown, IconChevronUp, IconInfoCircle } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { RconEvent, Packet } from '@shared/rcon'
import { useState } from 'react'

const IconInfo = <IconInfoCircle />

export type EventsTableProps = {
  events: RconEvent[]
}
export const EventsTable = ({ events }: EventsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const isRowExpanded = (id: string) => expandedRows[id] ?? false

  const toggleRowExpansion = (rowId: string) => {
    const isExpanded = isRowExpanded(rowId)
    setExpandedRows((current) => ({ ...current, [rowId]: !isExpanded }))
  }

  return (
    <>
      <Alert
        w="fit-content"
        variant="light"
        color="blue"
        title="Rows can be expanded to see all details of an event."
        icon={IconInfo}
      />
      <DataTable
        withColumnBorders
        highlightOnHover
        columns={[
          {
            accessor: 'id',
            title: '#',
            width: 50,
            render: (record) => (isRowExpanded(record.id) ? <IconChevronUp /> : <IconChevronDown />)
          },
          {
            accessor: 'EventID',
            title: 'Event',
            width: 200,
            render: (record) => <>{Packet.EventType[record.EventID]}</>
          },
          { accessor: 'Time' }
        ]}
        records={events}
        onRowClick={({ record }) => toggleRowExpansion(record.id)}
        rowExpansion={{
          allowMultiple: true,
          content: ({ record }) => <>{JSON.stringify(record, null, 2)}</>
        }}
      />
    </>
  )
}
