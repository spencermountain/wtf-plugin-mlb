const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

// wtfMLB.fetch('Toronto Blue Jays', 2014).catch(console.log).then((obj => {
//   console.log(JSON.stringify(obj, null, 2))
// }))

wtfMLB.history('Toronto Blue Jays', 1977, 2018).catch(console.log).then(data => {
  data = data.map((obj) => {
    if (!obj.games) {
      console.log(obj.season)
      return obj
    }
    // obj.games = obj.games.length
    obj.games = obj.games.map((g) => {
      let fifty = g.record.games / 2
      let underOver = g.record.wins - fifty
      return [g.date, g.attendance, underOver]
    })
    return obj
  })
  console.log(JSON.stringify(data, null, 2))
})
//
// let str = `
// == Game log ==
// === Regular season ===
// The [[2010 Major League Baseball season|2010 MLB]] and Toronto Blue Jays schedule was announced on September 15, 2009. It includes 162 games (as usual) — 81 at home, 81 on the road. The Jays open and close on the road, started off in Arlington and lost to [[Texas Rangers (baseball)|Rangers]] on Easter Monday, and will close it out with a four-game set in the brand new [[Target Field]] against the [[Minnesota Twins|Twins]]. The Jays home opener opponent was the [[Chicago White Sox]] on a Monday night at 7:20&nbsp;pm (past home openers have started at 7:15&nbsp;pm), and lost 8–7 in 11 innings. The Jay's final home game of 2010 will be held on September 29 against the [[New York Yankees]].
//
//
// {| class="toccolours collapsible"  style="width:90%; clear:both; margin:1.5em auto; text-align:center;"
// |- style="text-align:center;"
// !  colspan=11 style=background:#005ac0; color:white;" | <span style="color:white;">2010 game log</span>
// |-
// !  colspan=11 style=background:#005ac0; color:white;" | <span style="color:white;">April <small>12–12 (home 6–9, road 6–3, 24/24 GP)</small> </span></span>
// |-  style="text-align:center; background:black;"
// | '''<span style="color:silver;">#</span>''' || '''<span style="color:silver;">Date</span>''' || '''<span style="color:silver;">Opponent</span>''' || '''<span style="color:silver;">Score</span>''' || '''<span style="color:silver;">Win</span>''' || '''<span style="color:silver;">Loss</span>''' || '''<span style="color:silver;">Save</span>''' || '''<span style="color:silver;">Attendance</span>''' || '''<span style="color:silver;">Record</span>'''|| '''<span style="color:silver;">GB</span>'''
// |-  style="text-align:center; background:#fbb;"
// | 1 || April 5 || @ [[Texas Rangers (baseball)|Rangers]] || 5–4 || [[Frank Francisco|Francisco]] (1–0) || '''[[Jason Frasor|Frasor]]''' (0–1) || || 50,299 || 0–1 || 1
// |-  style="text-align:center; background:#cfc;"
// | 2 || April 7 || @ [[Texas Rangers (baseball)|Rangers]] || 7–4 || '''[[Brian Tallet|Tallet]]''' (1–0) || [[Dustin Nippert|Nippert]] (0–1) || '''[[Jason Frasor|Frasor]]''' (1) || 22,890 || 1–1 || 1
// |-  style="text-align:center; background:#cfc;"
// | 3 || April 8 || @ [[Texas Rangers (baseball)|Rangers]] || 3–1 || '''[[Casey Janssen|Janssen]]''' (1–0) || [[Frank Francisco|Francisco]] (1–1) || '''[[Jason Frasor|Frasor]]''' (2) || 14,707 || 2–1 || —
// |-  style="text-align:center; background:#cfc;"
// | 4 || April 9 || @ [[Baltimore Orioles|Orioles]] || 7–6 || '''[[Casey Janssen|Janssen]]''' (2–0) || [[Mike Gonzalez|Gonzalez]] (0–2) || '''[[Kevin Gregg|Gregg]]''' (1) || 48,891 || 3–1 || —
// |-  style="text-align:center; background:#cfc;"
// |}
// `
// console.log(wtfMLB.parse(str))
