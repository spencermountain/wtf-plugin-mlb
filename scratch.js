const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')
//
wtfMLB.fetch('Washington Nationals', 2017).catch(console.log).then((data => {
  console.log(data.length)
  console.log(data.slice(166,data.length))
}))

//| 2 || April 2 || @ [[2014 New York Mets season|Mets]] || 5–1 || '''[[Gio González|González]]''' (1–0) || [[Bartolo Colón|Colón]] (0–1) || || 29,146 || 2–0
