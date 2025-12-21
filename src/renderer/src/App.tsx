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
import { EmittedRconEvent } from '@shared/rcon'
import { useEffect } from 'react'
import { EventsTable } from './EventsTable'

function App(): React.JSX.Element {
  const [host, setHost] = useInputState('127.0.0.1')
  const [port, setPort] = useInputState<string | number>(42070)
  const [pwd, setPwd] = useInputState('admin')
  const [events, eventsHandlers] = useListState<{ EventID: string; Time: string; id: string }>([])

  useEffect(() => {
    window.electron.ipcRenderer.on(EmittedRconEvent.NEW_RECEIVED_EVENT, (_, allEvents) => {
      eventsHandlers.setState(allEvents.toReversed())
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners(EmittedRconEvent.NEW_RECEIVED_EVENT)
    }
  })

  const isConnected = events.length > 1

  const rconConnect = (): void => window.api.rconConnect(host, Number(port), pwd)

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
        <EventsTable events={events} />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
