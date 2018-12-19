//who knows!
const parseRow = require('./_parseRow')
const playerStats = require('./playerStats')

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

//this is just a table in a 'roster' section
const parseRoster = function(doc) {
  let s = doc.sections('roster')
  if (!s) {
    return {}
  }
  let players = s.templates('mlbplayer') || []
  players = players.map(o => {
    delete o.template
    return o
  })
  return players
}

//this is just a table in a '2008 draft picks' section
const draftPicks = function(doc) {
  let want = /\bdraft\b/i
  let s = doc.sections().find(sec => want.test(sec.title()))
  if (!s) {
    return []
  }
  let table = s.tables(0)
  if (!table) {
    return []
  }
  return table.keyValue()
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
  //grab the roster/draft data
  res.roster = parseRoster(doc)
  res.draftPicks = draftPicks(doc)
  //get the per-player statistics
  res.playerStats = playerStats(doc)
  return res
}
module.exports = parsePage
