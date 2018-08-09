'use strict';
var test = require('tape');
var wtfMlb = require('../src')

test('structured date templates', t => {
  wtfMlb.fetch('Washington Nationals', 2017).catch(console.log).then((data => {
    t.notEqual(data[0].date, null, 'has game-0-date')
    t.equal(data.length, 170, 'has 172 games')
    t.end();
  }))
});
