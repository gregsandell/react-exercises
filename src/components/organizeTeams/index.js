import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './organizeTeams.css'

export default function OrganizeTeams (props) {
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
    to maxNum.
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
    // const createAscendingArray = (start, end) => {
    //   return Array(end - start + 1).fill().map((_, idx) => start + idx)
    // }
    const popToArray = (list, length) => {
      const result = []
      for (let i = 0; i < length; i++) {
        result.push(list.pop())
      }
      console.log(`popToArray, players = ${JSON.stringify(players)}, length = ${length}, result = ${result}`)
      return result
    }

    const groupSizes = randomizeGroupSizes(players.length)
    scramble(players)
    console.log(players)
    result.playerPool = popToArray(players, groupSizes[0])
    result.team1 = popToArray(players, groupSizes[1])
    result.team2 = popToArray(players, groupSizes[2])
    return result
  }
  const returnPlayerToPool = (teamNumber, playerIdx) => {
    playerGroups.playerPool.push(playerGroups[`team${teamNumber}`][playerIdx])
    playerGroups[`team${teamNumber}`].splice(playerIdx, 1)
    setPlayerGroups({ ...playerGroups })
  }

  console.log(`props.players = ${JSON.stringify(props.players)}`)
  const [playerGroups, setPlayerGroups] = useState(initializeTeams(props.players))
  const [teamTurn, setTeamTurn] = useState(0)

  return (
    <div id='container'>
      {/* {JSON.stringify(playerGroups)} */}
      <div id='player-pool'>
        {playerGroups.playerPool.map((player, i) => (
          <div
            className='player'
            key={i}
            onClick={() => {
              console.log(i)
              playerGroups[`team${teamTurn + 1}`].push(playerGroups.playerPool[i])
              playerGroups.playerPool.splice(i, 1)
              setPlayerGroups({ ...playerGroups })
            }}
          >{player}</div>
        ))}
      </div>
      <div id='buttons'>
        <button onClick={() => setTeamTurn((teamTurn + 1) % 2)}>Now Selecting for Team {teamTurn + 1}</button>
        <button onClick={() => setPlayerGroups(randomizeTeams(props.players))}>Randomize Teams</button>
        <button onClick={() => setPlayerGroups(initializeTeams(props.players))}>Reset</button>
      </div>
      <div id='rosters'>
        <div className='team'>
          <h2 className='team-head'>Team 1</h2>
          <div className='team-players'>
            {playerGroups.team1.map((player, i) => (
              <div
                className='player'
                key={`team1_${i}`}
                onClick={() => returnPlayerToPool(1, i)}
              >{player}</div>
            ))}
          </div>
        </div>
        <div className='team'>
          <h2 className='team-head'>Team 2</h2>
          <div className='team-players'>
            {playerGroups.team2.map((player, i) => (
              <div
                className='player'
                key={`team2_${i}`}
                onClick={() => returnPlayerToPool(2, i)}
              >{player}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
OrganizeTeams.propTypes = {
  players: PropTypes.array.isRequired
}
