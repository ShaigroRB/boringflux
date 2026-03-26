import { createReverseMap } from '@boringflux/utils'

export const Missions = {
  KILL_EVERYTHING: 0,
  KILL_ENEMY: 1,
  KILL_WITH_WEAPON: 2,
  DELIVER_WEAPON: 3,
  DAMAGE: 4,
  FIND_INTEL: 5,
  SAVIOR: 6,
  KILL_BOSS: 7,
  KILL_ENEMY_WITH_WEAPON: 8,
  DEFUSE_BOMB: 9
} as const

export const MissionNames = createReverseMap(Missions)

export type Mission = (typeof Missions)[keyof typeof Missions]
