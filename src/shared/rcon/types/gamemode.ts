import { createReverseMap } from '@shared/utils'

export const Gamemodes = {
  DEATMATCH: 0 // todo: check all gamemodes
} as const

export const GamemodeNames = createReverseMap(Gamemodes)
export type Gamemode = (typeof Gamemodes)[keyof typeof Gamemodes]
