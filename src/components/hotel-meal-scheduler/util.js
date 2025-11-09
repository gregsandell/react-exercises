import dayjs from 'dayjs'
import minMax  from 'dayjs/plugin/minMax'
import isSameOrBefore  from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(minMax)
dayjs.extend(isSameOrBefore)

export const expandAndAddToSet = (start, end, mySet) => {
  const startOfRange = dayjs.min([dayjs(start), dayjs(end)])
  const endOfRange = dayjs.max([dayjs(start), dayjs(end)])
  console.log(`*** expandAndAddToSet: startOfRange=${startOfRange.format('YYYY-MM-DD')}, endOfRange=${endOfRange.format('YYYY-MM-DD')}`)
  let currentDate = dayjs(startOfRange)
  mySet.add(currentDate.format('YYYY-MM-DD'))
  while (currentDate.isSameOrBefore(endOfRange, 'day')) {
    mySet.add(currentDate.format('YYYY-MM-DD'))
    currentDate = currentDate.add(1, 'day')
  }
}
