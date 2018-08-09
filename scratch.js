const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

wtfMLB.fetch('Washington Nationals', 2017).catch(console.log).then((data => {
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
//
// {| class="toccolours"  style="width:82%; clear:both; margin:1.5em auto; text-align:center;"
// |-
// ! colspan=2 style="{{Baseball primary style|Washington Nationals}};"| 2017 Game Log: 97–65 (Home: 47–34; Away: 50–31) </span>
// |- valign="top"
// |<div class="NavFrame collapsible collapsed">
// <div class="NavHead" style="{{Baseball secondary style|Washington Nationals}};">April: 17–8 (Home: 7–5; Away: 10–3)
// </div>
// <div class="NavContent" style="text-align:left;">
// {| class="wikitable"
// |-
// ! style="background:#ddf; width:0;"| #
// ! style="background:#ddf; width:11%;"| Date
// ! style="background:#ddf; width:14%;"| Opponent
// ! style="background:#ddf; width:9%;"| Score
// ! style="background:#ddf; width:18%;"| Win
// ! style="background:#ddf; width:18%;"| Loss
// ! style="background:#ddf; width:16%;"| Save
// ! style="background:#ddf; width:0;"| Attendance
// ! style="background:#ddf; width:0;"| Record
// |- align="center" bgcolor="bbffbb"
// | 1 || April 3 || [[2017 Miami Marlins season|Marlins]] || 4–2 || '''[[Stephen Strasburg|Strasburg]]''' (1–0) || [[David Phelps (baseball)|Phelps]] (0–1) || '''[[Blake Treinen|Treinen]]''' (1) || 42,744 || 1–0
// |- align="center" bgcolor="bbffbb"
// | 2 || April 5 || [[2017 Miami Marlins season|Marlins]] || 6–4 || '''[[Tanner Roark|Roark]]''' (1–0) || [[Dan Straily|Straily]] (0–1) || '''[[Blake Treinen|Treinen]]''' (2) || 22,715 || 2–0
// |- align="center" bgcolor="ffbbbb"
// | 3 || April 6 || [[2017 Miami Marlins season|Marlins]] || 3–4 <small>(10)</small> || [[David Phelps (baseball)|Phelps]] (1–1) || '''[[Joe Blanton|Blanton]]''' (0–1) || [[A. J. Ramos|Ramos]] (1) || 19,418 || 2–1
// |- align="center" bgcolor="bbffbb"
// | 4 || April 7 || @ [[2017 Philadelphia Phillies season|Phillies]] || 7–6 || '''[[Max Scherzer|Scherzer]]''' (1–0) || [[Vince Velasquez|Velasquez]] (0–1) || '''[[Blake Treinen|Treinen]]''' (3) || 45,121 || 3–1
// |- align="center" bgcolor="ffbbbb"
// | 5 || April 8 || @ [[2017 Philadelphia Phillies season|Phillies]] || 3–17 || [[Aaron Nola|Nola]] (1–0) || '''[[Jeremy Guthrie|Guthrie]]''' (0–1) || — || 37,241 || 3–2
// |- align="center" bgcolor="ffbbbb"
// | 6 || April 9 || @ [[2017 Philadelphia Phillies season|Phillies]] || 3–4 || [[Jeanmar Gómez|Gómez]] (1–0) || '''[[Koda Glover|Glover]]''' (0–1) || — || 36,917 || 3–3
// |- align="center" bgcolor="bbffbb"
// | 7 || April 10 || [[2017 St. Louis Cardinals season|Cardinals]] || 14–6 || '''[[Tanner Roark|Roark]]''' (2–0) || [[Adam Wainwright|Wainwright]] (0–2) || — || 27,413 || 4–3
// |- align="center" bgcolor="bbffbb"
// | 8 || April 11 || [[2017 St. Louis Cardinals season|Cardinals]] || 8–3 || '''[[Gio González|González]]''' (1–0) || [[Lance Lynn|Lynn]] (0–1) || — || 30,663 || 5–3
// |- align="center" bgcolor="ffbbbb"
// | 9 || April 12 || [[2017 St. Louis Cardinals season|Cardinals]] || 1–6 || [[Mike Leake|Leake]] (1–1) || '''[[Max Scherzer|Scherzer]]''' (1–1) || — || 31,647 || 5–4
// |- align="center" bgcolor="bbffbb"
// | 10 || April 14 || [[2017 Philadelphia Phillies season|Phillies]] || 3–2 <small>(10)</small> || '''[[Shawn Kelley|Kelley]]''' (1–0) || [[Jeanmar Gómez|Gómez]] (1–1) || — || 38,664 || 6–4
// |- align="center" bgcolor="ffbbbb"
// | 11 || April 15 || [[2017 Philadelphia Phillies season|Phillies]] || 2–4 || [[Jeremy Hellickson|Hellickson]] (2–0) || '''[[Joe Blanton|Blanton]]''' (0–2) || [[Joaquín Benoit|Benoit]] (1) || 35,626 || 6–5
// |- align="center" bgcolor="bbffbb"
// | 12 || April 16 || [[2017 Philadelphia Phillies season|Phillies]] || 6–4 || '''[[Shawn Kelley|Kelley]]''' (2–0) || [[Joaquín Benoit|Benoit]] (0–1) || — || 29,774 || 7–5
// |- align="center" bgcolor="bbffbb"
// | 13 || April 18 || @ [[2017 Atlanta Braves season|Braves]] || 3–1 || '''[[Max Scherzer|Scherzer]]''' (2–1) || [[Mike Foltynewicz|Foltynewicz]] (0–2) || '''[[Sean Kelley|Kelley]]''' (1) || 21,834 || 8–5
// |- align="center" bgcolor="bbffbb"
// | 14 || April 19 || @ [[2017 Atlanta Braves season|Braves]] || 14–4 || '''[[Joe Ross (baseball)|Ross]]''' (1–0) || [[Julio Teherán|Teherán]] (1–1) || — || 22,101 || 9–5
// |- align="center" bgcolor="bbffbb"`
// console.log(wtfMLB.parse(str))
