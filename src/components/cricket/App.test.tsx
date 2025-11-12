import React from 'react'
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent, waitFor, waitForElementToBeRemoved, Matcher, MatcherOptions} from '@testing-library/react'
import Cricket from './index'
import players from './players.json'
import {errorMesgs, congratsMesg} from './util'

const AVAILABLE_PLAYERS = players.length

const testIds = {
  availablePlayersName: 'available-players-name',
  availablePlayersRole: 'available-players-role',
  availablePlayersBat: 'available-players-bat',
  availablePlayersBowl: 'available-players-bowl',
  availablePlayersTableBody: 'available-players-table-body',
  availablePlayersRow: 'available-players-row',
  selectedPlayersName: 'selected-players-name',
  selectedPlayersRole: 'selected-players-role',
  selectedPlayersTableBody: 'selected-players-table-body',
  selectedPlayersRow: 'selected-players-row',
  selectionRules: 'selection-rules',
  closeWelcome: 'close-welcome'
}

afterEach(() => {
  cleanup()
})

let app,
  getByTestId: ((text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement) | ((arg0: string) => HTMLElement),
  queryByTestId: ((text: Matcher, options?: MatcherOptions | undefined, waitForElementOptions?: unknown) => HTMLElement | null) | ((arg0: string) => any),
  getByText,
  availablePlayersTableBody: HTMLElement,
  selectedPlayersTableBody: HTMLElement

beforeEach(() => {
  app = render(<Cricket />)
  getByTestId = app.getByTestId
  queryByTestId = app.queryByTestId
  getByText = app.getByText
  availablePlayersTableBody = getByTestId(testIds.availablePlayersTableBody)
  selectedPlayersTableBody = getByTestId(testIds.selectedPlayersTableBody)
})

it('Initially Selected players should be empty, all 25 players getting rendered in Available Players', () => {
  expect(availablePlayersTableBody.children.length).toBe(25)
  expect(selectedPlayersTableBody.children.length).toBe(0)
  expect(true)
})

it('Show welcome instructions initially and disappear on clicking close button', () => {
  const welcomeInstructions = getByTestId(testIds.selectionRules)
  expect(welcomeInstructions).toBeInTheDocument()
  const closeButton = getByTestId(testIds.closeWelcome)
  fireEvent.click(closeButton)
  expect(queryByTestId(testIds.selectionRules)).not.toBeInTheDocument()
})

it('Select first player in Available Players', () => {
  const playerButton = getByTestId(
    `available-${players[0]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerButton)
  expect(selectedPlayersTableBody.children.length).toBe(1)
  expect(selectedPlayersTableBody.children[0].children[0].textContent).toBe(
    players[0]['name']
  )
  expect(playerButton).toBeDisabled()
})

it('Remove Selected player', () => {
  const playerButton = getByTestId(
    `available-${players[0]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerButton)
  expect(selectedPlayersTableBody.children.length).toBe(1)
  expect(selectedPlayersTableBody.children[0].children[0].textContent).toBe(
    players[0]['name']
  )
  expect(playerButton).toBeDisabled()

  const playerRemoveButton = getByTestId(
    `selected-${players[0]['name'].split(' ').join('-')}-remove`
  )
  fireEvent.click(playerRemoveButton)
  expect(selectedPlayersTableBody.children.length).toBe(0)
})

it('Select 5 players', () => {
  for (let i = 0; i < 5; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[i]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(5)
  for (let i = 0; i < 5; i++) {
    expect(selectedPlayersTableBody.children[i].children[0].textContent).toBe(
      players[i]['name']
    )
  }
})

it('Add 5 players and remove them', () => {
  for (let i = 0; i < 5; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[i]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(5)
  for (let i = 0; i < 5; i++) {
    const playerRemoveButton = getByTestId(
      `selected-${players[i]['name'].split(' ').join('-')}-remove`
    )
    fireEvent.click(playerRemoveButton)
    expect(selectedPlayersTableBody.children.length).toBe(4 - i)
  }
  expect(selectedPlayersTableBody.children.length).toBe(0)
})

it('Player card select button should be disabled for already selected player', () => {
  const rohitSharmaSelect = getByTestId('available-Rohit-Sharma-select')
  fireEvent.click(rohitSharmaSelect)
  expect(rohitSharmaSelect).toBeDisabled()

  const rohitSharmaName = getByTestId('available-Rohit-Sharma-name')
  fireEvent.click(rohitSharmaName)

  expect(queryByTestId('player-Rohit-Sharma-details')).toBeInTheDocument()
  expect(queryByTestId('player-detail-Rohit-Sharma-add')).toBeDisabled()
})

it('Select Player on Card and close card', () => {
  const rohitSharmaName = getByTestId('available-Rohit-Sharma-name')
  fireEvent.click(rohitSharmaName)
  const rohitSharmaDetails = queryByTestId('player-Rohit-Sharma-details')
  expect(rohitSharmaDetails).toBeInTheDocument()
  const addButton = getByTestId('player-detail-Rohit-Sharma-add')
  const closeButton = getByTestId('player-detail-Rohit-Sharma-close')

  fireEvent.click(addButton)
  fireEvent.click(closeButton)
  expect(rohitSharmaDetails).not.toBeInTheDocument()


  expect(selectedPlayersTableBody.children.length).toBe(1)
})

it('Check limit on adding more than 6 batsman', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation()
  for (let i = 0; i < 6; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[i]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(6)

  const playerSelectButton = getByTestId(
    `available-${players[6]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerSelectButton)
  expect(alertMock).toHaveBeenCalledWith(`Error: ${errorMesgs.TOO_MANY_BATSMEN_BOWLERS}`)
})

it('Check limit on adding more than 4 allrounders', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation()
  for (let i = 11; i < 15; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[i]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(4)

  const playerSelectButton = getByTestId(
    `available-${players[15]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerSelectButton)
  expect(alertMock).toHaveBeenCalledWith(`Error: ${errorMesgs.TOO_MANY_ALL_ROUNDERS}`)
})


it('Check limit on adding more than 6 Bowlers', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation()
  for (let i = 17; i < 23; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[i]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(6)

  const playerSelectButton = getByTestId(
    `available-${players[23]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerSelectButton)
  expect(alertMock).toHaveBeenCalledWith(`Error: ${errorMesgs.TOO_MANY_BATSMEN_BOWLERS}`)
})

it('check limit on adding 11 players', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation()
  const validTeamOfElevenIdxs = [0, 1, 2, 9, 11, 12, 13, 14, 17, 18, 19]
  for (let i = 0; i < validTeamOfElevenIdxs.length; i++) {
    const playerSelectButton = getByTestId(
      `available-${players[validTeamOfElevenIdxs[i]]['name'].split(' ').join('-')}-select`
    )
    fireEvent.click(playerSelectButton)
  }
  expect(selectedPlayersTableBody.children.length).toBe(11)
  expect(alertMock).toHaveBeenCalledWith(congratsMesg)

  const playerSelectButton = getByTestId(
    `available-${players[23]['name'].split(' ').join('-')}-select`
  )
  fireEvent.click(playerSelectButton)
  expect(alertMock).toHaveBeenCalledWith('Error: Only 11 players are allowed in a team')
})
