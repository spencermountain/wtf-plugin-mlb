// const wtfMLB = require('./builds/wtf-mlb')
const wtf = require('../wtf_wikipedia/src')
wtf.extend(require('./src'))

wtf
  .getSeason('Toronto', 2019)
  .catch(console.log)
  .then((data) => {
    // console.log(obj.games.slice(70).map((g) => g.record))
    // console.log(JSON.stringify(obj.games.slice(70), null, 2))
    console.log(Object.keys(data))
  })
