import {
  AppShell,
  Button,
  Container,
  Input,
  NumberInput,
  PasswordInput,
  Stack
} from '@mantine/core'
import { useInputState, useListState } from '@mantine/hooks'
import { EmittedRconEvent, Event as RconEvent } from '@shared/rcon'
import { DataTable } from 'mantine-datatable'
import { useEffect } from 'react'

function App(): React.JSX.Element {
  const [host, setHost] = useInputState('127.0.0.1')
  const [port, setPort] = useInputState<string | number>(42070)
  const [pwd, setPwd] = useInputState('admin')
  const [events, eventsHandlers] = useListState<{ EventID: string; Time: string; id: string }>([])

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
            <Input.Wrapper label="Host">
              <Input value={host} onChange={setHost} />
            </Input.Wrapper>
            <NumberInput label="Port" value={port} onChange={setPort} max={65535} min={0} />
            <PasswordInput label="Password" value={pwd} onChange={setPwd} />
            <Button onClick={rconConnect}>Connect</Button>
          </Stack>
        </Container>
      </AppShell.Navbar>
      <AppShell.Main>
        <DataTable
          withColumnBorders
          highlightOnHover
          columns={[
            {
              accessor: 'id',
              hidden: true
            },
            {
              accessor: 'EventID',
              title: 'Event',
              width: 200,
              render: (record) => <>{RconEvent[record.EventID]}</>
            },
            { accessor: 'Time' }
          ]}
          records={events}
        />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
