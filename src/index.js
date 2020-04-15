const teams = require('./teams')
const parse = require('./parse')

const addMethod = function (models) {
  models.wtf.getSeason = function (team, year) {
    //soften-up the team-input
    team =
      teams.find((t) => {
        return t === team || t.toLowerCase().includes(team.toLowerCase())
      }) || team
    team = team.replace(/ /g, '_')
    year = year || new Date().getFullYear()
    let page = `${year}_${team}_season`
    return models.wtf.fetch(page).catch(console.log).then(parse)
  }
}
module.exports = addMethod
