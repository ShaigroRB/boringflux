import { createReverseMap } from '@shared/utils'

export const TdmTeams = {
  DRAW: 0,
  USC: 1,
  THE_MAN: 2
} as const

export const TdmRoundEnds = {
  TIME: 0,
  ELIMINATION: 1,
  FLAG_CAPTURED: 2
} as const

export const TdmTeamNames = createReverseMap(TdmTeams)
export const TdmRoundEndNames = createReverseMap(TdmRoundEnds)

export type TdmTeam = (typeof TdmTeams)[keyof typeof TdmTeams]
export type TdmRoundEnd = (typeof TdmRoundEnds)[keyof typeof TdmRoundEnds]
