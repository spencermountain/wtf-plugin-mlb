const wtf = require('wtf_wikipedia')
const teams = require('./teams')
const parse = require('./parse')
const version = require('../_version')

//who cares.
const wtfMLB = {

  fetch: function(team, year) {
    //soften-up the team-input
    team = teams.find(t => {
      return t === team || t.toLowerCase().includes(team.toLowerCase())
    })
    year = year || new Date().getFullYear()
    team = `${year}_${team.replace(/ /g, '_')}_season`
    return wtf.fetch(team).catch(console.log).then(parse)
  },

  parse: (wiki) => {
    var doc = wtf(wiki)
    return parse(doc)
  },
  //this is handy
  version: version

}
module.exports = wtfMLB
