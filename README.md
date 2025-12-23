# boringflux

List & create custom events for a Boring Man server

## Emitted events

### IPC events

This include emitted events:

- from main to renderer
- from renderer to main
- that are two-ways between main & renderer

### RCON emitted events

These are defined in `@shared/rcon/rcon.ts` and represent all events to be emitted and listened to by `main`.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
