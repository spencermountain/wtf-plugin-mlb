// const wtf = require('wtf_wikipedia')
const wtf = require('/Users/spencer/mountain/wtf_wikipedia/')
const teams = require('./teams')
const parse = require('./parse')
const version = require('../_version')

//who cares.
const wtfMLB = {

  fetch: function(team, year) {
    //soften-up the team-input
    team = teams.find(t => {
        return t === team || t.toLowerCase().includes(team.toLowerCase())
      }) || team;
    team = team.replace(/ /g, '_')
    year = year || new Date().getFullYear()
    let page = `${year}_${team}_season`
    return wtf.fetch(page).catch(console.log).then(parse)
  },

  history: function(team, from, to) {
    //soften-up the team-input
    team = teams.find(t => {
        return t === team || t.toLowerCase().includes(team.toLowerCase())
      }) || team;
    team = team.replace(/ /g, '_')
    let pages = []
    for (let i = from; i <= to; i += 1) {
      pages.push(`${i}_${team}_season`)
    }
    return wtf.fetch(pages).catch(console.log).then((docs) => {
      docs = typeof docs.map !== 'function' ? [docs] : docs
      return docs.map(parse)
    })
  },

  parse: (wiki) => {
    var doc = wtf(wiki)
    return parse(doc)
  },
  //this is handy
  version: version

}
module.exports = wtfMLB
