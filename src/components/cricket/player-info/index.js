import React from 'react'
// import players1 from '../players.json'
// TODO reorder these args
export default function PlayerDetail({ close, playerIdx, disabledSelect, addPlayer, players }) {
  const player = players[playerIdx]
  const partialTestId = `player-${player.name.replace(' ', '-')}`
  const partialTestId2 = `player-detail-${player.name.replace(' ', '-')}`
  return (
  //Style fixed to center
    <div
      className="card outlined mt-0"
      style={{
        border: '2px solid red',
        backgroundColor: 'white',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '20px',
        width: '500px',
        top: '30%',
      }}
      data-testid={`${partialTestId}-details`}
    >
      <h1 className="card-title" style={{ textAlign: 'center' }}>
				Player Detail
      </h1>
      <p>
        <strong>Name:</strong> <span data-testid={`${partialTestId}-name`}>{player.name}</span>
      </p>
      <p>
        <strong>Type:</strong> <span data-testid={`${partialTestId}-type`}>{player.type}</span>
      </p>
      <p>
        <strong>Batting:</strong> <span data-testid={`${partialTestId}-batting`}>{player.battingSkill}</span>
      </p>
      <p>
        <strong>Bowling:</strong> <span data-testid={`${partialTestId}-name}-bowling`}>{player.bowlingSkill}</span>
      </p>
      <p>
        <strong>Fielding:</strong> <span data-testid={`${partialTestId}-fielding`}>{player.fieldingSkill}</span>
      </p>
      <button
        disabled={disabledSelect}
        onClick={(e) => addPlayer(e, playerIdx)}
        data-testid={`${partialTestId2}-add`}
      >
				Select
      </button>
      <button onClick={close} className="danger" data-testid={`${partialTestId2}-close`}>
				Close
      </button>
    </div>
  )
}
