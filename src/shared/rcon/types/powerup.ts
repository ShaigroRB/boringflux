import { createReverseMap } from '@shared/utils'

export const PowerUps = {
  TRIPLE_DAMAGE: 0,
  SUPER_SPEED: 1,
  REGENERATION: 2,
  INVISIBILITY: 3,
  BFG: 4,
  RANDOM: 'random'
} as const

export const PowerUpNames = createReverseMap(PowerUps)

export type PowerUp = (typeof PowerUps)[keyof typeof PowerUps]
