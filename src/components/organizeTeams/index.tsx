import React, { useState} from 'react'
import assert from 'assert'
import styles from './organizeTeams.module.css'
import type { TeamData, Groups, TeamIdx } from './types'
import { initializeTeams, randomizeTeams } from './helpers'

export const TOGGLE_BUTTON_TEXT = 'Toggle Team Selection'

export const TESTIDS: Record<string, string> = {
  POOL: 'pool', // div containing players not yet on either team
  PLAYER_IN_POOL: 'player',
  TEAM_SELECT: 'teamselect', // buttons that determine which team we are selecting for
  PLAYER_ON_TEAM: 'team_link', // all players that are in team[1|2]
}
export default function OrganizeTeams (props: TeamData) {
/*
    Arguments:
      teamNumber:  Which team, team1 or team2, we are pulling a player out of.  Can only be values 1 or 2
      playerIdx: the index of the player in team[1|2] to return to pool

      The two teams are in the playerGroups object which has keys 'team1' and 'team2'. Each points to the array representing
      the given team.
   */
  const returnPlayerToPool = (teamNumber: TeamIdx, playerIdx: number) => {
    const teamField: 'team1'|'team2' = teamNumber === 0 ? 'team1' : 'team2'
    playerGroups.playerPool.push(playerGroups[teamField][playerIdx])
    playerGroups[teamField].splice(playerIdx, 1)
    setPlayerGroups({ ...playerGroups })
  }

  const [playerGroups, setPlayerGroups] = useState<Groups>(initializeTeams(props.players))
  const [teamTurn, setTeamTurn] = useState<TeamIdx>(0) // the only values can be 0 or 1 (team1 or team2)

  return (
    <div id={styles.container}>
      <div id={styles['player-pool']} data-testid={TESTIDS.POOL}>
        <span className={styles.label}>Pool: </span>
        {playerGroups.playerPool.map((player, i) => (
          <div
            className={styles.player}
            key={i}
            data-testid={TESTIDS.PLAYER_IN_POOL}
            onClick={() => {
              playerGroups[teamTurn === 0 ? 'team1' : 'team2'].push(playerGroups.playerPool[i])
              playerGroups.playerPool.splice(i, 1)
              setPlayerGroups({ ...playerGroups })
            }}
          >{player}</div>
        ))}
      </div>
      <div id={styles.buttons}>
        <button onClick={() => {
          setTeamTurn(teamTurn === 0 ? 1 : 0)
        }} data-testid="teamselect">{ TOGGLE_BUTTON_TEXT }</button>
        <button onClick={() => {
          setPlayerGroups(randomizeTeams(props.players))
          const newTeamTurn: number = Math.floor(Math.random() * 2)
          assert(newTeamTurn === 0 || newTeamTurn === 1, 'invalid teamTurn')
          setTeamTurn(newTeamTurn)
        }}>Randomize Teams</button>
        <button onClick={() => {
          setPlayerGroups(initializeTeams(props.players))
          setTeamTurn(0)
        }}>Reset</button>
      </div>
      <div id={styles.rosters}>
        <div className={styles.team}>
          <h2 className={styles[teamTurn === 0 ? 'team-active' : 'team-inactive']}>Team 1</h2>
          <div className={styles['team-players']}>
            {playerGroups.team1.map((player, i) => (
              <div
                className={styles.player}
                key={`team1_${i}`}
                data-testid={TESTIDS.PLAYER_ON_TEAM}
                onClick={() => {
                  returnPlayerToPool(0, i)
                }}
              >{player}</div>
            ))}
          </div>
        </div>
        <div className={styles.team}>
          <h2 className={styles[teamTurn === 1 ? 'team-active' : 'team-inactive']}>Team 2</h2>
          <div className={styles['team-players']}>
            {playerGroups.team2.map((player, i) => (
              <div
                className={styles.player}
                key={`team2_${i}`}
                data-testid={TESTIDS.PLAYER_ON_TEAM}
                onClick={() => {
                  returnPlayerToPool(1, i)
                }}
              >{player}</div>
            ))}
          </div>
        </div>
      </div>
      <h4 className={styles.instructions}>Instructions</h4>
      <ol>
        <li>Click on a player name in the pool to add it to the active team</li>
        <li>Use the toggle button to choose the active team</li>
        <li>Clicking on a player on a team returns it back to the pool</li>
      </ol>
    </div>
  )
}
