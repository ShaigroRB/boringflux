export function createReverseMap<T extends Record<string, number>>(
  obj: T
): Record<T[keyof T], keyof T> {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) as any
}
