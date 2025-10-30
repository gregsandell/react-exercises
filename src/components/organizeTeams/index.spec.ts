import {initializeTeams, scramble, popToArray, randomizeGroupSizes, randomizeTeams} from './helpers'
import {Groups} from './types'
describe('OrganizeTeams helper unit tests', () => {
  it('initialize teams', () => {

    const names = ['Chuck', 'Sally']
    const game: Groups = initializeTeams(names)
    expect(names.every(name => game.playerPool.indexOf(name) > -1))
    expect(game.team1.length).toBe(0)
    expect(game.team2.length).toBe(0)
  })
  it('scramble', () => {
    const names = ['Chuck', 'Sally']
    expect(scramble(names).every(name => names.indexOf(name) > -1))
  })
  it('popToArray', () => {
    const names = ['Chuck', 'Sally', 'Bill', 'Fred']

    // pop two names off
    let myArray = [...names]
    let newArray = popToArray(myArray, 2)
    expect([names[0], names[1]].every(name => myArray.indexOf(name) > -1)).toBe(true)
    expect([names[2], names[3]].every(name => newArray.indexOf(name) > -1)).toBe(true)

    // pop all the names off
    myArray = [...names]
    newArray = popToArray(myArray, 4)
    expect(names.every(name => myArray.indexOf(name) === -1)).toBe(true)
    expect(names.every(name => newArray.indexOf(name) > -1)).toBe(true)
  })
  it('randomizeGroupSizes', () => {
    const myMax = 10
    const groups = randomizeGroupSizes(myMax)
    expect(groups[0] + groups[1] + groups[2]).toBe(myMax)
  })
  it('randomizeTeams', () => {
    const names = ['Chuck', 'Sally', 'Bill', 'Fred', 'Oona', 'Sabrina', 'Nupar']

    const groups = randomizeTeams(names)
    expect([...groups.team1, ...groups.team2, ...groups.playerPool]
      .every(name => names.indexOf(name) > -1))
      .toBe(true)
  })

})

export { }
