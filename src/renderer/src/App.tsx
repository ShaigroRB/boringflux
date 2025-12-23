import {
  AppShell,
  Button,
  Container,
  Divider,
  Input,
  Kbd,
  NavLink,
  NumberInput,
  PasswordInput,
  Stack
} from '@mantine/core'
import { useInputState, useListState } from '@mantine/hooks'
import { RconEvent } from '@shared/rcon'
import { EMITTED_EVENTS } from '@shared/events'
import { useEffect } from 'react'
import { EventsTable } from './EventsTable'
import { Link, Route, useLocation } from 'wouter'
import { IconBlocks, IconHome2, IconTerminal2 } from '@tabler/icons-react'

function App(): React.JSX.Element {
  const [host, setHost] = useInputState('127.0.0.1')
  const [port, setPort] = useInputState<string | number>(42070)
  const [pwd, setPwd] = useInputState('admin')
  const [events, eventsHandlers] = useListState<RconEvent>([])
  const [location] = useLocation()

  useEffect(() => {
    window.electron.ipcRenderer.on(EMITTED_EVENTS.main.UPDATE_ALL_EVENTS, (_, allEvents) => {
      eventsHandlers.setState(allEvents.toReversed())
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners(EMITTED_EVENTS.main.UPDATE_ALL_EVENTS)
    }
  })

  const isConnected = events.length > 1

  const rconConnect = (): void => window.api.rconConnect(host, Number(port), pwd)

  return (
    <AppShell padding="md" navbar={{ width: 340, breakpoint: 'xs' }}>
      <AppShell.Navbar>
        <Container>
          <Stack>
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

            <Divider />

            <NavLink
              component={Link}
              href="/"
              label="Server events"
              active={location === '/'}
              leftSection={<IconHome2 size={16} stroke={1.5} />}
              rightSection={<Kbd>V</Kbd>}
            />
            <NavLink
              component={Link}
              href="/console"
              label="Send a command"
              active={location === '/console'}
              leftSection={<IconTerminal2 size={16} stroke={1.5} />}
              rightSection={<Kbd>B</Kbd>}
            />
            <NavLink
              component={Link}
              href="/custom-commands"
              label="Custom commands"
              active={location === '/custom-commands'}
              leftSection={<IconBlocks size={16} stroke={1.5} />}
              rightSection={<Kbd>N</Kbd>}
              description="Create commands triggered by events"
            />
          </Stack>
        </Container>
      </AppShell.Navbar>
      <AppShell.Main>
        <Route path="/">
          <EventsTable events={events} />
        </Route>
        <Route path="/console">send command</Route>
        <Route path="/custom-commands">custom commands</Route>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
