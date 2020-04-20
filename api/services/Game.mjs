import {readFileSync} from 'fs'
import lodash from 'lodash'
import {join} from 'path'
import dictionary from '../constants/dictionary.mjs'

export function generateColors() {
  const squares = [
    ...Array(9).fill('R'), // reds
    ...Array(8).fill('B'), // blues
    ...Array(7).fill('N'), // neutrals
    ...Array(1).fill('A'), // assassin
  ]
  return lodash.chain(squares).shuffle().chunk(5).value()
}

export function generateRevealedColors() {
  return lodash.chunk(Array(5).fill(Array(5).fill(false)), 5)
}

export function generateWords() {
  return lodash.chain(dictionary).shuffle().take(25).chunk(5).value()
}
