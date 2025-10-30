
/*
  Create the initial state, where all teams are in the pool, and teams 1 and 2 have no players
 */
import type {Groups} from './types'
import assert from 'assert'

export const initializeTeams = (players: string[]): Groups => {
  return {
    playerPool: [...players],
    team1: [],
    team2: []
  }
}

/*
    Array randomizeGroupSizes(int maxNums)

    Returns an array of length 3 consisting of three random non-zero values that add up
    to maxNum.  Description of result:
      group[0] the number of players to put in Team 1. Choice must leave at least two (one each from the remaining groups)
      group[1] the number of players to put in Team 2. The maximum of group[0] + group[1] is (maxNum-1)
      group[2] the remaining number of players that will be in the unselected pool.  Will be at least 1
  */
// eslint-disable-next-line no-unused-vars
export const randomizeTeams = (playersOrig: string[]): Groups => {
  const players: string[] = [...playersOrig] // leave original prop alone

  const groupSizes = randomizeGroupSizes(players.length)
  scramble(players)
  return {
    team1: popToArray(players, groupSizes[0]),
    team2: popToArray(players, groupSizes[1]),
    playerPool: popToArray(players, groupSizes[2])
  }
}
export const randomizeGroupSizes = (maxNum: number) => {
  const groups = [0, 0, 0]
  groups[0] = Math.floor((Math.random() * (maxNum - 2))) + 1
  groups[1] = Math.floor((Math.random() * (maxNum - groups[0] - 1))) + 1
  groups[2] = maxNum - (groups[0] + groups[1])
  return groups
}
export const scramble = (input: string[]) => input.sort(() => Math.random() - 0.5)

/*
        Take length items off of the end of list, and return a list of those items.
        Destructively changes list.
*/
export const popToArray = (list: string[], length: number): string[] => {
  const result: string[] = []
  for (let i = 0; i < length; i++) {
    const item: string | undefined = list.pop()
    assert(item !== undefined, 'array contained an undefined')
    result.push(item)
  }
  return result
}
