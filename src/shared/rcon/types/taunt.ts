import { createReverseMap } from '@shared/utils'

export const Taunts = {
  BARF: 0,
  SMOKE: 1,
  DRINK: 2,
  WARCRY: 3,
  LETSGO: 4
} as const

export const TauntNames = createReverseMap(Taunts)

export type Taunt = (typeof Taunts)[keyof typeof Taunts]
