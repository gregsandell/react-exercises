import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import '../../../shared/h8k.module.css'
import * as util from '../util'
import type { Player } from '../types'
import PlayerDetail from '../player-info'
import playersList from '../players.json'
import styles from '../cricket.module.css'

export default function TeamSelection() {
  // TODO don't need players, just use static playersList
  const [players, setPlayers] = useState<Player[]>([...playersList as Player[]])
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [showPlayerDetail, setShowPlayerDetail] = useState<boolean>(false)
  const [playerIdxToShow, setPlayerIdxToShow] = useState<number>(0)
  const [welcome, setWelcome] = useState<boolean>(true)

  useEffect(() => {
    if (selectedPlayers.length === 11) {
      alert(util.congratsMesg)
    }
  }, [selectedPlayers])

  const isPlayerSelected = (playerIdx: number): boolean => {
    return util.isPlayerSelected(playerIdx, players, selectedPlayers)
  }

  const getPlayerIdxFromPlayers = (player: Player): number => {
    return util.getPlayerIdxFromPlayers(player, players)
  }

  const addPlayer = (playerIdx: number): void => {
    try {
      const playersCopy = [...players]
      const added = playersCopy.splice(playerIdx, 1)[0]
      validatePlayerAddition(added)
      setSelectedPlayers([...selectedPlayers, added])
    } catch (errors) {
      alert(`${errors}`)
    }
  }

  function validatePlayerAddition(player: Player) {
    util.validatePlayerAddition(player, selectedPlayers)
  }


  const removePlayer = (playerIdx: number) => {
    const selectedPlayersCopy = [...selectedPlayers]
    const removee = selectedPlayersCopy.splice(playerIdx, 1)[0]
    setSelectedPlayers(selectedPlayersCopy)
  }

  const showplayerDetailsCard = (playerIdx: number): void => {
    setPlayerIdxToShow(playerIdx)
    setShowPlayerDetail(true)
  }

  const closeCard = (): void => {
    setShowPlayerDetail(false)
  }

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div className={styles.detailPopup}> {
        showPlayerDetail ? (
          <PlayerDetail
            players={players}
            playerIdx={playerIdxToShow}
            disabledSelect={isPlayerSelected(playerIdxToShow)}
            close={() => closeCard()}
            addPlayer={(playerIdx: number) => {
              addPlayer(playerIdx)
              closeCard()
            }}
          />
        ) : null }
      <div
        className={cx(styles.teamPanel, 'card', 'outlined', 'mt-0')}
      >
        <div className="card-text">
          <h4 style={{ textAlign: 'center' }}>Available Players</h4>
          <table className={styles.player}>
            <thead className={styles.headers}>
              <tr>
                <th data-testid="available-players-name">Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody data-testid="available-players-table-body">
              <tr>
                { welcome ? (
                  <td data-testid="selection-rules" style={{ display: welcome ? 'block' : 'none'}} colSpan={3} className={cx(styles['selection-rules'], 'card', 'pb-20')}>
                    <div>
                      <p data-testid="close-welcome" style={{textAlign:'right'}} onClick={()=>setWelcome(false)}>X</p>
                      <h3 style={{ textAlign: 'center' }}>
                        <strong>Welcome to Team Selection</strong>
                      </h3>
                          11 players are required in a team <br />
                          3-6 batsmen and bowlers are allowed in a team
                      <br />
                          Only 1 Wicket Keeper required in a team
                      <br />
                          1-4 All Rounders are allowed in a team
                    </div>
                  </td>
                ) : null}
              </tr>
              { players.map((player, playerIdx) => {
                const partialTestId = `available-${player.name.replace(' ', '-')}`
                return (
                  <tr
                    data-testid={`${partialTestId}-row`}
                    key={playerIdx}
                  >
                    <td
                      data-testid={`${partialTestId}-name`}
                      onClick={() => showplayerDetailsCard(playerIdx)}
                    >
                      { player.name}
                    </td>
                    <td>
                      {player.type}
                    </td>
                    <td>
                      <button
                        data-testid={`${partialTestId}-select`}
                        onClick={(e) => addPlayer(playerIdx)}
                        disabled={isPlayerSelected(playerIdx)}
                        className="btn btn-primary text"
                      >
													Select
                      </button>
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={cx(styles.teamPanel, 'card', 'outlined', 'mt-0')}
      >
        <div className="card-text">
          <h4 style={{ textAlign: 'center' }}>Selected Players</h4>
          <table className={styles.player}>
            <thead className={styles.headers}>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody data-testid="selected-players-table-body">
              {selectedPlayers.map((player, index) => {
                const partialTestId = `availablek-${player.name.replace(' ', '-')}`
                return (
                  <tr
                    data-testid={`selected-${player.name
                      .split(' ')
                      .join('-')}-row`}
                    key={index}
                  >
                    <td
                      data-testid={`${partialTestId}-name`}
                      onClick={() => {
                        const playerIdx = getPlayerIdxFromPlayers(player )
                        showplayerDetailsCard(playerIdx)
                      }}
                    >
                      {player.name}
                    </td>
                    <td>{player.type}</td>
                    <td>
                      <button
                        data-testid={`selected-${player.name
                          .split(' ')
                          .join('-')}-remove`}
                        onClick={() => removePlayer(index)}
                        className="btn danger text"
                      >
                            Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  )
}
