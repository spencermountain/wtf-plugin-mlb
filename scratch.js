const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

wtfMLB.fetch('Washington Nationals', 2018).catch(console.log).then((data => {
  console.log(data)
  console.log(data.length)
}))
//
// let str = `{| class="wikitable"
// |-
// ! style="background:#ddf; width:4%;"| #
// ! style="background:#ddf; width:11%;"| Date
// ! style="background:#ddf; width:14%;"| Opponent
// ! style="background:#ddf; width:12%;"| Score
// ! style="background:#ddf; width:18%;"| Win
// ! style="background:#ddf; width:18%;"| Loss
// ! style="background:#ddf; width:14%;"| Save
// ! style="background:#ddf; width:8%;"| Attendance
// ! style="background:#ddf; width:5%;"| Record
// |-  style="text-align:center; background:#bbb;"
// | – || March 29|| @ [[2018 Cincinnati Reds season|Reds]] || colspan=6|''Postponed (rain); Rescheduled for March 30.''
// |-  style="text-align:center; background:#bfb;"
// | 1 || March 30 || @ [[2018 Cincinnati Reds season|Reds]] || 2–0 || '''[[Max Scherzer|Scherzer]]''' (1–0) || [[Homer Bailey|Bailey]] (0–1) || '''[[Sean Doolittle|Doolittle]]''' (1) || 43,878 || 1–0
// |-  style="text-align:center; background:#bfb;"
// | 2 || March 31 || @ [[2018 Cincinnati Reds season|Reds]] || 13–7 || '''[[Stephen Strasburg|Strasburg]]''' (1–0) || [[Luis Castillo (pitcher)|Castillo]] (0–1) || — || 27,341 || 2–0
// |}`
