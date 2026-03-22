import { Autocomplete, ScrollArea, Stack, Text } from '@mantine/core'
import { RconEvent, Constants } from '@shared/rcon'
import { gmlToHex } from './utils/colors'

export type ConsoleProps = {
  events: RconEvent[]
}
export const Console = ({ events }: ConsoleProps) => {
  return (
    <Stack>
      <ScrollArea h="400">
        <Stack p="8" gap="8" style={{ backgroundColor: '#1f1f1f' }}>
          {events
            .filter((e) => Number(e.EventID) === Constants.EventTypes.LOG_MESSAGE)
            .slice(-30)
            .toReversed()
            .map((e) => (
              <Text key={e.id} style={{ color: gmlToHex(e.Color) }}>
                {e.Message}
              </Text>
            ))}
        </Stack>
      </ScrollArea>
      <Autocomplete
        label="Command"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </Stack>
  )
}
