import { createReverseMap } from '@shared/utils'

export const CtfFlagReturns = {
  VOIDED: 0,
  PLAYER: 1,
  LAVA: 2,
  TIMEOUT: 3
} as const

export const CtfFlagReturnNames = createReverseMap(CtfFlagReturns)
export type CtfFlagReturn = (typeof CtfFlagReturns)[keyof typeof CtfFlagReturns]
