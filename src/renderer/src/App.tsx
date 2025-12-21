import {
  Alert,
  AppShell,
  Button,
  Container,
  Input,
  NumberInput,
  PasswordInput,
  Stack
} from '@mantine/core'
import { useInputState, useListState } from '@mantine/hooks'
import { EmittedRconEvent, Packet } from '@shared/rcon'
import { IconChevronDown, IconChevronUp, IconInfoCircle } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { useEffect, useState } from 'react'

const IconInfo = <IconInfoCircle />

function App(): React.JSX.Element {
  const [host, setHost] = useInputState('127.0.0.1')
  const [port, setPort] = useInputState<string | number>(42070)
  const [pwd, setPwd] = useInputState('admin')
  const [events, eventsHandlers] = useListState<{ EventID: string; Time: string; id: string }>([])
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const isConnected = events.length > 1

  const isRowExpanded = (id: string) => expandedRows[id] ?? false

  const toggleRowExpansion = (rowId: string) => {
    const isExpanded = isRowExpanded(rowId)
    setExpandedRows((current) => ({ ...current, [rowId]: !isExpanded }))
  }

  const rconConnect = (): void => window.api.rconConnect(host, Number(port), pwd)

  useEffect(() => {
    window.electron.ipcRenderer.on(EmittedRconEvent.NEW_RECEIVED_EVENT, (_, allEvents) => {
      eventsHandlers.setState(allEvents.toReversed())
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners(EmittedRconEvent.NEW_RECEIVED_EVENT)
    }
  })

  return (
    <AppShell padding="md" navbar={{ width: 300, breakpoint: 'xs' }}>
      <AppShell.Navbar>
        <Container>
          <Stack>
            <h2>RCON connection</h2>
            {!isConnected && (
              <>
                <Input.Wrapper label="Host">
                  <Input value={host} onChange={setHost} />
                </Input.Wrapper>
                <NumberInput label="Port" value={port} onChange={setPort} max={65535} min={0} />
                <PasswordInput label="Password" value={pwd} onChange={setPwd} />
              </>
            )}
            <Button disabled={isConnected} onClick={rconConnect}>
              {isConnected ? 'Connected' : 'Connect'}
            </Button>
            {isConnected && <>Disconnection is automatic when tool is closed.</>}
          </Stack>
        </Container>
      </AppShell.Navbar>
      <AppShell.Main>
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
              render: (record) =>
                isRowExpanded(record.id) ? <IconChevronUp /> : <IconChevronDown />
            },
            {
              accessor: 'EventID',
              title: 'Event',
              width: 200,
              render: (record) => <>{Packet.Event[record.EventID]}</>
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
      </AppShell.Main>
    </AppShell>
  )
}

export default App
