import { createReverseMap } from '@shared/utils'

export const Skins = {
  INFERIOR: 0
  // identify other skin values (inferior, rare, normal, boring, ...)
} as const

export const SkinNames = createReverseMap(Skins)

export type Skin = (typeof Skins)[keyof typeof Skins]
