import { createReverseMap } from '@boringflux/utils'

export const Enemies = {
  CANNIBAL: 0,
  HOPPER: 1,
  BLUE_SOLDIER: 2,
  PURPLE: 3,
  SNIPER: 4,
  FLESHEATER: 5,
  BLUE_LIEUTENANT: 6,
  FUSCHIA: 7,
  LEAPER: 8,
  BOMB_DUDE: 9,
  DEMOLITION_GUY: 10,
  NINJA: 11,
  SAMURAI: 12,
  INDIGO: 13,
  BLUE_CAPTAIN: 14,
  GRANDMASTER: 15,
  EXPLODEBOT_5000: 16,
  ANTHROPOPHAGITE: 17,
  MOXXY: 18,
  ROXXY: 19,
  DISCIPLE: 20,
  MANLING: 21,
  OPERATOR: 22,
  COWBOY: 23,
  ARCHER: 24,
  ZOMBIE: 25,
  ZHOST: 26,
  ZPITTER: 27,
  ZOMIKAZE: 28,
  DOCTOR: 29
} as const

export const EnemyRanks = {
  NORMAL: 0,
  STRONG: 1,
  ELITE: 2,
  POWERFUL: 3,
  GOD_LIKE: 4
} as const

export const EnemyNames = createReverseMap(Enemies)
export const EnemyRankNames = createReverseMap(EnemyRanks)

export type Enemy = (typeof Enemies)[keyof typeof Enemies]
export type EnemyRank = (typeof EnemyRanks)[keyof typeof EnemyRanks]
