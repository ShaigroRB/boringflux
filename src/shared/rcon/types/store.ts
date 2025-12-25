import { createReverseMap } from '@shared/utils'

export const Stores = {
  STEAM: 0,
  DISCORD: 1,
  ITCHIO: 2,
  GAMEJOLT: 3
} as const

export const StoreNames = createReverseMap(Stores)
export type Store = (typeof Stores)[keyof typeof Stores]
