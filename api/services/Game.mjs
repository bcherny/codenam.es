import {readFileSync} from 'fs'

export function generateColors() {}

export function generateWords() {
  const words = readFileSync('../constants/dictionary.txt', 'utf8').split('\n')
  return pickRandomlyFromArray(words, 25)
}
