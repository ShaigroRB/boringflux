import { createReverseMap } from '@boringflux/utils'

export const SurvivalObjectives = {
  DEFEND_FLAG: 0,
  DEFUSE_BOMB: 1 // Note: I'm assuming here since the server never send this one out.
} as const

export const SurvivalObjectiveNames = createReverseMap(SurvivalObjectives)
export type SurvivalObjective = (typeof SurvivalObjectives)[keyof typeof SurvivalObjectives]
