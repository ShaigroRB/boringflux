import { createReverseMap } from '@shared/utils'

export const Teams = {
  UNKNOWN: -1,
  DEATMATCH: 0,
  USC: 1,
  THE_MAN: 2,
  SPECTATOR: 3
} as const

export const TeamNames = createReverseMap(Teams)

export type Team = (typeof Teams)[keyof typeof Teams]
