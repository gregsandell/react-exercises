export const errorMesgs = {
  TOO_MANY_PLAYERS: 'Maximum number of players (11) has already been reached',
  ONE_WICKET_KEEPER: 'The team may have only a single Wicker Keeper',
  TOO_MANY_ALL_ROUNDERS: 'Maximum number of All Rounders players (4) has been reached',
  // TOO_MANY_BATSMEN_BOWLERS: 'The combined number of Batsmen and Bowlers cannot exceed 6'
  TOO_MANY_BATSMEN_BOWLERS: 'Batsmen can not be more than 6'
}
export function validatePlayerAddition(player, currentSelected) {
  const candidates = [...currentSelected, player]
  const problems = []
  // switch (true) {
  //   case candidates.length > 11:
  //     problems.push(errorMesgs.TOO_MANY_PLAYERS)
  //   case candidates.filter(player => player.type === 'WicketKeeper').length > 1:
  //     problems.push(errorMesgs.ONE_WICKET_KEEPER)
  //   case candidates.filter(player => player.type === 'AllRounder').length > 4:
  //     problems.push(errorMesgs.TOO_MANY_ALL_ROUNDERS)
  //   case candidates.filter(player => /Batsman|Bowler/.test(player.type)).length > 6:
  //     problems.push(errorMesgs.TOO_MANY_BATSMEN_BOWLERS)
  //   default:
  // }
  let count = 1
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

export { }
