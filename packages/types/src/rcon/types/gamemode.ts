import { createReverseMap } from '@boringflux/utils'

export const Gamemodes = {
  DEATMATCH: 0, // todo: check all gamemodes
  ZOMBRAINS: 3,
  SURVIVAL: 4
} as const

export const GamemodeNames = createReverseMap(Gamemodes)
export type Gamemode = (typeof Gamemodes)[keyof typeof Gamemodes]
