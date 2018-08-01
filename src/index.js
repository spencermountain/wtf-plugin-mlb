const wtf = require('wtf_wikipedia')
const teams = require('./teams')

//grab game-data from a MLB team's wikipedia page:
const parsePage = function(doc) {
  let games = []
  //grab the generated section called 'Game Log'
  let section = doc.sections('Game Log')
  if (!section) {
    return games
  }
  let months = section.tables()
  //get rid of extra tables
  months = months.filter(m => m[1] && !m[1].Legend)
  //each month is it's own table
  months.forEach((rows) => {
    rows.forEach(row => {
      if (row.Record && row.Record.data) {
        let str = row.Record.data.text || ''
        let arr = str.split('–').map(n => parseInt(n, 10))
        let diff = arr[0] - arr[1]
        games.push(diff)
      }
    })
  })
  return games
}

//
const wtfMLB = function(team, year) {
  year = year || new Date().getFullYear()
  team = `${year}_${team.replace(/ /g, '_')}_season`
  return wtf.fetch(team).then(parsePage)
}
module.exports = wtfMLB
