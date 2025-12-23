export function toColorVar(key?: string) {
  return key ? `var(--color-${key})` : undefined;
}
