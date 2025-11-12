import React, { useEffect } from 'react'
import cx from 'classnames'
import '../../../shared/h8k.module.css'
import PlayerDetail from '../player-info'
import playersList from '../players.json'
import styles from '../cricket.module.css'
import * as util from '../util'

export default function TeamSelection() {
  // TODO don't need players, just use static playersList
  const [players, setPlayers] = React.useState([...playersList])
  const [selectedPlayers, setSelectedPlayers] = React.useState([])
  const [showPlayerDetail, setShowPlayerDetail] = React.useState(false)
  const [playerIdxToShow, setPlayerIdxToShow] = React.useState(0)
  const [welcome, setWelcome] = React.useState(true)
  useEffect(() => {
    if (selectedPlayers.length === 11) {
      alert(util.congratsMesg)
    }
  }, [selectedPlayers])

  const isPlayerSelected = (playerIdx) => {
    const name = players[playerIdx].name
    return selectedPlayers.some(player => player.name === name)
  }
  const addPlayer = (e, playerIdx) => {
    try {
      const playersCopy = [...players]
      const added = playersCopy.splice(playerIdx, 1)[0]
      validatePlayerAddition(added, selectedPlayers)
      setSelectedPlayers([...selectedPlayers, added])
      e.currentTarget.disabled = true
    } catch (errors) {
      alert(`${errors}`)
    }
  }

  function validatePlayerAddition(player) {
    util.validatePlayerAddition(player, selectedPlayers)
  }


  const removePlayer = (e, index) => {
    const selectedPlayersCopy = [...selectedPlayers]
    const removee = selectedPlayersCopy.splice(index, 1)[0]
    // console.log('*** added = ', added)
    setSelectedPlayers(selectedPlayersCopy)
    // let dataId = e.currentTarget.getAttribute('data-testid')
    // "selected-{playerName}-remove"


    // setPlayers([...players, added])
    // e.currentTarget.disabled = true
  }

  const showplayerDetailsCard = (playerIdx) => {
    setPlayerIdxToShow(playerIdx)
    setShowPlayerDetail(true)
  }

  const closeCard = () => {
    setShowPlayerDetail(false)
  }

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div style={{
        display: 'flex',
        position: 'relative',
        width: '80%' }}> {
          showPlayerDetail ? (
          // TODO choose either "i" or "index"!
            <PlayerDetail
              players={players}
              playerIdx={playerIdxToShow}
              disabledSelect={isPlayerSelected(playerIdxToShow)}
              close={() => closeCard()}
              index={1}
              addPlayer={(i) => addPlayer(i)}
            />
          ) : null }
        <div
          className="card outlined mt-0"
          style={{
            width: '50%',
            marginRight: '10px',
            overflow: 'scroll',
            height: '80vh',
          }}
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
                    <td data-testid="selection-rules" style={{ display: welcome ? 'block' : 'none'}} colSpan="3" className={cx(styles['selection-rules'], 'card', 'pb-20')}>
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
                      <td onClick={() => showplayerDetailsCard(playerIdx)}>
                        {player.type}
                      </td>
                      <td>
                        <button
                          data-testid={`${partialTestId}-select`}
                          onClick={(e) => addPlayer(e, playerIdx)}
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
          className="card outlined mt-0"
          style={{
            width: '50%',
            marginRight: '10px',
            overflow: 'scroll',
            height: '80vh',
          }}
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
                        onClick={() => showplayerDetailsCard(index)}
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
