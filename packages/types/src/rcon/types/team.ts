import { createReverseMap } from '@boringflux/utils'

export const Teams = {
  UNKNOWN: -1,
  DEATMATCH: 0,
  USC: 1,
  THE_MAN: 2,
  SPECTATOR: 3
} as const

export const TeamChannels = {
  ALL: 0,
  TEAM_USC: 1,
  TEAM_THE_MAN: 2
} as const

export const TeamNames = createReverseMap(Teams)
export const TeamChannelNames = createReverseMap(TeamChannels)

export type Team = (typeof Teams)[keyof typeof Teams]
export type TeamChannel = (typeof TeamChannels)[keyof typeof TeamChannels]
