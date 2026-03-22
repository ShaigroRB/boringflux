/**
 * Event types in this file are considered to be "refined"
 * since the strings are parsed and transformed to types that make
 * more sense.
 *
 * It lives with `events.str.ts` as only later usage in the UI & in the code will tell
 * if it's worth it.
 *
 * todo: The refined types stop at `TdmRoundEnd`. Starts from there again.
 */
import { EventTypes, RequestTypes } from './types/packet'
import type {
  CommandSource,
  CtfFlagReturn,
  Death,
  Enemy,
  EnemyRank,
  EventType,
  Gamemode,
  Hat,
  Mission,
  PowerUp,
  RequestType,
  Skin,
  Store,
  SurvivalObjective,
  Taunt,
  TdmTeam,
  Team,
  TeamChannel,
  Vice,
  Weapon
} from './types'
import {
  EventStringTransformer,
  type OgDefaultEntries,
  type OgPlayerData,
  type OgRconEvent,
  type OgRequestDataDefaultEntries
} from './events.str'

type DefaultEntries<EventId extends EventType> = {
  /** Unique id added after receiving the packet. */
  id: string
  /** Unix timestamp the RCON event was sent. */
  Time: number
  /** The enum ID of the RCON event. */
  EventID: EventId
}

type ProfileInfo = {
  /** Player profile ID */
  ProfileID: string
  /** Player's store platform ID */
  Store: Store
}

/** Data for a player */
type PlayerData = {
  /** The ID of the player in the server. Also the number listed after root PlayerData key */
  ID: number
  /** The name of the player. */
  Name: string
  /** The character color of the player */
  Color: string
  /** The ID of the team the player is on. (USC = 1, The Man = 2, Spectator = 3, Deathmatch = 0, Unknown/Not connected = -1) */
  Team: Team
  /** How many kills the player currently has. */
  Kills: number
  /** How many deaths the player currently has. */
  Deaths: number
  /** How many assists the player currently has. */
  Assists: number
  /** The players current score. */
  Score: number
  /** The profile ID of the player. */
  ProfileID: ProfileInfo['ProfileID']
  /** What platform the player is on. (Steam, Gamejolt, etc) */
  Store: ProfileInfo['Store']
  /** If the server is on Weapons Deal, this will return their current rank */
  WeaponsDealRank?: number
  /** Returns "1" if the player is currently alive, "0" for dead */
  Alive: boolean
  /** Returns "1" if this player is a bot. "0" for human. */
  Bot: boolean
  /** The ID of the current hat the player is wearing. */
  Hat: Hat
  /** The current amount of money the player has in Survival or Zombrains. */
  Money: number
  /** The player's respawn cost needed to revive in Survival. */
  RespawnCost: number
  /** Returns "1" if the player owns Boring Man Premium, "0" if they are F2P. */
  Premium: boolean
  /** Returns the X coordinate of the player. If they are dead, this key will not be present. */
  X: number
  /** Returns the Y coordinate of the player. If they are dead, this key will not be present. */
  Y: number
  /** Returns the ID of the Steam Group the player's clan is associated with. Will be an empty string if not in a clan. */
  ClanID: string
  /** Returns the clan tag of the clan this player is in. Will be an empty string if not in a clan. */
  ClanTag: string
}

/** Data for Takeover flag spawned */
type FlagData = {
  /** The ID of the flag */
  FlagID: number
  /** The X position of the flag */
  FlagX: number
  /** The Y position of the flag */
  FlagY: number
}

/** Triggers when the server starts. Although I'm not sure if it's possible to receive.. */
type ServerStartup = DefaultEntries<typeof EventTypes.SERVER_STARTUP>

/** Triggers when the server is shutdown. */
type ServerShutdown = DefaultEntries<typeof EventTypes.SERVER_SHUTDOWN>

/** Triggers when the server connects to the server list. */
type LobbyConnect = DefaultEntries<typeof EventTypes.LOBBY_CONNECT>

/** Triggers when the server loses connection to the server list. */
type LobbyDisconnect = DefaultEntries<typeof EventTypes.LOBBY_DISCONNECT>

/** Triggers when a new player connects to the server. */
type PlayerConnect = DefaultEntries<typeof EventTypes.PLAYER_CONNECT> & {
  /** The IP address of the connecting player. */
  IP: string
  /** The player name of the connecting player. */
  PlayerName: string
  /** The player ID of the connecting player. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** Returns whether the connecting player is an admin (1) or not (0). */
  IsAdmin: boolean
}

/**
 * Triggers when a player or NPC respawns.
 * The weapons returned are not always what the player selected in loadout;
 * use player_loadout for accurate loadout weapons.
 */
type PlayerSpawn = DefaultEntries<typeof EventTypes.PLAYER_SPAWN> & {
  /** The ID of the player who spawned. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** The X coordinate of where the player spawned. */
  X: number
  /** The Y coordinate of where the player spawned. */
  Y: number
  /** The hat ID of the player. */
  Hat: Hat
  /** The player's name. */
  Name: string
  /** The player's character color in GML color code. */
  Color: string
  /** The team the player is on. */
  Team: Team
  /** The player's primary weapon. */
  Weap1: Weapon
  /** The player's holstered weapon. */
  Weap2: Weapon
  /** The player's grenade or equipment third slot item. */
  Equip: Weapon
  /** The player's offhand weapon when dual-wielding, otherwise 0. */
  OffWeap: Weapon | null
  /** The player's offhand holstered weapon when dual-wielding compact weapons, otherwise 0. */
  OffWeap2: Weapon | null
  /** If a Survival or Zombrains enemy, the enemy ID. */
  EnemyType?: Enemy
  /** If a Survival enemy, the enemy rank ID (outline difficulty). */
  EnemyRank?: EnemyRank
}

/** Triggers when a player dies. */
type PlayerDeath = DefaultEntries<typeof EventTypes.PLAYER_DEATH> & {
  /** ID of the player who was killed. */
  VictimID: number
  /** ID of the player who killed the victim. */
  KillerID: number
  /** ID of the assisting player, if any. */
  AssisterID: number | null
  /** The victim's profile info. */
  VictimProfile: ProfileInfo
  /** The killer's profile info. */
  KillerProfile: ProfileInfo
  /** The assisting player's profile info, if available. */
  AssisterProfile: ProfileInfo | null
  /** The ID of the weapon used by the killer. */
  KillerWeapon: Weapon
  /** Whether the kill was a headshot (or similar critical hit). */
  Headshot: boolean
  /** The death animation of the victim, if available. todo: find death ids */
  DeathType: Death
  /** Returns "1" if the victim was killed by a Drone. The KillerWeapon should return the weapon used by the Drone. */
  Drone: boolean
  /** Whether the kill was a teamkill (Friendly Fire required). */
  Teamkill: boolean
  /** The X coordinate where the victim died, if available. */
  VictimX?: number
  /** The Y coordinate where the victim died, if available. */
  VictimY?: number
  /** The X coordinate of the killer when the victim died, if available. */
  KillerX?: number
  /** The Y coordinate of the killer when the victim died, if available. */
  KillerY?: number
  /** The X coordinate of the assisting player when the victim died, if available. */
  AssistX?: number
  /** The Y coordinate of the assisting player when the victim died, if available. */
  AssistY?: number
}

/** Triggers when a player disconnects from the server. */
type PlayerDisconnect = DefaultEntries<typeof EventTypes.PLAYER_DISCONNECT> & {
  /** The IP address of the disconnecting player. */
  IP: string
  /** The player ID of the disconnected player. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** Whether the disconnecting player is an admin (1) or not (0). */
  IsAdmin: boolean
  /** Whether the player was kicked/banned (1) or left voluntarily (0). */
  Kicked: boolean
  /** The kick reason string, if kicked or banned. */
  KickReason: string
}

/** Triggers when a player changes team. */
type PlayerTeamChange = DefaultEntries<typeof EventTypes.PLAYER_TEAM_CHANGE> & {
  /** Player ID of the player changing teams. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** Player's old team. */
  OldTeam: Team
  /** Team the player is switching to. */
  NewTeam: Team
  /** Whether the player was autobalanced (1) or not (0). */
  Autobalanced: boolean
}

/** Triggers when a player levels up. */
type PlayerLevelUp = DefaultEntries<typeof EventTypes.PLAYER_LEVEL_UP> & {
  /** ID of the player who leveled up. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** The new level of the player. */
  Level: number
  /** The weapon ID unlocked, if any. todo: find whether field exists or not (difference between undefined & null) */
  NewWeapon?: Weapon
  /** The weapon ID of the unlocked weapon skin, if any. todo: find whether field exists or not */
  SkinWeapon?: Weapon
  /** The skin ID of the unlocked weapon skin, if any. todo: find whether field exists or not */
  SkinType?: Skin
}

/** Triggers when a player gets a power-up. */
type PlayerGetPowerup = DefaultEntries<typeof EventTypes.PLAYER_GET_POWERUP> & {
  /** ID of the player who obtained the power-up. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** The ID of the power-up obtained. */
  PowerUp: PowerUp
  /** The X coordinate where the power-up was activated. */
  X: number
  /** The Y coordinate where the power-up was activated. */
  Y: number
}

/** Triggers when a player takes damage. (DISABLED FOR NOW) */
type PlayerDamage = DefaultEntries<typeof EventTypes.PLAYER_DAMAGE> & {
  /** Damage dealer's player ID. */
  AttackerID: number
  /** Damage recipient's player ID. */
  VictimID: number
  /** The attacker's profile info. */
  AttackerProfile: ProfileInfo
  /** The victim's profile info. */
  VictimProfile: ProfileInfo
  /** Whether the hit was a headshot (1) or not (0). */
  Headshot: boolean
  /** The amount of damage dealt. */
  Damage: number
}

/** Triggers when a player is finished loading their map. */
type PlayerLoaded = DefaultEntries<typeof EventTypes.PLAYER_LOADED> & {
  /** ID of the player who finished loading. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
}

/** Triggers when a Team Deathmatch round starts. */
type TdmRoundStart = DefaultEntries<typeof EventTypes.TDM_ROUND_START> & {
  /** How many USC players are alive when the round starts. */
  Alive1: number
  /** How many THE MAN players are alive when the round starts. */
  Alive2: number
  /** How many USC players are connected when the round starts. */
  Players1: number
  /** How many THE MAN players are connected when the round starts. */
  Players2: number
}

/** Triggers when a Team Deathmatch round ends. */
type TdmRoundEnd = DefaultEntries<typeof EventTypes.TDM_ROUND_END> & {
  /** How many USC players were connected when the round ended. */
  Players1: number
  /** How many THE MAN players were connected when the round ended. */
  Players2: number
  /** Who won the round. 0 = draw, 1 = USC, 2 = THE MAN. */
  Winner: TdmTeam
  /** Current score of USC. */
  Score1: number
  /** Current score of THE MAN. */
  Score2: number
  /** How the round ended. 0=time, 1=elimination, 2=flag captured. */
  RoundEndType: TdmRoundEnd
  /** Whether the winning team had all players alive (not returned if only one player on the team). */
  Flawless?: boolean
}

/** Triggers when the Team Deathmatch flag unlocks for capture. */
type TdmFlagUnlocked = DefaultEntries<typeof EventTypes.TDM_FLAG_UNLOCKED> & {
  /** How many USC players are alive when the flag unlocks. */
  Alive1: number
  /** How many THE MAN players are alive when the flag unlocks. */
  Alive2: number
  /** How many USC players are connected when the flag unlocks. */
  Players1: number
  /** How many THE MAN players are connected when the flag unlocks. */
  Players2: number
  /** X coordinate of the flag, if available. */
  FlagX?: number
  /** Y coordinate of the flag, if available. */
  FlagY?: number
}

/** Triggers when the server switches team sides in Team Deathmatch. */
type TdmSwitchSides = DefaultEntries<typeof EventTypes.TDM_SWITCH_SIDES> & {
  /** Updated score of USC. */
  Score1: number
  /** Updated score of THE MAN. */
  Score2: number
}

/** Triggers when a flag in CTF is stolen. */
type CtfTaken = DefaultEntries<typeof EventTypes.CTF_TAKEN> & {
  /** Player ID of the flag carrier. */
  CarrierID: number
  /** The player's profile info. */
  CarrierProfile: ProfileInfo
  /** Team ID of the flag that was stolen. */
  FlagTeam: Team
  /** Whether the flag was taken from home base (1) or not (0). */
  WasHome: boolean
  /** X coordinate of the flag. */
  FlagX: number
  /** Y coordinate of the flag. */
  FlagY: number
}

/** Triggers when a flag in CTF is dropped. */
type CtfDropped = DefaultEntries<typeof EventTypes.CTF_DROPPED> & {
  /** Player ID of the flag carrier. */
  CarrierID: number
  /** The player's profile info. */
  CarrierProfile: ProfileInfo
  /** Team ID of the flag. */
  FlagTeam: Team
  /** Whether the flag was purposely thrown. */
  Thrown: boolean
  /** X coordinate of the flag. */
  FlagX: number
  /** Y coordinate of the flag. */
  FlagY: number
}

/** Triggers when a flag is returned to home base. */
type CtfReturned = DefaultEntries<typeof EventTypes.CTF_RETURNED> & {
  /** Player ID of the flag returner, if available. */
  ReturnPlayerID: number
  /** The player's profile info, if available. */
  ReturnProfile?: ProfileInfo
  /** How the flag was returned. 0=voided,1=player,2=lava,3=timeout. */
  ReturnType: CtfFlagReturn
  /** X coordinate of the flag before it returned. */
  FlagX: number
  /** Y coordinate of the flag before it returned. */
  FlagY: number
}

/** Triggers when a team scores a CTF point. */
type CtfScored = DefaultEntries<typeof EventTypes.CTF_SCORED> & {
  /** Player ID of the scoring flag carrier. */
  CarrierID: number
  /** The player's profile info. */
  CarrierProfile: ProfileInfo
  /** Team ID of the scoring team. */
  ScoringTeam: Team
  /** Score for USC. */
  Score1: number
  /** Score for THE MAN. */
  Score2: number
}

/** Triggers when a generator is repaired. */
type CtfGeneratorRepaired = DefaultEntries<typeof EventTypes.CTF_GENERATOR_REPAIRED> & {
  /** ID of the generator. */
  ID: number
  /** Team ID of the repaired generator. */
  Team: Team
  /** Player ID of the repairer, if available. */
  RepairerID?: number
  /** The player's profile info, if available. */
  RepairerProfile?: ProfileInfo
}

/** Triggers when a generator is destroyed. */
type CtfGeneratorDestroyed = DefaultEntries<typeof EventTypes.CTF_GENERATOR_DESTROYED> & {
  /** ID of the generator. */
  ID: number
  /** Team ID of the destroyed generator. */
  Team: Team
  /** Player ID of the destroyer, if available. */
  KillerID?: number
  /** The player's profile info, if available. */
  KillerProfile?: ProfileInfo
}

/** Triggers when a turret is repaired. */
type CtfTurretRepaired = DefaultEntries<typeof EventTypes.CTF_TURRET_REPAIRED> & {
  /** ID of the turret. */
  ID: number
  /** Team ID of the repaired turret. */
  Team: Team
  /** Player ID of the repairer, if available. */
  RepairerID?: number
  /** The player's profile info, if available. */
  RepairerProfile?: ProfileInfo
}

/** Triggers when a turret is destroyed. */
type CtfTurretDestroyed = DefaultEntries<typeof EventTypes.CTF_TURRET_DESTROYED> & {
  /** ID of the turret. */
  ID: number
  /** Team ID of the destroyed turret. */
  Team: Team
  /** Player ID of the destroyer, if available. */
  KillerID?: number
  /** The player's profile info, if available. */
  KillerProfile?: ProfileInfo
}

/** Triggers when a resupply station is repaired. */
type CtfResupplyRepaired = DefaultEntries<typeof EventTypes.CTF_RESUPPLY_REPAIRED> & {
  /** ID of the resupply station. */
  ID: number
  /** Team ID of the repaired resupply station. */
  Team: Team
  /** Player ID of the repairer, if available. */
  RepairerID?: number
  /** The player's profile info, if available. */
  RepairerProfile?: ProfileInfo
}

/** Triggers when a resupply station is destroyed. */
type CtfResupplyDestroyed = DefaultEntries<typeof EventTypes.CTF_RESUPPLY_DESTROYED> & {
  /** ID of the resupply station. */
  ID: number
  /** Team ID of the destroyed resupply station. */
  Team: Team
  /** Player ID of the destroyer, if available. */
  KillerID?: number
  /** The player's profile info, if available. */
  KillerProfile?: ProfileInfo
}

/** Triggers when the current match ends. */
type MatchEnd = DefaultEntries<typeof EventTypes.MATCH_END> & {
  /** The scoreboard string that displays the winner or outcome. */
  WinnerText: string
  /** The GML color code of the WinnerText string. */
  WinnerColor: string
  /** Player ID of the winner, or -1 if not applicable. */
  WinnerID: number | null
  /** Team ID of the winner, or -1 if not applicable. */
  WinnerTeam: Team | null
  /** ID of the currently selected game mode. */
  GameModeID: Gamemode
  /** File path of the next map being loaded. */
  NextMapFile: string
  /** Name of the next map, if found; otherwise, falls back to the file name. */
  NextMap: string
  /**
   * Additional JSON data for each player, matching rcon_receive.request_player format.
   *
   * This is a list in refined events cuz it's easier to deal with.
   */
  PlayersDatas: PlayerData[]
}

/** Triggers when the match enters overtime. */
type MatchOvertime = DefaultEntries<typeof EventTypes.MATCH_OVERTIME>

/** Triggers when a new match starts (after warmup ends). */
type MatchStart = DefaultEntries<typeof EventTypes.MATCH_START> & {
  /** Name of the currently loaded map. */
  MapName: string
  /** File path of the currently loaded map. */
  MapFile: string
  /** ID of the currently selected game mode. */
  GameModeID: Gamemode
  /** Steam Workshop ID of the map, if available. */
  WorkshopID: string
  /** MD5 hash of the manifest bmap.txt file for consistency checking. */
  MD5: string
}

/** Triggers at the start of a new wave in Survival mode. */
type SurvivalNewWave = DefaultEntries<typeof EventTypes.SURVIVAL_NEW_WAVE> & {
  /** The current wave number. */
  WaveNumber: number
  /** Number of enemies required to be defeated this wave. */
  Enemies: number
  /** Number of chests that spawned this wave. */
  Chests: number
  /** Cost to open a chest for this wave. */
  ChestPrice: number
  /** Whether chest prices have crashed. */
  ChestCrash: boolean
}

/** Triggers when the control point flag unlocks for enemies to capture.
 * Turns out this still triggers during Survival Classic or when the prep time is set to 0, will probably changed to save bandwidth.
 *
 * Note: This is only sent for the very first wave. It doesn't work for the other waves.
 */
type SurvivalWaveBegins = DefaultEntries<typeof EventTypes.SURVIVAL_WAVE_BEGINS> & {
  /** Objective ID assigned to the wave. */
  WaveObjective: SurvivalObjective
  /** The current wave number. */
  WaveNumber: number
}

/** Triggers when a player opens a chest in Survival mode. */
type SurvivalBuyChest = DefaultEntries<typeof EventTypes.SURVIVAL_BUY_CHEST> & {
  /** Player ID of the player who opened the chest. */
  PlayerID: number
  /** The player's profile info. */
  Profile: ProfileInfo
  /** ID of the chest that was opened. */
  ChestID: number
  /** Cost to open the chest (Survival mode only). */
  ChestCost: number
  /** Player's money amount after buying the chest (Survival mode only). */
  PlayerMoney: number
}

/** Triggers when a message is logged into the server console. */
type LogMessage = DefaultEntries<typeof EventTypes.LOG_MESSAGE> & {
  /** The log message string. */
  Message: string
  /** The GML color code of the log message. */
  Color: string
}

type SpecialRequestDataType = Extract<
  RequestType,
  | typeof RequestTypes.REQUEST_BOUNCE
  | typeof RequestTypes.REQUEST_MATCH
  | typeof RequestTypes.REQUEST_PLAYER
  | typeof RequestTypes.REQUEST_SCOREBOARD
>

// https://github.com/Spasman/rcon_example/tree/master?tab=readme-ov-file#sending-requests-and-processing-request_data
/** Triggered when an RCON client makes a request. */
type RequestDataDefaultEntries<CaseID extends SpecialRequestDataType> = DefaultEntries<
  typeof EventTypes.REQUEST_DATA
> & {
  /** The type of request sent to the server */
  CaseID: CaseID
  /** Can be used to tie it with the initial request sent to the server */
  RequestID: string
}

/**
 * Response returned by the server to `request_player` request. Contains info about a specific player.
 *
 * Need verification with server response when current bug is fixed.
 * Current knonwn bug: request_data are received by the game server but the server doesn't send a response.
 *
 * The doc is not clear what happens if the player is not found on the server. It says:
 * "You should get a request_data RCON event that contains the PlayerData# JSON you need. You won't get anything if the player wasn't found."
 * Not clear whether no response is returned at all OR the `PlayerData` field is not in the response.
 */
/** */
type RequestPlayer = RequestDataDefaultEntries<typeof RequestTypes.REQUEST_PLAYER> & {
  /** Data of the requested player */
  PlayerData?: PlayerData
}

/**
 * Response sent by the server. Can only be triggered via the `rcon` command entered in console window of the server.
 *
 * This request can't be sent to the server via RCON.
 */
type RequestBounce = RequestDataDefaultEntries<typeof RequestTypes.REQUEST_BOUNCE> & {
  String: string
}

/** Response returned by the server to `request_match` request. Contains info about the match. */
type RequestMatch = RequestDataDefaultEntries<typeof RequestTypes.REQUEST_MATCH> & {
  /** Name of the server */
  ServerName: string
  /** The name of the game mode the server is currently running */
  GamemodeName: string
  /** The ID of the game mode the server is currently running */
  GamemodeID: Gamemode
  /** The name of the map the server is currently running */
  Map: string
  /** How many players are currently connected */
  Players: number
  /** The maximum amount of players allowed on the server */
  MaxPlayers: number
  /** How many 'ticks' are left in the time */
  TimeLeft: number
  /** The starting maximum amount of time the server is using, in 'ticks' */
  MaxTime: number
  /** A timestamp string of how much time is left */
  TimeStr: string
  /** "1" if the match is currently in overtime, "0" if not */
  Overtime: boolean
  /** The current version of the game the server is running */
  Version: string
  /** The maximum score needed to win the match, if available */
  MaxScore: number
  /** The current score of USC, if available */
  Team1Score?: number
  /** The current score of THE MAN, if available */
  Team2Score?: number
}

/** Response returned by the server to `request_scoreboard` request.
 * Contains some info about the match and info about each player on the server.
 */
type RequestScoreboard = RequestDataDefaultEntries<typeof RequestTypes.REQUEST_SCOREBOARD> & {
  /** Name of the server */
  ServerName: string
  /** The name of the game mode the server is currently running */
  GamemodeName: string
  /** The ID of the game mode the server is currently running */
  GamemodeID: Gamemode
  /** The name of the map the server is currently running */
  Map: string
  /** A timestamp string of how much time is left */
  TimeStr: string
  /** The current score of USC, if available */
  Team1Score?: number
  /** The current score of The Man, if available */
  Team2Score?: number
  /**
   * Additional JSON data for each player, matching rcon_receive.request_player format.
   *
   * This is a list in refined events cuz it's easier to deal with.
   */
  PlayersDatas: PlayerData[]
}

/** Triggered when a command is entered into the console. */
type CommandEntered = DefaultEntries<typeof EventTypes.COMMAND_ENTERED> & {
  /** The full command string that was entered. */
  Command: string
  /** Source of the command. 0 = in-game console, 1 = RCON. */
  Source: CommandSource
  /** Console message generated from the executed command. */
  ReturnText: string
}

/** Triggered when an RCON client successfully logs in. */
type RconLoggedIn = DefaultEntries<typeof EventTypes.RCON_LOGGED_IN> & {
  /** IP address of the connected RCON client. */
  RconIP: string
  /** Port of the connected RCON client. */
  RconPort: string
  /** TCP socket ID of the connected RCON client. */
  RconSocket: string
  /** Current game mode ID on the server. */
  GameModeID: Gamemode
  /** Current map name on the server. */
  MapName: string
}

/** Triggered when the server is paused. */
type MatchPaused = DefaultEntries<typeof EventTypes.MATCH_PAUSED>

/** Triggered when the server is unpaused. */
type MatchUnpaused = DefaultEntries<typeof EventTypes.MATCH_UNPAUSED>

/** Triggered when the warmup phase begins. */
type WarmupStart = DefaultEntries<typeof EventTypes.WARMUP_START> & {
  /** Number of seconds the warmup phase will last. */
  WarmupTime: number
}

/** Triggered when an RCON client disconnects. */
type RconDisconnect = DefaultEntries<typeof EventTypes.RCON_DISCONNECT> & {
  /** IP address of the disconnecting RCON client. */
  RconIP: string
  /** Port of the disconnecting RCON client. */
  RconPort: string
  /** TCP socket ID of the disconnecting RCON client. */
  RconSocket: string
}

/** Triggered every 5 seconds for each connected RCON client. */
type RconPing = DefaultEntries<typeof EventTypes.RCON_PING>

/** Triggered when a player sends a chat message in the Server tab. */
type ChatMessage = DefaultEntries<typeof EventTypes.CHAT_MESSAGE> & {
  /** ID of the player sending the message, or -1 if sent by the server. */
  PlayerID: number
  /** Name of the user who sent the message. */
  Name: string
  /** The player's profile info, blank if sent by the server. */
  Profile: ProfileInfo | null
  /** The chat message text. */
  Message: string
  /** Chat channel: 0 = all, 1 or 2 = team only. */
  TeamChannel: TeamChannel
}

/** Triggered when a player collects a vice in Survival mode. */
type SurvivalGetVice = DefaultEntries<typeof EventTypes.SURVIVAL_GET_VICE> & {
  /** ID of the player who collected the vice. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** ID of the vice type collected. */
  ViceID: Vice
  /** Amount collected (usually "1" unless Hot Wings vice modifies it). */
  Amount: number
  /** X coordinate of the vice location. */
  X: number
  /** Y coordinate of the vice location. */
  Y: number
}

/** Triggered when a player uses a consumable vice. */
type SurvivalUseVice = DefaultEntries<typeof EventTypes.SURVIVAL_USE_VICE> & {
  /** ID of the player who used the vice. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** ID of the vice that was consumed. */
  ViceID: Vice
}

/** Triggered when a player is revived outside of a new wave. */
type SurvivalPlayerRevive = DefaultEntries<typeof EventTypes.SURVIVAL_PLAYER_REVIVE> & {
  /** Player ID of the reviving player. */
  RevivingPlayerID: number
  /** Player ID of the savior (may match RevivingPlayerID if self-revived). */
  SaviorPlayerID: number
  /** Profile info of the reviving player. */
  RevivingProfile: ProfileInfo
  /** Profile info of the savior player. */
  SaviorProfile: ProfileInfo
  /** "1" if the savior used antacids vice. */
  Antacids: boolean
  /** Money cost of the revive; "1" if antacids were used. */
  Cost: number | null
}

/** Triggered when a player performs an emote/taunt. */
type PlayerTaunt = DefaultEntries<typeof EventTypes.PLAYER_TAUNT> & {
  /** ID of the emoting player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** ID of the emote used. */
  TauntID: Taunt
}

/** Triggered when a player completes a Survival bar mission. */
type SurvivalCompleteMission = DefaultEntries<typeof EventTypes.SURVIVAL_COMPLETE_MISSION> & {
  /** ID of the player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** Reward amount (money or vice quantity). */
  Amount: number
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: Vice | null
  /** ID of the mission completed. */
  Mission: Mission
}

/** Triggered when a player accepts a Survival bar mission. */
type SurvivalTakeMission = DefaultEntries<typeof EventTypes.SURVIVAL_TAKE_MISSION> & {
  /** ID of the player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** Reward amount (money or vice quantity). */
  Amount: number
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: Vice | null
  /** ID of the mission accepted. */
  Mission: Mission
}

/** Triggered when a player fails or abandons a Survival bar mission. */
type SurvivalFailMission = DefaultEntries<typeof EventTypes.SURVIVAL_FAIL_MISSION> & {
  /** ID of the player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** Reward amount (money or vice quantity). */
  Amount: number
  /** Vice ID if reward is a vice; -1 means reward is money. */
  Vice: Vice | null
  /** ID of the mission failed. */
  Mission: Mission
}

/** Triggered when a zombie player revives (by kills or console). */
type ZombrainsRevive = DefaultEntries<typeof EventTypes.ZOMBRAINS_REVIVE> & {
  /** ID of the player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
}

/** Triggered when a player buys a weapon from a printer. */
type ZombrainsBuyWeapon = DefaultEntries<typeof EventTypes.ZOMBRAINS_BUY_WEAPON> & {
  /** ID of the purchasing player. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
  /** ID of the purchased weapon. */
  Weapon: Weapon
  /** Money cost of the weapon. */
  Cost: number
}

/** Triggered when the match starts in Zombrains. */
type ZombrainsBegin = DefaultEntries<typeof EventTypes.ZOMBRAINS_BEGIN>

/** Triggered when the helicopter spawns to pick up surviving humans in Zombrains. */
type ZombrainsHelicopterArriving = DefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_ARRIVING
> & {
  /** X coordinate where the helicopter plans to land. */
  LandingX: number
  /** Y coordinate where the helicopter plans to land. */
  LandingY: number
}

/** Triggered when the helicopter reaches the landing zone and begins boarding humans in Zombrains. */
type ZombrainsHelicopterBoarding = DefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_BOARDING
> & {
  /** Current X coordinate of the helicopter. */
  X: number
  /** Current Y coordinate of the helicopter. */
  Y: number
}

/** Triggered when a human player boards the helicopter in Zombrains. */
type ZombrainsHelicopterPlayerBoarded = DefaultEntries<
  typeof EventTypes.ZOMBRAINS_HELICOPTER_PLAYER_BOARDED
> & {
  /** ID of the player boarding the helicopter. */
  PlayerID: number
  /** Player profile/store info. */
  Profile: ProfileInfo
}

/** Triggered when the Zombrains match ends. */
type ZombrainsEnd = DefaultEntries<typeof EventTypes.ZOMBRAINS_END> & {
  /** Number of human players alive or escaped via helicopter. */
  Alive: number
  /** Number of zombie players. */
  Dead: number
}

/** Triggered on the exact frame the game ends (more precise than match_end). */
type GameOver = DefaultEntries<typeof EventTypes.GAME_OVER> & {
  /** Scoreboard winner text. */
  WinnerText: string
  /** GML color code of the winner text. */
  WinnerColor: string
  /** Player ID of the winner, or -1 if unavailable. */
  WinnerID: number
  /** Team ID of the winner, or -1 if unavailable. */
  WinnerTeam: Team
  /** ID of the currently selected game mode. */
  GameModeID: Gamemode
  /** Name of the map that just ended. */
  CurrentMapName: string
  /** File path of the map that just ended. */
  CurrentMapFile: string
}

/** Triggered when the last human player (except the host) quits the server. */
type ServerEmpty = DefaultEntries<typeof EventTypes.SERVER_EMPTY> & {
  /** Number of player bots currently in the server. */
  Bots: number
  /** '1' if the host player is present, '0' if not (dedicated server). */
  IsHostPresent: boolean
}
/** Triggered when a player ranks up or down in Weapons Deal and receives a new weapon. */
type WeaponsdealRankchange = DefaultEntries<typeof EventTypes.WEAPONSDEAL_RANKCHANGE> & {
  /** ID of the player whose rank changed. */
  PlayerID: number
  /** Player profile/store information (JSON string). */
  Profile: ProfileInfo
  /** The new Weapons Deal rank the player changed to. */
  WeaponsDealRank: number
}

/** Triggered when a team captures a flag in Take Over mode. */
type TakeoverFlagcapture = DefaultEntries<typeof EventTypes.TAKEOVER_FLAGCAPTURE> & {
  /** The ID of the flag that was captured. */
  FlagID: number
  /** X coordinate of the captured flag. */
  FlagX: number
  /** Y coordinate of the captured flag. */
  FlagY: number
  /** Team ID that captured the flag. */
  NewOwner: Team
  /** Team ID of the other team (legacy field, may be removed). */
  LastOwner: Team
  /** Number of flags currently owned by team 1 (USC). */
  FlagsUSC: number
  /** Number of flags currently owned by team 2 (THE MAN). */
  FlagsTHEMAN: number
}

/** Triggered when the match starts in Take Over or when flags are randomly cycled. */
type TakeoverFlagscreated = DefaultEntries<typeof EventTypes.TAKEOVER_FLAGSCREATED> & {
  /** Number of flags spawned in the match. */
  FlagAmount: number
  /** Current score of team 1 (USC). */
  TeamUSCScore: number
  /** Current score of team 2 (THE MAN). */
  TeamTHEMANScore: number
  /**
   * Additional JSON data for each flag spawned.
   *
   * This is a list in refined events cuz it's easier to deal with.
   */
  FlagsDatas: FlagData[]
}

/** Triggered when a player finishes using the loadout menu. */
type PlayerLoadout = DefaultEntries<typeof EventTypes.PLAYER_LOADOUT> & {
  /** ID of the player who selected their loadout. */
  PlayerID: number
  /** The player’s profile info. */
  Profile: ProfileInfo
  /** The player’s primary weapon. */
  Weap1: Weapon
  /** The player’s holstered weapon. */
  Weap2: Weapon
  /** Whether the player selected dual-wielding. */
  Dualwield: boolean
  /** The player’s grenade or equipment slot item. */
  Equip: Weapon
  /** The player’s offhand weapon when dual-wielding (0 if not dual-wielding). */
  OffWeap: Weapon | null
  /** The player’s offhand holstered weapon when dual-wielding compact weapons (0 if not dual-wielding). */
  OffWeap2: Weapon | null
}

/** Triggered when a bomb is defused in Survival mode. */
type SurvivalBombDefused = DefaultEntries<typeof EventTypes.SURVIVAL_BOMB_DEFUSED> & {
  /** How much time was left on the bomb when it was defused. */
  TimeLeft: number
  /** ID of the player who defused the bomb. */
  Defuser: number
}

/** Triggered when a bomb explodes in Survival and ends the match. */
type SurvivalBombExploded = DefaultEntries<typeof EventTypes.SURVIVAL_BOMB_EXPLODED>

/** Triggered when Bomb Dude, Demolitions Guy, Operator or EXPLODEBOT 5000 re-arm a defused bomb. */
type SurvivalBombRearmed = DefaultEntries<typeof EventTypes.SURVIVAL_BOMB_REARMED> & {
  /** How much time is left on the bomb that was rearmed. */
  TimeLeft: number
}

/** Triggered if the dedicated server falls sleep to save power. */
type Sleep = DefaultEntries<typeof EventTypes.SLEEP>

/** Triggered if the dedicated server wakes from its power saving. */
type Wake = DefaultEntries<typeof EventTypes.WAKE>

export type RconEvent =
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

function refineOgDefaultEntries<E extends EventType>(og: OgDefaultEntries<E>): DefaultEntries<E> {
  return {
    id: og.id,
    Time: Number(og.Time),
    EventID: Number(og.EventID) as E
  }
}

function refineOgRequestDataDefaultEntires<R extends SpecialRequestDataType>(
  og: OgRequestDataDefaultEntries<R>
): RequestDataDefaultEntries<R> {
  return {
    ...refineOgDefaultEntries(og),
    CaseID: Number(og.CaseID) as R,
    RequestID: og.RequestID
  }
}

function parseProfile(profile: string): ProfileInfo {
  const parsed = JSON.parse(profile)
  return {
    ProfileID: parsed.ProfileID,
    /**
     * https://github.com/Spasman/rcon_example/tree/master
     * The key is supposed to be "Store" but is "StoreID" when manually checking the server events.
     */
    Store: Number(parsed.StoreID) as Store
  }
}

// thanks typescript for not recognizing og as a specific event once I do Number(og.EventID)
// kinda ugly but it will do the trick
const ogEventTypes = Object.fromEntries(
  Object.entries(EventTypes).map(([keyof, val]) => [keyof, String(val)])
) as { [K in keyof typeof EventTypes]: `${(typeof EventTypes)[K]}` }

// same deal with `Number(og.CaseID)` when the response is related to a request made from RCON
const ogRequestTypes = Object.fromEntries(
  Object.entries(RequestTypes).map(([keyof, val]) => [keyof, String(val)])
) as { [K in keyof typeof RequestTypes]: `${(typeof RequestTypes)[K]}` }

function parseNumber<T>(value: string): T {
  return Number(value) as T
}

function parseBoolean(value: string): boolean {
  return Number(value) === 1
}

function parsePlayerIdAndProfile(og: { PlayerID: string; Profile: string }): {
  PlayerID: number
  Profile: ProfileInfo
} {
  return {
    PlayerID: parseNumber(og.PlayerID),
    Profile: parseProfile(og.Profile)
  }
}

function parsePlayerData(data: OgPlayerData): PlayerData {
  return {
    ID: parseNumber(data.ID),
    Name: data.Name,
    Color: data.Color,
    Team: parseNumber(data.Team),
    Kills: parseNumber(data.Kills),
    Deaths: parseNumber(data.Deaths),
    Assists: parseNumber(data.Assists),
    Score: parseNumber(data.Score),
    ProfileID: data.Profile,
    Store: parseNumber(data.Store),
    WeaponsDealRank: data.WeaponsDealRank ? parseNumber(data.WeaponsDealRank) : undefined,
    Alive: parseBoolean(data.Alive),
    Bot: parseBoolean(data.Bot),
    Hat: parseNumber(data.Hat),
    Money: parseNumber(data.Money),
    RespawnCost: parseNumber(data.RespawnCost),
    Premium: parseBoolean(data.Premium),
    X: parseNumber(data.X),
    Y: parseNumber(data.Y),
    ClanID: data.ClanID,
    ClanTag: data.ClanTag
  }
}

/**
 * To be used to transform any JSON in packets into typed events with all of their properties.
 */
export class EventRefinedTransformer {
  public static formatOgEvent = (og: OgRconEvent): RconEvent => {
    switch (og.EventID) {
      case ogEventTypes.SERVER_STARTUP: {
        return refineOgDefaultEntries(og) satisfies ServerStartup
      }
      case ogEventTypes.SERVER_SHUTDOWN: {
        return refineOgDefaultEntries(og) satisfies ServerShutdown
      }
      case ogEventTypes.LOBBY_CONNECT: {
        return refineOgDefaultEntries(og) satisfies LobbyConnect
      }
      case ogEventTypes.LOBBY_DISCONNECT: {
        return refineOgDefaultEntries(og) satisfies LobbyDisconnect
      }
      case ogEventTypes.PLAYER_CONNECT: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          IP: og.IP,
          PlayerName: og.PlayerName,
          IsAdmin: parseBoolean(og.IsAdmin)
        } satisfies PlayerConnect
      }
      case ogEventTypes.PLAYER_SPAWN: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          X: parseNumber(og.X),
          Y: parseNumber(og.Y),
          Hat: parseNumber(og.Hat),
          Name: og.Name,
          Color: og.Color,
          Team: parseNumber(og.Team),
          Weap1: parseNumber(og.Weap1),
          Weap2: parseNumber(og.Weap2),
          Equip: parseNumber(og.Equip),
          OffWeap: Number(og.OffWeap) !== 0 ? parseNumber(og.OffWeap) : null,
          OffWeap2: Number(og.OffWeap2) !== 0 ? parseNumber(og.OffWeap2) : null,
          EnemyType: og.EnemyType ? parseNumber(og.EnemyType) : undefined,
          EnemyRank: og.EnemyRank ? parseNumber(og.EnemyRank) : undefined
        } satisfies PlayerSpawn
      }
      case ogEventTypes.PLAYER_DEATH: {
        return {
          ...refineOgDefaultEntries(og),
          VictimID: parseNumber(og.VictimID),
          KillerID: parseNumber(og.KillerID),
          AssisterID: Number(og.AssisterID) !== -1 ? Number(og.AssisterID) : null,
          VictimProfile: parseProfile(og.VictimProfile),
          KillerProfile: parseProfile(og.KillerProfile),
          AssisterProfile:
            parseProfile(og.AssisterProfile).Store !== -1 ? parseProfile(og.AssisterProfile) : null,
          KillerWeapon: parseNumber(og.KillerWeapon),
          Headshot: parseBoolean(og.Headshot),
          DeathType: parseNumber(og.DeathType),
          Drone: parseBoolean(og.Drone),
          Teamkill: parseBoolean(og.Teamkill),
          VictimX: og.VictimX ? Number(og.VictimX) : undefined,
          VictimY: og.VictimY ? Number(og.VictimY) : undefined,
          KillerX: og.KillerX ? Number(og.KillerX) : undefined,
          KillerY: og.KillerY ? Number(og.KillerY) : undefined,
          AssistX: og.AssistX ? Number(og.AssistX) : undefined,
          AssistY: og.AssistY ? Number(og.AssistY) : undefined
        } satisfies PlayerDeath
      }
      case ogEventTypes.PLAYER_DISCONNECT: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          IP: og.IP,
          IsAdmin: parseBoolean(og.IsAdmin),
          Kicked: parseBoolean(og.Kicked),
          KickReason: og.KickReason
        } satisfies PlayerDisconnect
      }
      case ogEventTypes.PLAYER_TEAM_CHANGE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          OldTeam: parseNumber(og.OldTeam),
          NewTeam: parseNumber(og.NewTeam),
          Autobalanced: parseBoolean(og.Autobalanced)
        } satisfies PlayerTeamChange
      }
      case ogEventTypes.PLAYER_LEVEL_UP: {
        return {
          ...refineOgDefaultEntries(og),
          PlayerID: parseNumber(og.ID), // dont use specific parse function because 'ID' and not 'PlayerID'
          Profile: parseProfile(og.Profile),
          Level: parseNumber(og.Level),
          NewWeapon: og.NewWeapon ? parseNumber(og.NewWeapon) : undefined,
          SkinWeapon: og.SkinWeapon ? parseNumber(og.SkinWeapon) : undefined,
          SkinType: og.SkinType ? parseNumber(og.SkinType) : undefined
        } satisfies PlayerLevelUp
      }
      case ogEventTypes.PLAYER_GET_POWERUP: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          PowerUp: parseNumber(og.PowerUp),
          X: parseNumber(og.X),
          Y: Number(og.Y)
        } satisfies PlayerGetPowerup
      }
      case ogEventTypes.PLAYER_DAMAGE: {
        return {
          ...refineOgDefaultEntries(og),
          AttackerID: parseNumber(og.AttackerID),
          VictimID: parseNumber(og.VictimID),
          AttackerProfile: parseProfile(og.AttackerProfile),
          VictimProfile: parseProfile(og.VictimProfile),
          Headshot: parseBoolean(og.Headshot),
          Damage: Number(og.Damage)
        } satisfies PlayerDamage
      }
      case ogEventTypes.PLAYER_LOADED: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og)
        } satisfies PlayerLoaded
      }
      case ogEventTypes.TDM_ROUND_START: {
        return {
          ...refineOgDefaultEntries(og),
          Alive1: parseNumber(og.Alive1),
          Alive2: parseNumber(og.Alive2),
          Players1: parseNumber(og.Players1),
          Players2: parseNumber(og.Players2)
        } satisfies TdmRoundStart
      }
      case ogEventTypes.TDM_ROUND_END: {
        return {
          ...refineOgDefaultEntries(og),
          Players1: parseNumber(og.Players1),
          Players2: parseNumber(og.Players2),
          Winner: parseNumber(og.Winner),
          Score1: parseNumber(og.Score1),
          Score2: parseNumber(og.Score2),
          RoundEndType: parseNumber(og.RoundEndType),
          Flawless: og.Flawless ? parseBoolean(og.Flawless) : undefined
        } satisfies TdmRoundEnd
      }
      case ogEventTypes.TDM_FLAG_UNLOCKED: {
        return {
          ...refineOgDefaultEntries(og),
          Alive1: parseNumber(og.Alive1),
          Alive2: parseNumber(og.Alive2),
          Players1: parseNumber(og.Players1),
          Players2: parseNumber(og.Players2),
          FlagX: og.FlagX ? Number(og.FlagX) : undefined,
          FlagY: og.FlagY ? Number(og.FlagY) : undefined
        } satisfies TdmFlagUnlocked
      }
      case ogEventTypes.TDM_SWITCH_SIDES: {
        return {
          ...refineOgDefaultEntries(og),
          Score1: parseNumber(og.Score1),
          Score2: parseNumber(og.Score2)
        } satisfies TdmSwitchSides
      }

      case ogEventTypes.CTF_TAKEN: {
        return {
          ...refineOgDefaultEntries(og),
          CarrierID: parseNumber(og.CarrierID),
          CarrierProfile: parseProfile(og.CarrierProfile),
          FlagTeam: parseNumber(og.FlagTeam),
          WasHome: parseBoolean(og.WasHome),
          FlagX: parseNumber(og.FlagX),
          FlagY: Number(og.FlagY)
        } satisfies CtfTaken
      }
      case ogEventTypes.CTF_DROPPED: {
        return {
          ...refineOgDefaultEntries(og),
          CarrierID: parseNumber(og.CarrierID),
          CarrierProfile: parseProfile(og.CarrierProfile),
          FlagTeam: parseNumber(og.FlagTeam),
          Thrown: parseBoolean(og.Thrown),
          FlagX: parseNumber(og.FlagX),
          FlagY: Number(og.FlagY)
        } satisfies CtfDropped
      }
      case ogEventTypes.CTF_RETURNED: {
        return {
          ...refineOgDefaultEntries(og),
          ReturnPlayerID: parseNumber(og.ReturnPlayerID),
          ReturnProfile: og.ReturnProfile ? parseProfile(og.ReturnProfile) : undefined,
          ReturnType: parseNumber(og.ReturnType),
          FlagX: parseNumber(og.FlagX),
          FlagY: Number(og.FlagY)
        } satisfies CtfReturned
      }
      case ogEventTypes.CTF_SCORED: {
        return {
          ...refineOgDefaultEntries(og),
          CarrierID: parseNumber(og.CarrierID),
          CarrierProfile: parseProfile(og.CarrierProfile),
          ScoringTeam: parseNumber(og.ScoringTeam),
          Score1: parseNumber(og.Score1),
          Score2: parseNumber(og.Score2)
        } satisfies CtfScored
      }
      case ogEventTypes.CTF_GENERATOR_REPAIRED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          RepairerID: og.RepairerID ? parseNumber(og.RepairerID) : undefined,
          RepairerProfile: og.RepairerProfile ? parseProfile(og.RepairerProfile) : undefined
        } satisfies CtfGeneratorRepaired
      }
      case ogEventTypes.CTF_GENERATOR_DESTROYED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          KillerID: og.KillerID ? parseNumber(og.KillerID) : undefined,
          KillerProfile: og.KillerProfile ? parseProfile(og.KillerProfile) : undefined
        } satisfies CtfGeneratorDestroyed
      }
      case ogEventTypes.CTF_TURRET_REPAIRED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          RepairerID: og.RepairerID ? parseNumber(og.RepairerID) : undefined,
          RepairerProfile: og.RepairerProfile ? parseProfile(og.RepairerProfile) : undefined
        } satisfies CtfTurretRepaired
      }
      case ogEventTypes.CTF_TURRET_DESTROYED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          KillerID: og.KillerID ? parseNumber(og.KillerID) : undefined,
          KillerProfile: og.KillerProfile ? parseProfile(og.KillerProfile) : undefined
        } satisfies CtfTurretDestroyed
      }
      case ogEventTypes.CTF_RESUPPLY_REPAIRED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          RepairerID: og.RepairerID ? parseNumber(og.RepairerID) : undefined,
          RepairerProfile: og.RepairerProfile ? parseProfile(og.RepairerProfile) : undefined
        } satisfies CtfResupplyRepaired
      }
      case ogEventTypes.CTF_RESUPPLY_DESTROYED: {
        return {
          ...refineOgDefaultEntries(og),
          ID: parseNumber(og.ID),
          Team: parseNumber(og.Team),
          KillerID: og.KillerID ? parseNumber(og.KillerID) : undefined,
          KillerProfile: og.KillerProfile ? parseProfile(og.KillerProfile) : undefined
        } satisfies CtfResupplyDestroyed
      }

      case ogEventTypes.MATCH_END: {
        const datas: PlayerData[] = []

        for (const key in og) {
          if (key.startsWith('PlayerData')) {
            const data = og[key as `PlayerData${number}`]
            if (data) {
              datas.push(parsePlayerData(data))
            }
          }
        }

        return {
          ...refineOgDefaultEntries(og),
          WinnerText: og.WinnerText,
          WinnerColor: og.WinnerColor,
          WinnerID: Number(og.WinnerID) !== -1 ? parseNumber(og.WinnerID) : null,
          WinnerTeam: Number(og.WinnerTeam) !== -1 ? parseNumber(og.WinnerTeam) : null,
          GameModeID: parseNumber(og.GameModeID),
          NextMapFile: og.NextMapFile,
          NextMap: og.NextMap,
          PlayersDatas: datas
        } satisfies MatchEnd
      }
      case ogEventTypes.MATCH_OVERTIME: {
        return { ...refineOgDefaultEntries(og) } satisfies MatchOvertime
      }
      case ogEventTypes.MATCH_START: {
        return {
          ...refineOgDefaultEntries(og),
          MapName: og.MapName,
          MapFile: og.MapFile,
          GameModeID: parseNumber(og.GameModeID),
          WorkshopID: og.WorkshopID,
          MD5: og.MD5
        } satisfies MatchStart
      }

      case ogEventTypes.SURVIVAL_NEW_WAVE: {
        return {
          ...refineOgDefaultEntries(og),
          WaveNumber: parseNumber(og.WaveNumber),
          Enemies: parseNumber(og.Enemies),
          Chests: parseNumber(og.Chests),
          ChestPrice: parseNumber(og.ChestPrice),
          ChestCrash: parseBoolean(og.ChestCrash)
        } satisfies SurvivalNewWave
      }
      case ogEventTypes.SURVIVAL_WAVE_BEGINS: {
        return {
          ...refineOgDefaultEntries(og),
          WaveNumber: parseNumber(og.WaveNumber),
          WaveObjective: parseNumber(og.WaveObjective)
        } satisfies SurvivalWaveBegins
      }
      case ogEventTypes.SURVIVAL_BUY_CHEST: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          ChestID: parseNumber(og.ChestID),
          ChestCost: parseNumber(og.ChestCost),
          PlayerMoney: parseNumber(og.PlayerMoney)
        } satisfies SurvivalBuyChest
      }

      case ogEventTypes.LOG_MESSAGE: {
        return {
          ...refineOgDefaultEntries(og),
          Message: og.Message,
          Color: og.Color
        } satisfies LogMessage
      }
      case ogEventTypes.REQUEST_DATA: {
        switch (og.CaseID) {
          case ogRequestTypes.REQUEST_PLAYER: {
            let player: PlayerData | undefined = undefined

            for (const key in og) {
              if (key.startsWith('PlayerData')) {
                const data = og[key as `PlayerData${number}`]
                if (data) {
                  player = parsePlayerData(data)
                }
              }
            }
            return {
              ...refineOgRequestDataDefaultEntires(og),
              PlayerData: player
            } satisfies RequestPlayer
          }
          case ogRequestTypes.REQUEST_BOUNCE: {
            return {
              ...refineOgRequestDataDefaultEntires(og),
              String: og.String
            } satisfies RequestBounce
          }
          case ogRequestTypes.REQUEST_MATCH: {
            return {
              ...refineOgRequestDataDefaultEntires(og),
              ServerName: og.ServerName,
              GamemodeName: og.GamemodeName,
              GamemodeID: parseNumber(og.GamemodeID),
              Map: og.Map,
              Players: parseNumber(og.Players),
              MaxPlayers: parseNumber(og.MaxPlayers),
              TimeLeft: parseNumber(og.TimeLeft),
              MaxTime: parseNumber(og.MaxTime),
              TimeStr: og.TimeStr,
              Overtime: parseBoolean(og.Overtime),
              Version: og.Version,
              MaxScore: parseNumber(og.MaxScore),
              Team1Score: og.Team1Score ? parseNumber(og.Team1Score) : undefined,
              Team2Score: og.Team2Score ? parseNumber(og.Team2Score) : undefined
            } satisfies RequestMatch
          }

          case ogRequestTypes.REQUEST_SCOREBOARD: {
            const datas: PlayerData[] = []

            for (const key in og) {
              if (key.startsWith('PlayerData')) {
                const data = og[key as `PlayerData${number}`]
                if (data) {
                  datas.push(parsePlayerData(data))
                }
              }
            }

            return {
              ...refineOgRequestDataDefaultEntires(og),
              ServerName: og.ServerName,
              GamemodeName: og.GamemodeName,
              GamemodeID: parseNumber(og.GamemodeID),
              Map: og.Map,
              TimeStr: og.TimeStr,
              Team1Score: og.Team1Score ? parseNumber(og.Team1Score) : undefined,
              Team2Score: og.Team2Score ? parseNumber(og.Team2Score) : undefined,
              PlayersDatas: datas
            } satisfies RequestScoreboard
          }
        }
      }
      case ogEventTypes.COMMAND_ENTERED: {
        return {
          ...refineOgDefaultEntries(og),
          Command: og.Command,
          Source: parseNumber(og.Source),
          ReturnText: og.ReturnText
        } satisfies CommandEntered
      }
      case ogEventTypes.RCON_LOGGED_IN: {
        return {
          ...refineOgDefaultEntries(og),
          RconIP: og.RconIP,
          RconPort: og.RconPort,
          RconSocket: og.RconSocket,
          GameModeID: parseNumber(og.GameModeID),
          MapName: og.MapName
        } satisfies RconLoggedIn
      }

      case ogEventTypes.MATCH_PAUSED: {
        return { ...refineOgDefaultEntries(og) } satisfies MatchPaused
      }
      case ogEventTypes.MATCH_UNPAUSED: {
        return { ...refineOgDefaultEntries(og) } satisfies MatchUnpaused
      }
      case ogEventTypes.WARMUP_START: {
        return {
          ...refineOgDefaultEntries(og),
          WarmupTime: parseNumber(og.WarmupTime)
        } satisfies WarmupStart
      }

      case ogEventTypes.RCON_DISCONNECT: {
        return {
          ...refineOgDefaultEntries(og),
          RconIP: og.RconIP,
          RconPort: og.RconPort,
          RconSocket: og.RconSocket
        } satisfies RconDisconnect
      }
      case ogEventTypes.RCON_PING: {
        return { ...refineOgDefaultEntries(og) } satisfies RconPing
      }
      case ogEventTypes.CHAT_MESSAGE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Name: og.Name,
          Message: og.Message,
          TeamChannel: parseNumber(og.Team)
        } satisfies ChatMessage
      }

      case ogEventTypes.SURVIVAL_GET_VICE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          ViceID: parseNumber(og.ViceID),
          Amount: parseNumber(og.Amount),
          X: parseNumber(og.X),
          Y: parseNumber(og.Y)
        } satisfies SurvivalGetVice
      }
      case ogEventTypes.SURVIVAL_USE_VICE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          ViceID: parseNumber(og.ViceID)
        } satisfies SurvivalUseVice
      }
      case ogEventTypes.SURVIVAL_PLAYER_REVIVE: {
        return {
          ...refineOgDefaultEntries(og),
          RevivingPlayerID: parseNumber(og.RevivingPlayerID),
          RevivingProfile: parseProfile(og.RevivingProfile),
          SaviorPlayerID: parseNumber(og.SaviorPlayerID),
          SaviorProfile: parseProfile(og.SaviorProfile),
          Antacids: parseBoolean(og.Antacids),
          Cost: Number(og.Cost) !== 1 ? parseNumber(og.Cost) : null
        } satisfies SurvivalPlayerRevive
      }

      case ogEventTypes.PLAYER_TAUNT: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          TauntID: parseNumber(og.TauntID)
        } satisfies PlayerTaunt
      }

      case ogEventTypes.SURVIVAL_COMPLETE_MISSION: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Amount: parseNumber(og.Amount),
          Vice: Number(og.Vice) !== -1 ? parseNumber(og.Vice) : null,
          Mission: parseNumber(og.Mission)
        } satisfies SurvivalCompleteMission
      }
      case ogEventTypes.SURVIVAL_TAKE_MISSION: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Amount: parseNumber(og.Amount),
          Vice: Number(og.Vice) !== -1 ? parseNumber(og.Vice) : null,
          Mission: parseNumber(og.Mission)
        } satisfies SurvivalTakeMission
      }
      case ogEventTypes.SURVIVAL_FAIL_MISSION: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Amount: parseNumber(og.Amount),
          Vice: Number(og.Vice) !== -1 ? parseNumber(og.Vice) : null,
          Mission: parseNumber(og.Mission)
        } satisfies SurvivalFailMission
      }

      case ogEventTypes.ZOMBRAINS_REVIVE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og)
        } satisfies ZombrainsRevive
      }
      case ogEventTypes.ZOMBRAINS_BUY_WEAPON: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Weapon: parseNumber(og.Weapon),
          Cost: parseNumber(og.Cost)
        } satisfies ZombrainsBuyWeapon
      }
      case ogEventTypes.ZOMBRAINS_BEGIN: {
        return { ...refineOgDefaultEntries(og) } satisfies ZombrainsBegin
      }
      case ogEventTypes.ZOMBRAINS_HELICOPTER_ARRIVING: {
        return {
          ...refineOgDefaultEntries(og),
          LandingX: parseNumber(og.LandingX),
          LandingY: parseNumber(og.LandingY)
        } satisfies ZombrainsHelicopterArriving
      }
      case ogEventTypes.ZOMBRAINS_HELICOPTER_BOARDING: {
        return {
          ...refineOgDefaultEntries(og),
          X: parseNumber(og.X),
          Y: parseNumber(og.Y)
        } satisfies ZombrainsHelicopterBoarding
      }
      case ogEventTypes.ZOMBRAINS_HELICOPTER_PLAYER_BOARDED: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og)
        } satisfies ZombrainsHelicopterPlayerBoarded
      }
      case ogEventTypes.ZOMBRAINS_END: {
        return {
          ...refineOgDefaultEntries(og),
          Alive: parseNumber(og.Alive),
          Dead: parseNumber(og.Dead)
        } satisfies ZombrainsEnd
      }

      case ogEventTypes.GAME_OVER: {
        return {
          ...refineOgDefaultEntries(og),
          WinnerText: og.WinnerText,
          WinnerColor: og.WinnerColor,
          WinnerID: parseNumber(og.WinnerID),
          WinnerTeam: parseNumber(og.WinnerTeam),
          GameModeID: parseNumber(og.GameModeID),
          CurrentMapFile: og.CurrentMapFile,
          CurrentMapName: og.CurrentMapName
        } satisfies GameOver
      }
      case ogEventTypes.SERVER_EMPTY: {
        return {
          ...refineOgDefaultEntries(og),
          Bots: parseNumber(og.Bots),
          IsHostPresent: parseBoolean(og.Host)
        } satisfies ServerEmpty
      }

      case ogEventTypes.WEAPONSDEAL_RANKCHANGE: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          WeaponsDealRank: parseNumber(og.WeaponsDealRank)
        } satisfies WeaponsdealRankchange
      }

      case ogEventTypes.TAKEOVER_FLAGCAPTURE: {
        return {
          ...refineOgDefaultEntries(og),
          FlagID: parseNumber(og.FlagID),
          FlagX: parseNumber(og.FlagX),
          FlagY: parseNumber(og.FlagY),
          NewOwner: parseNumber(og.NewOwner),
          LastOwner: parseNumber(og.LastOwner),
          FlagsUSC: parseNumber(og.FlagsTeamOne),
          FlagsTHEMAN: parseNumber(og.FlagsTeamTwo)
        } satisfies TakeoverFlagcapture
      }
      case ogEventTypes.TAKEOVER_FLAGSCREATED: {
        const datas: FlagData[] = []

        for (const key in og) {
          if (key.startsWith('FlagData')) {
            const data = og[key as `FlagData${number}`]
            if (data) {
              datas.push({
                FlagID: parseNumber(data.FlagID),
                FlagX: parseNumber(data.FlagX),
                FlagY: parseNumber(data.FlagY)
              })
            }
          }
        }

        return {
          ...refineOgDefaultEntries(og),
          FlagAmount: parseNumber(og.FlagAmount),
          TeamUSCScore: parseNumber(og.Team1Score),
          TeamTHEMANScore: parseNumber(og.Team2Score),
          FlagsDatas: datas
        } satisfies TakeoverFlagscreated
      }

      case ogEventTypes.PLAYER_LOADOUT: {
        return {
          ...refineOgDefaultEntries(og),
          ...parsePlayerIdAndProfile(og),
          Weap1: parseNumber(og.Weap1),
          Weap2: parseNumber(og.Weap2),
          Dualwield: parseBoolean(og.Dualwield),
          Equip: parseNumber(og.Equip),
          OffWeap: Number(og.OffWeap) !== 0 ? parseNumber(og.OffWeap) : null,
          OffWeap2: Number(og.OffWeap2) !== 0 ? parseNumber(og.OffWeap2) : null
        } satisfies PlayerLoadout
      }

      case ogEventTypes.SURVIVAL_BOMB_DEFUSED: {
        return {
          ...refineOgDefaultEntries(og),
          TimeLeft: parseNumber(og.TimeLeft),
          Defuser: parseNumber(og.Defuser)
        } satisfies SurvivalBombDefused
      }
      case ogEventTypes.SURVIVAL_BOMB_EXPLODED: {
        return { ...refineOgDefaultEntries(og) } satisfies SurvivalBombExploded
      }
      case ogEventTypes.SURVIVAL_BOMB_REARMED: {
        return {
          ...refineOgDefaultEntries(og),
          TimeLeft: parseNumber(og.TimeLeft)
        } satisfies SurvivalBombRearmed
      }

      case ogEventTypes.SLEEP: {
        return { ...refineOgDefaultEntries(og) } satisfies Sleep
      }
      case ogEventTypes.WAKE: {
        return { ...refineOgDefaultEntries(og) } satisfies Wake
      }
      default:
        console.debug(og)
        return {
          ...refineOgDefaultEntries(og)
        } as RconEvent
    }
  }

  public static formatEvent = (eventStr: string): RconEvent => {
    const og = EventStringTransformer.formatEvent(eventStr)
    return this.formatOgEvent(og)
  }
}
