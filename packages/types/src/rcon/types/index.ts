import { AIModes, AIModeNames } from './aimode'
import { BotDifficulties, BotDifficultyNames } from './botdifficulty'
import { CommandSources, CommandSourceNames } from './command'
import { CtfFlagReturns, CtfFlagReturnNames } from './ctf'
import { Deaths, DeathNames } from './death'
import { Enemies, EnemyRanks, EnemyNames, EnemyRankNames } from './enemy'
import { Gamemodes, GamemodeNames } from './gamemode'
import { Hats, HatNames } from './hat'
import { Missions, MissionNames } from './mission'
import { EventTypes, EventTypeNames, RequestTypes, RequestTypeNames } from './packet'
import { PowerUps, PowerUpNames } from './powerup'
import { Skins, SkinNames } from './skin'
import { Stores, StoreNames } from './store'
import { SurvivalObjectives, SurvivalObjectiveNames } from './survival'
import { Taunts, TauntNames } from './taunt'
import { TdmTeams, TdmTeamNames, TdmRoundEnds, TdmRoundEndNames } from './tdm'
import { Teams, TeamNames, TeamChannels, TeamChannelNames } from './team'
import { Vices, ViceNames } from './vice'
import { Weapons, WeaponNames } from './weapon'

export type { AIMode } from './aimode'
export type { BotDifficulty } from './botdifficulty'
export type { CommandSource } from './command'
export type { CtfFlagReturn } from './ctf'
export type { Death } from './death'
export type { Enemy, EnemyRank } from './enemy'
export type { Gamemode } from './gamemode'
export type { Hat } from './hat'
export type { Mission } from './mission'
export type { RequestType, EventType } from './packet'
export type { PowerUp } from './powerup'
export type { Skin } from './skin'
export type { Store } from './store'
export type { SurvivalObjective } from './survival'
export type { Taunt } from './taunt'
export type { TdmTeam, TdmRoundEnd } from './tdm'
export type { Team, TeamChannel } from './team'
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
  CommandSources,
  CommandSourceNames,
  CtfFlagReturns,
  CtfFlagReturnNames,
  Deaths,
  DeathNames,
  Enemies,
  EnemyRanks,
  EnemyNames,
  EnemyRankNames,
  Gamemodes,
  GamemodeNames,
  Hats,
  HatNames,
  Missions,
  MissionNames,
  PowerUps,
  PowerUpNames,
  Skins,
  SkinNames,
  Stores,
  StoreNames,
  SurvivalObjectives,
  SurvivalObjectiveNames,
  Taunts,
  TauntNames,
  TdmTeams,
  TdmTeamNames,
  TdmRoundEnds,
  TdmRoundEndNames,
  Teams,
  TeamNames,
  TeamChannels,
  TeamChannelNames,
  Vices,
  ViceNames,
  Weapons,
  WeaponNames
}
