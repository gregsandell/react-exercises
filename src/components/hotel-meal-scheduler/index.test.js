import { expandAndAddToSet} from './util'

describe('utils', () => {
  describe('expandAndAddToSet', () => {
    it('test 1', () => {
      const mySet = new Set()
      expandAndAddToSet('2022-11-01', '2022-11-03', mySet)
      expect(Array.from(mySet).sort()).toEqual(['2022-11-01', '2022-11-02', '2022-11-03'])
    })
  })
})
