import {validatePlayerAddition, errorMesgs, isPlayerSelected, getPlayerIdxFromPlayers} from './util'
import fixtures from './fixtures'

describe('utils', () => {
  describe('validatePlayerAddition', () => {
    it('valid addition', () => {

      const newPlayer =     {
        'name':'joe Smith',
        'type':'AllRounder',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers)
      ).not.toThrow()
    })

    it('too many players', () => {

      const newPlayer =     {
        'name':'Ishaan Kishan',
        'type':'AllAround',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.ElevenOkPlayers)
      ).toThrow(errorMesgs.TOO_MANY_PLAYERS)
    })
    it('too many wicket keepers', () => {

      const newPlayer =     {
        'name':'Ishaan Kishan',
        'type':'WicketKeeper',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers)
      ).toThrow(errorMesgs.ONE_WICKET_KEEPER)
    })
    it('too many combined Batsmen/Bowers', () => {

      const newPlayer =     {
        'name':'joe Smith',
        'type':'Bowler',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers)
      ).toThrow(errorMesgs.TOO_MANY_BATSMEN_BOWLERS)
    })
    it('too many All Rounders', () => {

      const newPlayer =     {
        'name':'joe Smith',
        'type':'AllRounder',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.MaxAllRoundersReached)
      ).toThrow(errorMesgs.TOO_MANY_ALL_ROUNDERS)
    })
  })
  describe('isPlayerSelected', () => {
    it('is selected', () => {
      const playerIdx = 0
      expect(isPlayerSelected(
        playerIdx,
        fixtures.IsPlayerSelected.players,
        fixtures.IsPlayerSelected.selected
      )).toBe(true)
    })
    it('is not selected', () => {
      const playerIdx = 1
      expect(isPlayerSelected(
        playerIdx,
        fixtures.IsPlayerSelected.players,
        fixtures.IsPlayerSelected.selected
      )).toBe(false)
    })
  })
  describe('getPlayerIdxFromPlayers', () => {
    it('player and idx found', () => {
      const players = fixtures.TenOkPlayers
      const player = players[3]
      expect(getPlayerIdxFromPlayers(player, players))
        .toBe(3)
    })
    it('player and idx not found', () => {
      const players = fixtures.TenOkPlayers
      const player = {
        'name': 'Harshal Patel',
        'type': 'Bowler',
        'battingSkill': 32,
        'bowlingSkill': 85,
        'fieldingSkill': 75
      }
      expect(getPlayerIdxFromPlayers(player, players))
        .toBeUndefined()
    })

  })
})
