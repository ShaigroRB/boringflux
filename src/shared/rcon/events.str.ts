/**
 * Event types in this file are simply parsed from the server
 * and all fields keep their string typing.
 *
 * It lives with `events.refined.ts` as only later usage in the UI & in the code
 * will tell which one is worth it.
 * It will be kept in the codebase as a resource of how JSONs are formatted by the game server.
 *
 * Note: `Profile` is also kept as a string for sake of simplicity.
 */

import { EventTypes, type RequestType, RequestTypes, type EventType } from './types/packet'

export type OgDefaultEntries<EventId extends EventType> = {
  /** Unique id added after receiving the packet. */
  id: string
  /** Unix timestamp the RCON event was sent. */
  Time: string
  /** The enum ID of the RCON event. */
  EventID: `${EventId}`
}

type SpecialRequestDataType = Extract<
  RequestType,
  | typeof RequestTypes.REQUEST_BOUNCE
  | typeof RequestTypes.REQUEST_MATCH
  | typeof RequestTypes.REQUEST_PLAYER
  | typeof RequestTypes.REQUEST_SCOREBOARD
>

/** Triggered when an RCON client makes a request. */
export type OgRequestDataDefaultEntries<CaseId extends SpecialRequestDataType> = OgDefaultEntries<
  typeof EventTypes.REQUEST_DATA
> & {
  /** The type of request sent to the server */
  CaseID: `${CaseId}`
  /** Can be used to tie it with the initial request sent to the server */
  RequestID: string
}

/** Data for Takeover flag spawned */
type FlagData = {
  /** The ID of the flag */
  FlagID: string
  /** The X position of the flag */
  FlagX: string
  /** The Y position of the flag */
  FlagY: string
}

/** Data for a player */
export type OgPlayerData = {
  /** The ID of the player in the server. Also the number listed after root PlayerData key */
  ID: string
  /** The name of the player. */
  Name: string
  /** The character color of the player */
  Color: string
  /** The ID of the team the player is on. (USC = 1, The Man = 2, Spectator = 3, Deathmatch = 0, Unknown/Not connected = -1) */
  Team: string
  /** How many kills the player currently has. */
  Kills: string
  /** How many deaths the player currently has. */
  Deaths: string
  /** How many assists the player currently has. */
  Assists: string
  /** The players current score. */
  Score: string
  /** The profile ID of the player. */
  Profile: string
  /** If the server is on Weapons Deal, this will return their current rank */
  WeaponsDealRank?: string
  /** What platform the player is on. (Steam, Gamejolt, etc) */
  Store: string
  /** Returns "1" if the player is currently alive, "0" for dead */
  Alive: string
  /** Returns "1" if this player is a bot. "0" for human. */
  Bot: string
  /** The ID of the current hat the player is wearing. */
  Hat: string
  /**
   * Don't know. No doc about this one. As players, we never found what or how this field works.
   * But it exists in local files and is sent by the server.
   */
  Hat2: string
  /** The current amount of money the player has in Survival or Zombrains. */
  Money: string
  /** The player's respawn cost needed to revive in Survival. */
  RespawnCost: string
  /** Returns "1" if the player owns Boring Man Premium, "0" if they are F2P. */
  Premium: string
  /** Returns the X coordinate of the player. If they are dead, this key will not be present. */
  X: string
  /** Returns the Y coordinate of the player. If they are dead, this key will not be present. */
  Y: string
  /** Returns the ID of the Steam Group the player's clan is associated with. Will be an empty string if not in a clan. */
  ClanID: string
  /** Returns the clan tag of the clan this player is in. Will be an empty string if not in a clan. */
  ClanTag: string
}

/** Triggers when the server starts. Although I'm not sure if it's possible to receive.. */
type ServerStartup = OgDefaultEntries<typeof EventTypes.SERVER_STARTUP>

/** Triggers when the server is shutdown. */
type ServerShutdown = OgDefaultEntries<typeof EventTypes.SERVER_SHUTDOWN>

/** Triggers when the server connects to the server list. */
type LobbyConnect = OgDefaultEntries<typeof EventTypes.LOBBY_CONNECT>

/** Triggers when the server loses connection to the server list. */
type LobbyDisconnect = OgDefaultEntries<typeof EventTypes.LOBBY_DISCONNECT>

/** Triggers when a new player connects to the server. */
type PlayerConnect = OgDefaultEntries<typeof EventTypes.PLAYER_CONNECT> & {
  /** The IP address of the connecting player. */
  IP: string
  /** The player name of the connecting player. */
  PlayerName: string
  /** The player ID of the connecting player. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** Returns whether the connecting player is an admin (1) or not (0). */
  IsAdmin: string
}

/**
 * Triggers when a player or NPC respawns.
 * The weapons returned are not always what the player selected in loadout;
 * use player_loadout for accurate loadout weapons.
 */
type PlayerSpawn = OgDefaultEntries<typeof EventTypes.PLAYER_SPAWN> & {
  /** The ID of the player who spawned. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** The X coordinate of where the player spawned. */
  X: string
  /** The Y coordinate of where the player spawned. */
  Y: string
  /** The hat ID of the player. */
  Hat: string
  /**
   * Don't know. No doc about this one. As players, we never found what or how this field works.
   * But it exists in local files and is sent by the server.
   */
  Hat2: string
  /** The player's name. */
  Name: string
  /** The player's character color in GML color code. */
  Color: string
  /** The team the player is on. */
  Team: string
  /** The player's primary weapon. */
  Weap1: string
  /** The player's holstered weapon. */
  Weap2: string
  /** The player's grenade or equipment third slot item. */
  Equip: string
  /** The player's offhand weapon when dual-wielding, otherwise 0. */
  OffWeap: string
  /** The player's offhand holstered weapon when dual-wielding compact weapons, otherwise 0. */
  OffWeap2: string
  /** If a Survival or Zombrains enemy, the enemy ID. */
  EnemyType?: string
  /** If a Survival enemy, the enemy rank ID (outline difficulty). */
  EnemyRank?: string
}

/** Triggers when a player dies. */
type PlayerDeath = OgDefaultEntries<typeof EventTypes.PLAYER_DEATH> & {
  /** ID of the player who was killed.*/
  VictimID: string
  /** ID of the player who killed the victim. */
  KillerID: string
  /** ID of the assisting player, -1 if none. */
  AssisterID: string
  /** The victim's profile info.
   *
   * - {"ProfileID":"","StoreID":"-1"} if zombie or survival enemy
   * - {"ProfileID":"bot<VictimID>","StoreID":"0"} if bot
   */
  VictimProfile: string
  /** The killer's profile info.
   *
   * - {"ProfileID":"","StoreID":"-1"} if zombie or survival enemy
   * - {"ProfileID":"bot<KillerID>","StoreID":"0"} if bot */
  KillerProfile: string
  /** The assisting player's profile info,
   *
   * - {"ProfileID":"","StoreID":"-1"} if zombie or survival enemy
   * - {"ProfileID":"bot<AssisterID>","StoreID":"0"} if bot
   */
  AssisterProfile: string
  /** The ID of the weapon used by the killer. */
  KillerWeapon: string
  /** Whether the kill was a headshot (or similar critical hit). */
  Headshot: string
  /** The death animation of the victim, if available. todo: find death ids */
  DeathType: string
  /** Returns "1" if the victim was killed by a Drone. The KillerWeapon should return the weapon used by the Drone. */
  Drone: string
  /** Whether the kill was a teamkill (Friendly Fire required). */
  Teamkill: string
  /** The X coordinate where the victim died, if available. */
  VictimX?: string
  /** The Y coordinate where the victim died, if available. */
  VictimY?: string
  /** The X coordinate of the killer when the victim died, if available. */
  KillerX?: string
  /** The Y coordinate of the killer when the victim died, if available. */
  KillerY?: string
  /** The X coordinate of the assisting player when the victim died, if available. */
  AssistX?: string
  /** The Y coordinate of the assisting player when the victim died, if available. */
  AssistY?: string
}

/** Triggers when a player disconnects from the server. */
type PlayerDisconnect = OgDefaultEntries<typeof EventTypes.PLAYER_DISCONNECT> & {
  /** The IP address of the disconnecting player. */
  IP: string
  /** The player ID of the disconnected player. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** Whether the disconnecting player is an admin (1) or not (0). */
  IsAdmin: string
  /** Whether the player was kicked/banned (1) or left voluntarily (0). */
  Kicked: string
  /** The kick reason string, if kicked or banned. */
  KickReason: string
}

/** Triggers when a player changes team. */
type PlayerTeamChange = OgDefaultEntries<typeof EventTypes.PLAYER_TEAM_CHANGE> & {
  /** Player ID of the player changing teams. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** Player's old team. */
  OldTeam: string
  /** Team the player is switching to. */
  NewTeam: string
  /** Whether the player was autobalanced (1) or not (0). */
  Autobalanced: string
}

/** Triggers when a player levels up. */
type PlayerLevelUp = OgDefaultEntries<typeof EventTypes.PLAYER_LEVEL_UP> & {
  /** ID of the player who leveled up. */
  ID: string
  /** The player's profile info. */
  Profile: string
  /** The new level of the player. */
  Level: string
  /** The weapon ID unlocked, if any. todo: find whether field exists or not (difference between undefined & null) */
  NewWeapon?: string
  /** The weapon ID of the unlocked weapon skin, if any. todo: find whether field exists or not */
  SkinWeapon?: string
  /** The skin ID of the unlocked weapon skin, if any. todo: find whether field exists or not */
  SkinType?: string
}

/** Triggers when a player gets a power-up. */
type PlayerGetPowerup = OgDefaultEntries<typeof EventTypes.PLAYER_GET_POWERUP> & {
  /** ID of the player who obtained the power-up. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** The ID of the power-up obtained. */
  PowerUp: string
  /** The X coordinate where the power-up was activated. */
  X: string
  /** The Y coordinate where the power-up was activated. */
  Y: string
}

/** Triggers when a player takes damage. (DISABLED FOR NOW) */
type PlayerDamage = OgDefaultEntries<typeof EventTypes.PLAYER_DAMAGE> & {
  /** Damage dealer's player ID. */
  AttackerID: string
  /** Damage recipient's player ID. */
  VictimID: string
  /** The attacker's profile info. */
  AttackerProfile: string
  /** The victim's profile info. */
  VictimProfile: string
  /** Whether the hit was a headshot (1) or not (0). */
  Headshot: string
  /** The amount of damage dealt. */
  Damage: string
}

/** Triggers when a player is finished loading their map. */
type PlayerLoaded = OgDefaultEntries<typeof EventTypes.PLAYER_LOADED> & {
  /** ID of the player who finished loading. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
}

/** Triggers when a Team Deathmatch round starts. */
type TdmRoundStart = OgDefaultEntries<typeof EventTypes.TDM_ROUND_START> & {
  /** How many USC players are alive when the round starts. */
  Alive1: string
  /** How many THE MAN players are alive when the round starts. */
  Alive2: string
  /** How many USC players are connected when the round starts. */
  Players1: string
  /** How many THE MAN players are connected when the round starts. */
  Players2: string
}

/** Triggers when a Team Deathmatch round ends. */
type TdmRoundEnd = OgDefaultEntries<typeof EventTypes.TDM_ROUND_END> & {
  /** How many USC players were connected when the round ended. */
  Players1: string
  /** How many THE MAN players were connected when the round ended. */
  Players2: string
  /** Who won the round. 0 = draw, 1 = USC, 2 = THE MAN. */
  Winner: string
  /** Current score of USC. */
  Score1: string
  /** Current score of THE MAN. */
  Score2: string
  /** How the round ended. 0=time, 1=elimination, 2=flag captured. */
  RoundEndType: string
  /** Whether the winning team had all players alive (not returned if only one player on the team). */
  Flawless: string
}

/** Triggers when the Team Deathmatch flag unlocks for capture. */
type TdmFlagUnlocked = OgDefaultEntries<typeof EventTypes.TDM_FLAG_UNLOCKED> & {
  /** How many USC players are alive when the flag unlocks. */
  Alive1: string
  /** How many THE MAN players are alive when the flag unlocks. */
  Alive2: string
  /** How many USC players are connected when the flag unlocks. */
  Players1: string
  /** How many THE MAN players are connected when the flag unlocks. */
  Players2: string
  /** X coordinate of the flag, if available. */
  FlagX?: string
  /** Y coordinate of the flag, if available. */
  FlagY?: string
}

/** Triggers when the server switches team sides in Team Deathmatch. */
type TdmSwitchSides = OgDefaultEntries<typeof EventTypes.TDM_SWITCH_SIDES> & {
  /** Updated score of USC. */
  Score1: string
  /** Updated score of THE MAN. */
  Score2: string
}

/** Triggers when a flag in CTF is stolen. */
type CtfTaken = OgDefaultEntries<typeof EventTypes.CTF_TAKEN> & {
  /** Player ID of the flag carrier. */
  CarrierID: string
  /** The player's profile info. */
  CarrierProfile: string
  /** Team ID of the flag that was stolen. */
  FlagTeam: string
  /** Whether the flag was taken from home base (1) or not (0). */
  WasHome: string
  /** X coordinate of the flag. */
  FlagX: string
  /** Y coordinate of the flag. */
  FlagY: string
}

/** Triggers when a flag in CTF is dropped. */
type CtfDropped = OgDefaultEntries<typeof EventTypes.CTF_DROPPED> & {
  /** Player ID of the flag carrier. */
  CarrierID: string
  /** The player's profile info. */
  CarrierProfile: string
  /** Team ID of the flag. */
  FlagTeam: string
  /** Whether the flag was purposely thrown. */
  Thrown: string
  /** X coordinate of the flag. */
  FlagX: string
  /** Y coordinate of the flag. */
  FlagY: string
}

/** Triggers when a flag is returned to home base. */
type CtfReturned = OgDefaultEntries<typeof EventTypes.CTF_RETURNED> & {
  /** Player ID of the flag returner, if available. */
  ReturnPlayerID: string
  /** The player's profile info, if available. */
  ReturnProfile?: string
  /** How the flag was returned. 0=voided,1=player,2=lava,3=timeout. */
  ReturnType: string
  /** X coordinate of the flag before it returned. */
  FlagX: string
  /** Y coordinate of the flag before it returned. */
  FlagY: string
}

/** Triggers when a team scores a CTF point. */
type CtfScored = OgDefaultEntries<typeof EventTypes.CTF_SCORED> & {
  /** Player ID of the scoring flag carrier. */
  CarrierID: string
  /** The player's profile info. */
  CarrierProfile: string
  /** Team ID of the scoring team. */
  ScoringTeam: string
  /** Score for USC. */
  Score1: string
  /** Score for THE MAN. */
  Score2: string
}

/** Triggers when a generator is repaired. */
type CtfGeneratorRepaired = OgDefaultEntries<typeof EventTypes.CTF_GENERATOR_REPAIRED> & {
  /** ID of the generator. */
  ID: string
  /** Team ID of the repaired generator. */
  Team: string
  /** Player ID of the repairer, if available. */
  RepairerID: string
  /** The player's profile info, if available. */
  RepairerProfile?: string
}

/** Triggers when a generator is destroyed. */
type CtfGeneratorDestroyed = OgDefaultEntries<typeof EventTypes.CTF_GENERATOR_DESTROYED> & {
  /** ID of the generator. */
  ID: string
  /** Team ID of the destroyed generator. */
  Team: string
  /** Player ID of the destroyer, if available. */
  KillerID: string
  /** The player's profile info, if available. */
  KillerProfile?: string
}

/** Triggers when a turret is repaired. */
type CtfTurretRepaired = OgDefaultEntries<typeof EventTypes.CTF_TURRET_REPAIRED> & {
  /** ID of the turret. */
  ID: string
  /** Team ID of the repaired turret. */
  Team: string
  /** Player ID of the repairer, if available. */
  RepairerID: string
  /** The player's profile info, if available. */
  RepairerProfile?: string
}

/** Triggers when a turret is destroyed. */
type CtfTurretDestroyed = OgDefaultEntries<typeof EventTypes.CTF_TURRET_DESTROYED> & {
  /** ID of the turret. */
  ID: string
  /** Team ID of the destroyed turret. */
  Team: string
  /** Player ID of the destroyer, if available. */
  KillerID: string
  /** The player's profile info, if available. */
  KillerProfile?: string
}

/** Triggers when a resupply station is repaired. */
type CtfResupplyRepaired = OgDefaultEntries<typeof EventTypes.CTF_RESUPPLY_REPAIRED> & {
  /** ID of the resupply station. */
  ID: string
  /** Team ID of the repaired resupply station. */
  Team: string
  /** Player ID of the repairer, if available. */
  RepairerID: string
  /** The player's profile info, if available. */
  RepairerProfile?: string
}

/** Triggers when a resupply station is destroyed. */
type CtfResupplyDestroyed = OgDefaultEntries<typeof EventTypes.CTF_RESUPPLY_DESTROYED> & {
  /** ID of the resupply station. */
  ID: string
  /** Team ID of the destroyed resupply station. */
  Team: string
  /** Player ID of the destroyer, if available. */
  KillerID: string
  /** The player's profile info, if available. */
  KillerProfile?: string
}

/** Triggers when the current match ends. */
type MatchEnd = OgDefaultEntries<typeof EventTypes.MATCH_END> & {
  /** The scoreboard string that displays the winner or outcome. */
  WinnerText: string
  /** The GML color code of the WinnerText string. */
  WinnerColor: string
  /** Player ID of the winner, or -1 if not applicable. */
  WinnerID: string
  /** Team ID of the winner, or -1 if not applicable. */
  WinnerTeam: string
  /** ID of the currently selected game mode. */
  GameModeID: string
  /** File path of the next map being loaded. */
  NextMapFile: string
  /** Name of the next map, if found; otherwise, falls back to the file name. */
  NextMap: string
  /** Additional JSON data for each player, matching rcon_receive.request_player format. */
  [K: `PlayerData${number}`]: OgPlayerData | undefined
}

/** Triggers when the match enters overtime. */
type MatchOvertime = OgDefaultEntries<typeof EventTypes.MATCH_OVERTIME>

/** Triggers when a new match starts (after warmup ends). */
type MatchStart = OgDefaultEntries<typeof EventTypes.MATCH_START> & {
  /** Name of the currently loaded map. */
  MapName: string
  /** File path of the currently loaded map. */
  MapFile: string
  /** ID of the currently selected game mode. */
  GameModeID: string
  /** Steam Workshop ID of the map, if available. */
  WorkshopID: string
  /** MD5 hash of the manifest bmap.txt file for consistency checking. */
  MD5: string
}

/** Triggers at the start of a new wave in Survival mode. */
type SurvivalNewWave = OgDefaultEntries<typeof EventTypes.SURVIVAL_NEW_WAVE> & {
  /** The current wave number. */
  WaveNumber: string
  /** Number of enemies required to be defeated this wave. */
  Enemies: string
  /** Number of chests that spawned this wave. */
  Chests: string
  /** Cost to open a chest for this wave. */
  ChestPrice: string
  /** Whether chest prices have crashed. */
  ChestCrash: string
}

/** Triggers when the control point flag unlocks for enemies to capture. */
type SurvivalWaveBegins = OgDefaultEntries<typeof EventTypes.SURVIVAL_WAVE_BEGINS> & {
  /** Objective ID assigned to the wave. */
  WaveObjective: string
  /** The current wave number. */
  WaveNumber: string
}

/** Triggers when a player opens a chest in Survival mode. */
type SurvivalBuyChest = OgDefaultEntries<typeof EventTypes.SURVIVAL_BUY_CHEST> & {
  /** Player ID of the player who opened the chest. */
  PlayerID: string
  /** The player's profile info. */
  Profile: string
  /** ID of the chest that was opened. */
  ChestID: string
  /** Cost to open the chest (Survival mode only). */
  ChestCost: string
  /** Player's money amount after buying the chest (Survival mode only). */
  PlayerMoney: string
}

/** Triggers when a message is logged into the server console. */
type LogMessage = OgDefaultEntries<typeof EventTypes.LOG_MESSAGE> & {
  /** The log message string. */
  Message: string
  /** The GML color code of the log message. */
  Color: string
}

/**
 * Response returned by the server to `request_player` request. Contains info about a specific player.
 *
 * Need verification with server response when current bug is fixed.
 * Current knonwn bug: request_data are received by the game server but the server doesn't send a response.
 */
/** */
type RequestPlayer = OgRequestDataDefaultEntries<typeof RequestTypes.REQUEST_PLAYER> & {
  /** Data of the requested player */
  [K: `PlayerData${number}`]: OgPlayerData
}

/**
 * Response sent by the server. Can only be triggered via the `rcon` command entered in console window of the server.
 *
 * This request can't be sent to the server via RCON.
 */
type RequestBounce = OgRequestDataDefaultEntries<typeof RequestTypes.REQUEST_BOUNCE> & {
  String: string
}

/** Response returned by the server to `request_match` request. Contains info about the match. */
type RequestMatch = OgRequestDataDefaultEntries<typeof RequestTypes.REQUEST_MATCH> & {
  /** Name of the server */
  ServerName: string
  /** The name of the game mode the server is currently running */
  GamemodeName: string
  /** The ID of the game mode the server is currently running */
  GamemodeID: string
  /** The name of the map the server is currently running */
  Map: string
  /** How many players are currently connected */
  Players: string
  /** The maximum amount of players allowed on the server */
  MaxPlayers: string
  /** How many 'ticks' are left in the time */
  TimeLeft: string
  /** The starting maximum amount of time the server is using, in 'ticks' */
  MaxTime: string
  /** A timestamp string of how much time is left */
  TimeStr: string
  /** "1" if the match is currently in overtime, "0" if not */
  Overtime: string
  /** The current version of the game the server is running */
  Version: string
  /** The maximum score needed to win the match, if available */
  MaxScore: string
  /** The current score of USC, if available */
  Team1Score?: string
  /** The current score of THE MAN, if available */
  Team2Score?: string
}

/** Response returned by the server to `request_scoreboard` request.
 * Contains some info about the match and info about each player on the server.
 */
type RequestScoreboard = OgRequestDataDefaultEntries<typeof RequestTypes.REQUEST_SCOREBOARD> & {
  /** Name of the server */
  ServerName: string
  /** The name of the game mode the server is currently running */
  GamemodeName: string
  /** The ID of the game mode the server is currently running */
  GamemodeID: string
  /** The name of the map the server is currently running */
  Map: string
  /** A timestamp string of how much time is left */
  TimeStr: string
  /** The current score of USC, if available */
  Team1Score?: string
  /** The current score of The Man, if available */
  Team2Score?: string
  /**
   * Additional JSON data for each player, matching rcon_receive.request_player format.
   *
   * This is a list in refined events cuz it's easier to deal with.
   */
  [K: `PlayerData${number}`]: OgPlayerData
}

/** Triggered when a command is entered into the console. */
type CommandEntered = OgDefaultEntries<typeof EventTypes.COMMAND_ENTERED> & {
  /** The full command string that was entered. */
  Command: string
  /** Source of the command. 0 = in-game console, 1 = RCON. */
  Source: string
  /** Console message generated from the executed command. */
  ReturnText: string
}

/** Triggered when an RCON client successfully logs in. */
type RconLoggedIn = OgDefaultEntries<typeof EventTypes.RCON_LOGGED_IN> & {
  /** IP address of the connected RCON client. */
  RconIP: string
  /** Port of the connected RCON client. */
  RconPort: string
  /** TCP socket ID of the connected RCON client. */
  RconSocket: string
  /** Current game mode ID on the server. */
  GameModeID: string
  /** Current map name on the server. */
  MapName: string
}

/** Triggered when the server is paused. */
type MatchPaused = OgDefaultEntries<typeof EventTypes.MATCH_PAUSED>

/** Triggered when the server is unpaused. */
type MatchUnpaused = OgDefaultEntries<typeof EventTypes.MATCH_UNPAUSED>

/** Triggered when the warmup phase begins. */
type WarmupStart = OgDefaultEntries<typeof EventTypes.WARMUP_START> & {
  /** Number of seconds the warmup phase will last. */
  WarmupTime: string
}

/** Triggered when an RCON client disconnects. */
type RconDisconnect = OgDefaultEntries<typeof EventTypes.RCON_DISCONNECT> & {
  /** IP address of the disconnecting RCON client. */
  RconIP: string
  /** Port of the disconnecting RCON client. */
  RconPort: string
  /** TCP socket ID of the disconnecting RCON client. */
  RconSocket: string
}

/** Triggered every 5 seconds for each connected RCON client. */
type RconPing = OgDefaultEntries<typeof EventTypes.RCON_PING>

/** Triggered when a player sends a chat message in the Server tab. */
type ChatMessage = OgDefaultEntries<typeof EventTypes.CHAT_MESSAGE> & {
  /** ID of the player sending the message, or -1 if sent by the server. */
  PlayerID: string
  /** Name of the user who sent the message. */
  Name: string
  /** The player's profile info, blank if sent by the server. */
  Profile: string
  /** The chat message text. */
  Message: string
  /** Chat channel: 0 = all, 1 or 2 = team only. */
  Team: string
}

/** Triggered when a player collects a vice in Survival mode. */
type SurvivalGetVice = OgDefaultEntries<typeof EventTypes.SURVIVAL_GET_VICE> & {
  /** ID of the player who collected the vice. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** ID of the vice type collected. */
  ViceID: string
  /** Amount collected (usually "1" unless Hot Wings vice modifies it). */
  Amount: string
  /** X coordinate of the vice location. */
  X: string
  /** Y coordinate of the vice location. */
  Y: string
}

/** Triggered when a player uses a consumable vice. */
type SurvivalUseVice = OgDefaultEntries<typeof EventTypes.SURVIVAL_USE_VICE> & {
  /** ID of the player who used the vice. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** ID of the vice that was consumed. */
  ViceID: string
}

/** Triggered when a player is revived outside of a new wave. */
type SurvivalPlayerRevive = OgDefaultEntries<typeof EventTypes.SURVIVAL_PLAYER_REVIVE> & {
  /** Player ID of the reviving player. */
  RevivingPlayerID: string
  /** Player ID of the savior (may match RevivingPlayerID if self-revived). */
  SaviorPlayerID: string
  /** Profile info of the reviving player. */
  RevivingProfile: string
  /** Profile info of the savior player. */
  SaviorProfile: string
  /** "1" if the savior used antacids vice. */
  Antacids: string
  /** Money cost of the revive; "1" if antacids were used. */
  Cost: string
}

/** Triggered when a player performs an emote/taunt. */
type PlayerTaunt = OgDefaultEntries<typeof EventTypes.PLAYER_TAUNT> & {
  /** ID of the emoting player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** ID of the emote used. */
  TauntID: string
}

/** Triggered when a player completes a Survival bar mission. */
type SurvivalCompleteMission = OgDefaultEntries<typeof EventTypes.SURVIVAL_COMPLETE_MISSION> & {
  /** ID of the player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** Reward amount (money or vice quantity). */
  Amount: string
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: string
  /** ID of the mission completed. */
  Mission: string
}

/** Triggered when a player accepts a Survival bar mission. */
type SurvivalTakeMission = OgDefaultEntries<typeof EventTypes.SURVIVAL_TAKE_MISSION> & {
  /** ID of the player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** Reward amount (money or vice quantity). */
  Amount: string
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: string
  /** ID of the mission accepted. */
  Mission: string
}

/** Triggered when a player fails or abandons a Survival bar mission. */
type SurvivalFailMission = OgDefaultEntries<typeof EventTypes.SURVIVAL_FAIL_MISSION> & {
  /** ID of the player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** Reward amount (money or vice quantity). */
  Amount: string
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: string
  /** ID of the mission failed. */
  Mission: string
}

/** Triggered when a zombie player revives (by kills or console). */
type ZombrainsRevive = OgDefaultEntries<typeof EventTypes.ZOMBRAINS_REVIVE> & {
  /** ID of the player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
}

/** Triggered when a player buys a weapon from a printer. */
type ZombrainsBuyWeapon = OgDefaultEntries<typeof EventTypes.ZOMBRAINS_BUY_WEAPON> & {
  /** ID of the purchasing player. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
  /** ID of the purchased weapon. */
  Weapon: string
  /** Money cost of the weapon. */
  Cost: string
}

/** Triggered when the match starts in Zombrains. */
type ZombrainsBegin = OgDefaultEntries<typeof EventTypes.ZOMBRAINS_BEGIN>

/** Triggered when the helicopter spawns to pick up surviving humans in Zombrains. */
type ZombrainsHelicopterArriving = OgDefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_ARRIVING
> & {
  /** X coordinate where the helicopter plans to land. */
  LandingX: string
  /** Y coordinate where the helicopter plans to land. */
  LandingY: string
}

/** Triggered when the helicopter reaches the landing zone and begins boarding humans in Zombrains. */
type ZombrainsHelicopterBoarding = OgDefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_BOARDING
> & {
  /** Current X coordinate of the helicopter. */
  X: string
  /** Current Y coordinate of the helicopter. */
  Y: string
}

/** Triggered when a human player boards the helicopter in Zombrains. */
type ZombrainsHelicopterPlayerBoarded = OgDefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_PLAYER_BOARDED
> & {
  /** ID of the player boarding the helicopter. */
  PlayerID: string
  /** Player profile/store info. */
  Profile: string
}

/** Triggered when the Zombrains match ends. */
type ZombrainsEnd = OgDefaultEntries<typeof EventTypes.ZOMBRAINS_END> & {
  /** Number of human players alive or escaped via helicopter. */
  Alive: string
  /** Number of zombie players. */
  Dead: string
}

/** Triggered on the exact frame the game ends (more precise than match_end). */
type GameOver = OgDefaultEntries<typeof EventTypes.GAME_OVER> & {
  /** Scoreboard winner text. */
  WinnerText: string
  /** GML color code of the winner text. */
  WinnerColor: string
  /** Player ID of the winner, or -1 if unavailable. */
  WinnerID: string
  /** Team ID of the winner, or -1 if unavailable. */
  WinnerTeam: string
  /** ID of the currently selected game mode. */
  GameModeID: string
  /** Name of the map that just ended. */
  CurrentMapName: string
  /** File path of the map that just ended. */
  CurrentMapFile: string
}

/** Triggered when the last human player (except the host) quits the server. */
type ServerEmpty = OgDefaultEntries<typeof EventTypes.SERVER_EMPTY> & {
  /** Number of player bots currently in the server. */
  Bots: string
  /** '1' if the host player is present, '0' if not (dedicated server). */
  Host: string
}
/** Triggered when a player ranks up or down in Weapons Deal and receives a new weapon. */
type WeaponsdealRankchange = OgDefaultEntries<typeof EventTypes.WEAPONSDEAL_RANKCHANGE> & {
  /** ID of the player whose rank changed. */
  PlayerID: string
  /** Player profile/store information (JSON string). */
  Profile: string
  /** The new Weapons Deal rank the player changed to. */
  WeaponsDealRank: string
}

/** Triggered when a team captures a flag in Take Over mode. */
type TakeoverFlagcapture = OgDefaultEntries<typeof EventTypes.TAKEOVER_FLAGCAPTURE> & {
  /** The ID of the flag that was captured. */
  FlagID: string
  /** X coordinate of the captured flag. */
  FlagX: string
  /** Y coordinate of the captured flag. */
  FlagY: string
  /** Team ID that captured the flag. */
  NewOwner: string
  /** Team ID of the other team (legacy field, may be removed). */
  LastOwner: string
  /** Number of flags currently owned by team 1 (USC). */
  FlagsTeamOne: string
  /** Number of flags currently owned by team 2 (THE MAN). */
  FlagsTeamTwo: string
}

/** Triggered when the match starts in Take Over or when flags are randomly cycled. */
type TakeoverFlagscreated = OgDefaultEntries<typeof EventTypes.TAKEOVER_FLAGSCREATED> & {
  /** Number of flags spawned in the match. */
  FlagAmount: string
  /** Current score of team 1 (USC). */
  Team1Score: string
  /** Current score of team 2 (THE MAN). */
  Team2Score: string
  /** Similar to how PlayerData# works, takover_flagscreated will return a set of JSONs that contain data for each flag spawned. */
  [K: `FlagData${number}`]: FlagData | undefined
}

/** Triggered when a player finishes using the loadout menu. */
type PlayerLoadout = OgDefaultEntries<typeof EventTypes.PLAYER_LOADOUT> & {
  /** ID of the player who selected their loadout. */
  PlayerID: string
  /** The player’s profile info. */
  Profile: string
  /** The player’s primary weapon. */
  Weap1: string
  /** The player’s holstered weapon. */
  Weap2: string
  /** Whether the player selected dual-wielding. */
  Dualwield: string
  /** The player’s grenade or equipment slot item. */
  Equip: string
  /** The player’s offhand weapon when dual-wielding (0 if not dual-wielding). */
  OffWeap: string
  /** The player’s offhand holstered weapon when dual-wielding compact weapons (0 if not dual-wielding). */
  OffWeap2: string
}

/** Triggered when a bomb is defused in Survival mode. */
type SurvivalBombDefused = OgDefaultEntries<typeof EventTypes.SURVIVAL_BOMB_DEFUSED> & {
  /** How much time was left on the bomb when it was defused. */
  TimeLeft: string
  /** ID of the player who defused the bomb. */
  Defuser: string
}

/** Triggered when a bomb explodes in Survival and ends the match. */
type SurvivalBombExploded = OgDefaultEntries<typeof EventTypes.SURVIVAL_BOMB_EXPLODED>

/** Triggered when Bomb Dude, Demolitions Guy, Operator or EXPLODEBOT 5000 re-arm a defused bomb. */
type SurvivalBombRearmed = OgDefaultEntries<typeof EventTypes.SURVIVAL_BOMB_REARMED> & {
  /** How much time is left on the bomb that was rearmed. */
  TimeLeft: string
}

/** Triggered if the dedicated server falls sleep to save power. */
type Sleep = OgDefaultEntries<typeof EventTypes.SLEEP>

/** Triggered if the dedicated server wakes from its power saving. */
type Wake = OgDefaultEntries<typeof EventTypes.WAKE>

export type OgRconEvent =
  | ServerStartup
  | ServerShutdown
  | LobbyConnect
  | LobbyDisconnect
  | PlayerConnect
  | PlayerSpawn
  | PlayerDeath
  | PlayerDisconnect
  | PlayerTeamChange
  | PlayerLevelUp
  | PlayerGetPowerup
  | PlayerDamage
  | PlayerLoaded
  | TdmRoundStart
  | TdmRoundEnd
  | TdmFlagUnlocked
  | TdmSwitchSides
  | CtfTaken
  | CtfDropped
  | CtfReturned
  | CtfScored
  | CtfGeneratorRepaired
  | CtfGeneratorDestroyed
  | CtfTurretRepaired
  | CtfTurretDestroyed
  | CtfResupplyRepaired
  | CtfResupplyDestroyed
  | MatchEnd
  | MatchOvertime
  | MatchStart
  | SurvivalNewWave
  | SurvivalWaveBegins
  | SurvivalBuyChest
  | LogMessage
  | RequestPlayer
  | RequestBounce
  | RequestMatch
  | RequestScoreboard
  | CommandEntered
  | RconLoggedIn
  | MatchPaused
  | MatchUnpaused
  | WarmupStart
  | RconDisconnect
  | RconPing
  | ChatMessage
  | SurvivalGetVice
  | SurvivalUseVice
  | SurvivalPlayerRevive
  | PlayerTaunt
  | SurvivalCompleteMission
  | SurvivalTakeMission
  | SurvivalFailMission
  | ZombrainsRevive
  | ZombrainsBuyWeapon
  | ZombrainsBegin
  | ZombrainsHelicopterArriving
  | ZombrainsHelicopterBoarding
  | ZombrainsHelicopterPlayerBoarded
  | ZombrainsEnd
  | GameOver
  | ServerEmpty
  | WeaponsdealRankchange
  | TakeoverFlagcapture
  | TakeoverFlagscreated
  | PlayerLoadout
  | SurvivalBombDefused
  | SurvivalBombExploded
  | SurvivalBombRearmed
  | Sleep
  | Wake

/**
 * To be used to transform any JSON in packets into typed events with all of their properties.
 */
export class EventStringTransformer {
  public static formatEvent = (eventStr: string): OgRconEvent => {
    const json = JSON.parse(eventStr) as OgRconEvent
    json.id = new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
    return json
  }
}
