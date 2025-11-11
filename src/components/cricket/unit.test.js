import { validatePlayerAddition, errorMesgs } from './util'
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

})
