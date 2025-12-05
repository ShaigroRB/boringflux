export enum AIMode {
  DEFAULT = 0,
  DEACTIVATE,
  PACIFIST,
  PATHFIND_TO_HOST_MOUSE,
  IGNORE_HUMANS,
  IGNORE_BOTS
  /**
   * `help(aimode)` says "6 = defend own spawn point from enemies"
   * but `aimode "6"` says it's not a valid AI mode.
   */
  // DEFEND_SPAWN // help(aimode) indicates this exists but it is not usable as a valid value
}
