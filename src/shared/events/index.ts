const RconEvents = {
  CONNECT: 'connect',
  NEW_EVENT: 'new_event'
} as const

const MainEvents = {
  UPDATE_ALL_EVENTS: 'update_all_events'
} as const
const RendererEvents = {
  CONNECT: 'connect'
} as const

export const EMITTED_EVENTS = {
  rcon: prefixEvents('rcon', RconEvents),
  main: prefixEvents('main', MainEvents),
  renderer: prefixEvents('renderer', RendererEvents)
} as const

function prefixEvents<T extends Record<string, string>, P extends string>(
  prefix: P,
  events: T
): {
  [K in keyof T]: `${P}_${T[K]}`
} {
  return Object.fromEntries(Object.entries(events).map(([k, v]) => [k, `${prefix}_${v}`])) as any
}
