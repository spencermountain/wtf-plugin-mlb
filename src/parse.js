//who knows!
const playerStats = require('./playerStats')
const gameLog = require('./gameLog')

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
const parseRoster = function(doc, res) {
  let s = doc.sections('roster') || doc.sections('players') || doc.sections(res.year + ' roster')
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
  if (!doc) {
    return {}
  }
  let res = parseTitle(doc.title())
  res.games = gameLog.season(doc)
  res.postseason = gameLog.postseason(doc)
  //grab the roster/draft data
  res.roster = parseRoster(doc, res)
  res.draftPicks = draftPicks(doc)
  //get the per-player statistics
  res.playerStats = playerStats(doc)
  return res
}
module.exports = parsePage
