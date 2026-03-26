import { createReverseMap } from '@boringflux/utils'

export const AIModes = {
  DEFAULT: 0,
  DEACTIVATE: 1,
  PACIFIST: 2,
  PATHFIND_TO_HOST_MOUSE: 3,
  IGNORE_HUMANS: 4,
  IGNORE_BOTS: 5
  /**
   * `help(aimode)` says "6 = defend own spawn point from enemies"
   * but `aimode "6"` says it's not a valid AI mode.
   */
  // DEFEND_SPAWN // help(aimode) indicates this exists but it is not usable as a valid value
} as const

export const AIModeNames = createReverseMap(AIModes)
export type AIMode = (typeof AIModes)[keyof typeof AIModes]
