//who knows!
const parseRow = require('./_parseRow')

const parseTitle = function(season = '') {
  let num = season.match(/[0-9]+/) || []
  let year = Number(num[0]) || season
  let team = season.replace(/[0-9]+/, '').replace(/_/g, ' ').replace(' season', '')
  return {
    year: year,
    season: season,
    team: team.trim()
  }
}

//grab game-data from a MLB team's wikipedia page:
const parsePage = function(doc) {
  let games = []
  //grab the generated section called 'Game Log'
  let section = doc.sections('game log') || doc.sections('regular season') || doc.sections('season')
  if (!section) {
    console.warn('no game log section for: \'' + doc.title() + '\'')
    return games
  }
  let months = section.tables()
  //do all subsections, too
  section.children().forEach(s => {
    months = months.concat(s.tables())
  })
  //try to find a game log template
  if (months.length === 0) {
    months = section.templates('mlb game log section') || section.templates('mlb game log month')
    months = months.map((m) => m.data) //make it look like a table
  } else {
    months = months.map((t) => t.keyValue())
    //get rid of extra 'legend' tables
    months = months.filter(table => {
      if (table.data && table.data[1]) {
        return !table.data[1].Legend
      }
      return true
    })
  }
  //each month is it's own table
  months.forEach((table) => {
    table.forEach(row => {
      games.push(parseRow(row))
    })
  })
  //remove empty weird ones
  games = games.filter((g) => g.team && g.date && g.result.winner !== undefined)
  let res = parseTitle(doc.title())
  res.games = games
  return res
}
module.exports = parsePage
