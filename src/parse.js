//who knows!

const parseTeam = function(s) {
  if (!s) {
    return {}
  }
  let txt = s.text()
  let away = /^ *@ */.test(txt)
  return {
    name: txt.replace(/^ *\@ */, ''),
    home: !away
  }
}

const parseRecord = function(s) {
  if (!s) {
    return {}
  }
  let arr = s.text().split('–')
  let obj = {
    wins: parseInt(arr[0], 10),
    losses: parseInt(arr[1], 10),
  }
  obj.games = obj.wins + obj.losses
  return obj
}

const parseScore = function(s) {
  if (!s) {
    return {}
  }
  let arr = s.text().split('–')
  let obj = {
    us: parseInt(arr[0], 10),
    them: parseInt(arr[1], 10),
  }
  obj.win = obj.us > obj.them
  if (isNaN(obj.us) || isNaN(obj.them)) {
    return {}
  }
  return obj
}

const parseAttendance = function(s) {
  if (!s) {
    return null
  }
  let txt = s.text()
  txt = txt.replace(/,/g, '')
  return parseInt(txt, 10)
}
const parseDate = function(s) {
  if (!s) {
    return null
  }
  return s.text()
}

const parseRow = function(row) {
  if (!row) {
    return null
  }
  let team = parseTeam(row.Opponent)
  let record = parseRecord(row.Record)
  let obj = {
    date: parseDate(row.Date),
    team: team.name,
    home: team.home,
    result: parseScore(row.Score),
    record: record,
    attendance: parseAttendance(row.Attendance)
  }
  return obj
}

//grab game-data from a MLB team's wikipedia page:
const parsePage = function(doc) {
  let games = []
  //grab the generated section called 'Game Log'
  let section = doc.sections('Game Log')
  if (!section) {
    return games
  }
  let months = section.tables()
  //get rid of extra 'legend' tables
  months = months.filter(m => m[1] && !m[1].Legend)
  //each month is it's own table
  months.forEach((rows) => {
    rows.forEach(row => {
      games.push(parseRow(row))
    })
  })
  return games
}
module.exports = parsePage
