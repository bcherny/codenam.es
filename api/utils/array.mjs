export function pickRandomlyFromArray(array, count) {
  return array
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
}
