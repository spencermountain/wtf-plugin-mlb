const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

wtfMLB.fetch('Toronto Blue Jays', 2018).catch(console.log).then((data => {
  console.log(data.slice(0, 5))
  console.log(data.length)
}))
//
// let str = `
// {| class="wikitable" style="font-size:90%"
// |-
// !colspan="2"|Legend
// |-
// | style="background:#bfb;"|&nbsp;||Nationals win
// |-
// | style="background:#fbb;"|&nbsp;||Nationals loss
// |-
// | style="background:#bbb;"|&nbsp;||Postponement
// |-
// |'''Bold'''||Nationals team member
// |}
// console.log(wtfMLB.parse(str))
