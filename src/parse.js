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
  let arr = s.text().split(/[–-]/)
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
  let txt = s.text()||''
  //support [[Rogers Center]] (23,987)
  if(txt.indexOf('(')!==-1){
    let m=txt.match(/\(([0-9 ,]+)\)/)
    if(m && m[1]){
      txt=m[1]
    }
  }
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
    result: parseScore(row.Score || row['Box Score']),
    record: record,
    attendance: parseAttendance(row.Attendance || row['Location (Attendance)'])
  }
  return obj
}

//grab game-data from a MLB team's wikipedia page:
const parsePage = function(doc) {
  let games = []
  //grab the generated section called 'Game Log'
  let section = doc.sections('game log')
  if (!section) {
    return games
  }
  let months = section.tables()
  // console.log(section.wikitext())
  //get rid of extra 'legend' tables
  months = months.filter(table => table.data[1] && !table.data[1].Legend)
  // console.log(months[months.length-1])
  //each month is it's own table
  months.forEach((table) => {
    table.data.forEach(row => {
      games.push(parseRow(row))
    })
  })
  //remove empty weird ones
  games=games.filter((g) => g.team && g.date)
  return games
}
module.exports = parsePage
