import React, { useState } from 'react'
import styles from './organizeTeams.module.css'

export const TESTIDS = {
  POOL: 'pool', // div containing players not yet on either team
  PLAYER_IN_POOL: 'player',
  TEAM_SELECT: 'teamselect', // buttons that determine which team we are selecting for
  PLAYER_ON_TEAM: 'team_link', // all players that are in team[1|2]
}
export default function OrganizeTeams (props) {

  /*
    Create the initial state, where all teams are in the pool, and teams 1 and 2 have no players
   */
  const initializeTeams = (players) => {
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
  const randomizeTeams = (playersOrig) => {
    const players = [...playersOrig] // leave original prop alone
    const result = {}
    const randomizeGroupSizes = (maxNum) => {
      const groups = [0, 0, 0]
      groups[0] = Math.floor((Math.random() * (maxNum - 2))) + 1
      groups[1] = Math.floor((Math.random() * (maxNum - groups[0] - 1))) + 1
      groups[2] = maxNum - (groups[0] + groups[1])
      return groups
    }
    const scramble = (input) => input.sort(() => Math.random() - 0.5)

    /*
      Take length items off of the end of list, and return a list of those items.
      Destructively changes list.
     */
    const popToArray = (list, length) => {
      const result = []
      for (let i = 0; i < length; i++) {
        result.push(list.pop())
      }
      return result
    }

    const groupSizes = randomizeGroupSizes(players.length)
    scramble(players)
    result.team1 = popToArray(players, groupSizes[0])
    result.team2 = popToArray(players, groupSizes[1])
    result.playerPool = popToArray(players, groupSizes[2])
    return result
  }

  /*
    Arguments:
      teamNumber:  Which team, team1 or team2, we are pulling a player out of.  Can only be values 1 or 2
      playerIdx: the index of the player in team[1|2] to return to pool

      The two teams are in the playerGroups object which has keys 'team1' and 'team2'. Each points to the array representing
      the given team.
   */
  const returnPlayerToPool = (teamNumber, playerIdx) => {
    playerGroups.playerPool.push(playerGroups[`team${teamNumber}`][playerIdx])
    playerGroups[`team${teamNumber}`].splice(playerIdx, 1)
    setPlayerGroups({ ...playerGroups })
  }

  const [playerGroups, setPlayerGroups] = useState(initializeTeams(props.players))
  const [teamTurn, setTeamTurn] = useState(0) // the only values this can be are 0 or 1 (team1 or team2)


  return (
    <div id={styles.container}>
      {/* Render the pool */}
      <div id={styles['player-pool']} data-testid={TESTIDS.POOL}>
        {playerGroups.playerPool.map((player, i) => (
          <div
            className={styles.player}
            key={i}
            data-testid={TESTIDS.PLAYER_IN_POOL}
            onClick={() => {
              playerGroups[`team${teamTurn + 1}`].push(playerGroups.playerPool[i])
              playerGroups.playerPool.splice(i, 1)
              setPlayerGroups({ ...playerGroups })
            }}
          >{player}</div>
        ))}
      </div>
      <div id={styles.buttons}>
        <button onClick={() => {
          setTeamTurn((teamTurn + 1) % 2)
        }} data-testid="teamselect">Now Selecting for Team {teamTurn + 1}</button>
        <button onClick={() => {
          setPlayerGroups(randomizeTeams(props.players))
        }}>Randomize Teams</button>
        <button onClick={() => {
          setPlayerGroups(initializeTeams(props.players))
        }}>Reset</button>
      </div>
      <div id={styles.rosters}>
        <div className={styles.team}>
          <h2 className={styles['team-head']}>Team 1</h2>
          <div className={styles['team-players']}>
            {playerGroups.team1.map((player, i) => (
              <div
                className={styles.player}
                key={`team1_${i}`}
                data-testid={TESTIDS.PLAYER_ON_TEAM}
                onClick={() => {
                  returnPlayerToPool(1, i)
                }}
              >{player}</div>
            ))}
          </div>
        </div>
        <div className={styles.team}>
          <h2 className={styles['team-head']}>Team 2</h2>
          <div className={styles['team-players']}>
            {playerGroups.team2.map((player, i) => (
              <div
                className={styles.player}
                key={`team2_${i}`}
                data-testid={TESTIDS.PLAYER_ON_TEAM}
                onClick={() => {
                  returnPlayerToPool(2, i)
                }}
              >{player}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
