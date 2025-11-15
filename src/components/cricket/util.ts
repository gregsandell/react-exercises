import type { Player } from './types'

export const errorMesgs: Record<string, string> = {
  TOO_MANY_PLAYERS: 'Only 11 players are allowed in a team',
  ONE_WICKET_KEEPER: 'The team may have only a single Wicker Keeper',
  TOO_MANY_ALL_ROUNDERS: 'All Rounders can not be more than 4',
  TOO_MANY_BATSMEN_BOWLERS: 'The combined number of Batsmen and Bowlers cannot exceed 6'
}
export const congratsMesg = 'Congratulations, you have a complete team.'
export function validatePlayerAddition(player: Player, currentSelected: Player[]): void {
  const candidates: Player[] = [...currentSelected, player]

  if (candidates.length > 11) {
    throw new Error(errorMesgs.TOO_MANY_PLAYERS)
  }
  if (candidates.filter(player => player.type === 'WicketKeeper').length > 1) {
    throw new Error(errorMesgs.ONE_WICKET_KEEPER)
  }
  if (candidates.filter(player => player.type === 'AllRounder').length > 4) {
    throw new Error(errorMesgs.TOO_MANY_ALL_ROUNDERS)
  }
  if (candidates.filter(player => /Batsman|Bowler/.test(player.type)).length > 6) {
    throw new Error(errorMesgs.TOO_MANY_BATSMEN_BOWLERS)
  }
}

export const isPlayerSelected = (playerIdx: number, availablePlayers: Player[], selectedPlayers: Player[]): boolean => {
  const name = availablePlayers[playerIdx].name
  return selectedPlayers.some(player => player.name === name)
}

export const getPlayerIdxFromPlayers = (player: Player, players: Player[]): number => {
  return players.findIndex(item => item.name === player.name)
}

export { }
