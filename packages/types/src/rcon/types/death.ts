import { createReverseMap } from '@boringflux/utils'

/** Research death types */
export const Deaths = {
  NORMAL: 0
  // research the other death types
  // goes at least up to 9
}

export const DeathNames = createReverseMap(Deaths)
export type Death = (typeof Deaths)[keyof typeof Deaths]
