import { createReverseMap } from '@shared/utils'

export const BotDifficulties = {
  EASY: 0,
  NORMAL: 1,
  HARD: 2,
  CRUEL: 3,
  RANDOM: 4
} as const

export const BotDifficultyNames = createReverseMap(BotDifficulties)
export type BotDifficulty = (typeof BotDifficulties)[keyof typeof BotDifficulties]
