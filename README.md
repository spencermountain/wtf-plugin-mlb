> **Heads-up**
> 
> This plugin has moved to → <a href="https://github.com/spencermountain/wtf_wikipedia/tree/master/plugins/sports">wtf_wikipedia/plugins/sports</a>
>
> this repo is now deprecated.


<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />

  <div>a plugin for <a href="https://github.com/spencermountain/wtf_wikipedia/">wtf_wikipedia</a></div>
  
  <!-- npm version -->
  <a href="https://npmjs.org/package/wtf-plugin-mlb">
    <img src="https://img.shields.io/npm/v/wtf-plugin-mlb.svg?style=flat-square" />
  </a>
  
  <!-- file size -->
  <a href="https://unpkg.com/wtf-plugin-person/builds/wtf-plugin-mlb.min.js">
    <img src="https://badge-size.herokuapp.com/spencermountain/wtf-plugin-mlb/master/builds/wtf-plugin-mlb.min.js" />
  </a>
   <hr/>
</div>

<div align="center">
  <code>npm install wtf-plugin-mlb</code>
</div>

wtf-mlb gets structured data for mlb baseball teams, supports a bunch of different variants of mlb game log variations, and tries to cleanup some complicated parts of wikipedia sometimes in the wild.

```js
const plugin = require('wtf-plugin-mlb')
wtf.extend(plugin)
wtf.getSeason('Toronto Blue Jays', 2018).then((data) => {
  console.log(data)
  /*{
  games: [{
      date: 'April 1',
      team: 'Reds',
      home: false,
      result: { us: 6, them: 5, win: true },
      record: { wins: 3, losses: 0, games: 3
    },
    ...
  ],
  postseason: [...],
  roster: [],
  draftPicks: [],
  playerStats: [] 
}*/
})
```

<div align="center">
  <h2><a href="https://observablehq.com/@spencermountain/wikipedia-baseball-table-parser">Demo</a></h2>
</div>

MIT
