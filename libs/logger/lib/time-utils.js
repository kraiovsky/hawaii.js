/**
 * @file Timer utility.
 */
const humanize = require('humanize-number')

/**
 * A timer factory.
 * Has timeStart and timeEnd timestamps.
 * A collection of setters, getters and a method to calculate duration of a session and return it in a human readable format.
 */
module.exports = () => {
  let timeStart
  let timeEnd
  return {
    set: {
      start: () => (timeStart = new Date()),
      end: () => (timeEnd = new Date()),
    },
    get: {
      start: {
        localTime: () => timeStart.toLocaleTimeString(),
      },
      end: {
        localTime: () => timeEnd.toLocaleTimeString(),
      },
      duration: () => {
        const delta = timeEnd - timeStart
        return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's')
      },
    },
  }
}
