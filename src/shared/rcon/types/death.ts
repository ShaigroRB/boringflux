import { createReverseMap } from '@shared/utils'

/** Research death types */
export const Deaths = {
  NORMAL: 0
  // research the other death types
}

export const DeathNames = createReverseMap(Deaths)
export type Death = (typeof Deaths)[keyof typeof Deaths]
