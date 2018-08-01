<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>grab a MLB team's season from wikipedia</div>
  <a href="https://npmjs.org/package/wtf-mlb">
    <img src="https://img.shields.io/npm/v/wtf-mlb.svg?style=flat-square" />
  </a>
  <!-- <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-green.svg?style=flat-square" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/efrt">
    <img src="https://api.codacy.com/project/badge/grade/fc03e2761c8c471c8f84141abf2704de" />
  </a>
  <a href="https://www.codacy.com/app/spencerkelly86/efrt">
    <img src="https://api.codacy.com/project/badge/Coverage/fc03e2761c8c471c8f84141abf2704de" />
  </a> -->
</div>

<div align="center">
  <code>npm install wtf-mlb</code>
</div>

```js
wtfMLB.fetch('Toronto Blue Jays', 2018).then(console.log)
//[{
//   date: 'April 1',
//   team: 'Reds',
//   home: false,
//   result: { us: 6, them: 5, win: true },
//   record: { wins: 3, losses: 0, games: 3
// },
//  ....


//or if you already have the doc,
var json = wtfMLB.parse(doc)
```

(work-in-progress)

MIT
