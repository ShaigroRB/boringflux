import { createReverseMap } from '@shared/utils'

export const Skins = {
  PURPLE_STRIPED: 43,
  FADED_PINK: 60,
  FLIPPED: 111,
  OVERHEALED: 154
} as const

export const SkinNames = createReverseMap(Skins)

export type Skin = (typeof Skins)[keyof typeof Skins]
