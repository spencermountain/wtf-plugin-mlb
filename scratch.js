// const wtfMLB = require('./builds/wtf-mlb')
const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

wtfMLB.fetch('Detroit Tigers', 2018).catch(console.log).then((obj => {
  console.log(JSON.stringify(obj.roster, null, 2))
}))

// wtfMLB.history('St. Louis Cardinals', 1977, 2018).catch(console.log).then(data => {
//   data = data.map((obj) => {
//     if (!obj.games) {
//       console.log(obj.season)
//       return obj
//     }
//     // obj.games = obj.games.length
//     obj.games = obj.games.map((g) => {
//       let fifty = g.record.games / 2
//       let underOver = g.record.wins - fifty
//       return [g.date, g.attendance, underOver]
//     })
//     return obj
//   })
//   console.log(JSON.stringify(data, null, 2))
// })
//
// let str = `==Game log==
// {| class="wikitable" style="font-size:90%"
// |-
// !colspan=2|Legend
// |-
// `
// console.log(wtfMLB.parse(str).games)
