const wtfMLB = require('./src')
// const wtf = require('wtf_wikipedia')

wtfMLB.fetch('New York Mets', 2017).catch(console.log).then((data => {
  console.log(data.slice(0, 5))
  console.log(data.length)
}))


//| 2 || April 2 || @ [[2014 New York Mets season|Mets]] || 5–1 || '''[[Gio González|González]]''' (1–0) || [[Bartolo Colón|Colón]] (0–1) || || 29,146 || 2–0
