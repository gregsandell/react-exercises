// React component tests
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import OrganizeTeams, { TESTIDS, TOGGLE_BUTTON_TEXT } from './index'
import teamData from '../../containers/App/organizeTeamsData'
import userEvent from '@testing-library/user-event'

describe('organize teams component', () => {

  test('initial pool state', () => {
    render(<OrganizeTeams players={teamData.players} />)

    // Now you can use screen to query for elements
    const poolElement = screen.getByTestId(TESTIDS.POOL)

    // Add your assertions here, e.g.:
    expect(poolElement).toBeInTheDocument()
    teamData.players.forEach((player) => {
      expect(within(poolElement).getByText(player)).toBeInTheDocument()
    })

  })
  test('team select button toggle', async () => {
    render(<OrganizeTeams players={teamData.players} />)

    // Now you can use screen to query for elements
    const teamSelectButton = screen.getByTestId(TESTIDS.TEAM_SELECT)

    expect(teamSelectButton).toBeInTheDocument()

    expect(teamSelectButton.textContent).toBe(TOGGLE_BUTTON_TEXT)

    // expect(screen.getByText((content, element) => {
    //   return content.startsWith(TOGGLE_BUTTON_TEXT)
    // })).toBeInTheDocument()

    const user = userEvent.setup()

  })
  test('add then remove player', async () => {
    render(<OrganizeTeams players={teamData.players} />)

    const teamSelectButton = screen.getByTestId(TESTIDS.TEAM_SELECT)

    // Elements with id 'player' are the clickable players in the pool (like buttons, but divs actually).
    // Work with the first one.
    let firstPlayer = screen.getAllByTestId(TESTIDS.PLAYER_IN_POOL)[0]
    const playerName: string = firstPlayer.textContent || '' // i.e. 'Alice', 'Bob' etc

    expect(firstPlayer).toBeInTheDocument() // prove that the div is there

    const user = userEvent.setup() // set up ability to click

    await user.click(firstPlayer) // moves player from pool to Team 1

    //
    const team1box = screen.getAllByTestId(TESTIDS.PLAYER_ON_TEAM) // get all players in both boxes
    expect(team1box.length).toBe(1) // we only added one

    // Prove that our player is in the team box now
    const ourPlayer = team1box[0]
    expect(within(ourPlayer).getByText(playerName)).toBeInTheDocument()

    // Prove that our player has left the pool
    firstPlayer = screen.getAllByTestId(TESTIDS.PLAYER_IN_POOL)[0]
    const currentFirstPlayerInPool = firstPlayer.textContent
    expect(currentFirstPlayerInPool).not.toBe(playerName)


    // Now remove that player
    const team1BoxPlayerButton = screen.getByText(playerName)
    await user.click(team1BoxPlayerButton)

    // Prove that it left the team box
    expect(within(ourPlayer).getByText(playerName)).not.toBeInTheDocument()

    // Prove that player was returned to pool.  Don't expect it to be in the same position
    const currentPool = screen.getAllByTestId(TESTIDS.PLAYER_IN_POOL)
    expect(currentPool.some((item) => item.textContent === playerName)).toBe(true)
  })
})

