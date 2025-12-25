import { createReverseMap } from '@shared/utils'

export const CommandSources = {
  INGAME_CONSOLE: 0,
  RCON: 1
} as const

export const CommandSourceNames = createReverseMap(CommandSources)

export type CommandSource = (typeof CommandSources)[keyof typeof CommandSources]
