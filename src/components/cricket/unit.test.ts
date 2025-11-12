import {validatePlayerAddition, errorMesgs, isPlayerSelected, getPlayerIdxFromPlayers} from './util'
import type { Player, Fixture } from './types'
import fixtures from './fixtures'

describe('utils', () => {
  describe('validatePlayerAddition', () => {
    it('valid addition', () => {

      const newPlayer: Player =     {
        'name':'joe Smith',
        'type':'AllRounder',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers as Player[])
      ).not.toThrow()
    })

    it('too many players', () => {

      const newPlayer: Player =     {
        'name':'Ishaan Kishan',
        'type':'AllRounder',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.ElevenOkPlayers as Player[])
      ).toThrow(errorMesgs.TOO_MANY_PLAYERS)
    })
    it('too many wicket keepers', () => {

      const newPlayer: Player =     {
        'name':'Ishaan Kishan',
        'type':'WicketKeeper',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers as Player[])
      ).toThrow(errorMesgs.ONE_WICKET_KEEPER)
    })
    it('too many combined Batsmen/Bowers', () => {

      const newPlayer: Player =     {
        'name':'joe Smith',
        'type':'Bowler',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.TenOkPlayers as Player[])
      ).toThrow(errorMesgs.TOO_MANY_BATSMEN_BOWLERS)
    })
    it('too many All Rounders', () => {

      const newPlayer: Player =     {
        'name':'joe Smith',
        'type':'AllRounder',
        'battingSkill': 84,
        'bowlingSkill': 30,
        'fieldingSkill': 80
      }
      expect(() => validatePlayerAddition(
        newPlayer, fixtures.MaxAllRoundersReached as Player[])
      ).toThrow(errorMesgs.TOO_MANY_ALL_ROUNDERS)
    })
  })
  describe('isPlayerSelected', () => {
    it('is selected', () => {
      const playerIdx = 0
      expect(isPlayerSelected(
        playerIdx,
        (fixtures.IsPlayerSelected as Fixture).players,
        (fixtures.IsPlayerSelected as Fixture).selected
      )).toBe(true)
    })
    it('is not selected', () => {
      const playerIdx = 1
      expect(isPlayerSelected(
        playerIdx,
        (fixtures.IsPlayerSelected as Fixture).players,
        (fixtures.IsPlayerSelected as Fixture).selected
      )).toBe(false)
    })
  })
  describe('getPlayerIdxFromPlayers', () => {
    it('player and idx found', () => {
      const players = fixtures.TenOkPlayers as Player[]
      const player: Player = players[3]
      expect(getPlayerIdxFromPlayers(player, players))
        .toBe(3)
    })
    it('player and idx not found', () => {
      const players = fixtures.TenOkPlayers as Player[]
      const player: Player = {
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
