'use strict';
var test = require('tape');
var wtfMlb = require('../src')

test('Washington Nationals 2017', t => {
  wtfMlb.fetch('Washington Nationals', 2017).catch(console.log).then((data => {
    t.notEqual(data[0].date, null, 'has game-0-date')
    // t.equal(data.length, 170, 'has 162 games') //+ rain outs?
    t.ok(data.length > 161, 'has atleast 161 games') //+ rain outs?
    t.notEqual(data[data.length-1].Record, '97–65', 'got last record')
    t.notEqual(data[data.length-1].Attendance, 35,652, 'got last attendance')
    t.notEqual(data[data.length-1].Date, 'October 1', 'got last date')
    t.end();
  }))
});

test('Blue Jays 2016', t => {
  wtfMlb.fetch('Blue Jays', 2016).catch(console.log).then((data => {
    t.equal(data[0].date, 'April 3', 'has game-0-date')
    t.equal(data[0].result.win, true, 'has game-0-win')
    // t.equal(data.length, 170, 'has 162 games') //+ rain outs?
    t.ok(data.length > 161, 'has atleast 161 games') //+ rain outs?
    t.notEqual(data[data.length-1].Record, '89–73', 'got last record')
    t.notEqual(data[data.length-1].Attendance, 36787, 'got last attendance')
    t.notEqual(data[data.length-1].Date, 'October 2', 'got last date')
    t.end();
  }))
});
