import { AIModes, AIModeNames } from './aimode'
import { BotDifficulties, BotDifficultyNames } from './botdifficulty'
import { Deaths, DeathNames } from './death'
import { Enemies, EnemyRanks, EnemyNames, EnemyRankNames } from './enemy'
import { Hats, HatNames } from './hat'
import { Missions, MissionNames } from './mission'
import { EventTypes, EventTypeNames, RequestTypes, RequestTypeNames } from './packet'
import { PowerUps, PowerUpNames } from './powerup'
import { Skins, SkinNames } from './skin'
import { Taunts, TauntNames } from './taunt'
import { Teams, TeamNames } from './team'
import { Vices, ViceNames } from './vice'
import { Weapons, WeaponNames } from './weapon'

export type { AIMode } from './aimode'
export type { BotDifficulty } from './botdifficulty'
export type { Death } from './death'
export type { Enemy, EnemyRank } from './enemy'
export type { Hat } from './hat'
export type { Mission } from './mission'
export type { RequestType, EventType } from './packet'
export type { PowerUp } from './powerup'
export type { Skin } from './skin'
export type { Taunt } from './taunt'
export type { Team } from './team'
export type { Vice } from './vice'
export type { Weapon } from './weapon'

export const Constants = {
  EventTypes,
  EventTypeNames,
  RequestTypes,
  RequestTypeNames,
  AIModes,
  AIModeNames,
  BotDifficulties,
  BotDifficultyNames,
  Deaths,
  DeathNames,
  Enemies,
  EnemyRanks,
  EnemyNames,
  EnemyRankNames,
  Hats,
  HatNames,
  Missions,
  MissionNames,
  PowerUps,
  PowerUpNames,
  Skins,
  SkinNames,
  Taunts,
  TauntNames,
  Teams,
  TeamNames,
  Vices,
  ViceNames,
  Weapons,
  WeaponNames
}
