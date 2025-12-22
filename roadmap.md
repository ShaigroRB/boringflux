# Roadmap and ideas

## Server context

**boringflux** should always have the server context containing important information such as:

- The names & server ids of all players
- The `PlayerData` of each player, easily retrievable using their name or their server id
- Current match data

Those details should be retrieved by doing a `request_match` and/or a `request_scoreboard` as soon as the rcon connection is made.
Those details are to be updated thanks to the different server events.

Some details can't be known unless **boringflux** has been connected since the start of the match such as:

- vices for a given player:
  - `PlayerData` does not contain _any_ detail about vice
  - Server events like `survival_get_vice` indicate which vice is concerned but don't give detail about the final amount of the concerned vice

Some details can be known but require constant request to the server to keep accurate updated info:

- money for a given player:
  - `PlayerData` returns the current amount of money a player has. `request_player` would be required to be sent whenever we need the exact amount a player has.
  - While server events like `survival_complete_mission` indicate the amount of money earned, there are too many events that are not communicated to RCON connections to be viable. Buying & selling stocks don't trigger any server events and as such we end up with an inaccurate amount what **boringflux** know and what a player _really_ has.

## "Send a command" section

### Extensive console

Instead of being a page to simply send a command, we could display a pseudo-console like ingame with more details on the game.
Ingame, it shows log messages, commands & some other stuff like if a player picked up a power up.

The idea is to have a description for basically every server events and it should show up here.
Plus, we should be able to send a command as normal.

### Autocomplete

As ingame, typing out a command should provide autocomplete suggestions.

### Naming

Could be called "Console"?
