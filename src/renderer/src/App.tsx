import {
  AppShell,
  Button,
  Container,
  Input,
  NumberInput,
  PasswordInput,
  Stack
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'

function App(): React.JSX.Element {
  const [host, setHost] = useInputState('127.0.0.1')
  const [port, setPort] = useInputState<string | number>(42070)
  const [pwd, setPwd] = useInputState('admin')

  const rconConnect = (): void =>
    window.electron.ipcRenderer.send('rcon_connect', { host, port, password: pwd })

  return (
    <AppShell padding="md">
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
      <AppShell.Main>{/* table of events */}</AppShell.Main>
    </AppShell>
  )
}

export default App
