/* wtf-plugin-mlb 2.0.0  MIT */
var teams = ["Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox", "Chicago Cubs", "Chicago White Sox", "Cincinnati Reds", "Cleveland Indians", "Colorado Rockies", "Detroit Tigers", "Houston Astros", "Kansas City Royals", "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins", "Milwaukee Brewers", "Minnesota Twins", "New York Mets", "New York Yankees", "Oakland Athletics", "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants", "Seattle Mariners", "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers", "Toronto Blue Jays", "Washington Nationals", //former teams
"Montreal Expos", "Washington Senators", "Seattle Pilots", "Kansas City Athletics", "Milwaukee Braves", "Washington Senators", "Brooklyn Dodgers"];

//
var playerStats = function playerStats(doc) {
  var players = [];
  var s = doc.sections('player stats') || doc.sections('player statistics') || doc.sections('statistics');

  if (!s) {
    return players;
  }

  s.children().forEach(function (c) {
    c.tables().forEach(function (t) {
      players = players.concat(t.keyValue());
    });
  });
  var res = {
    batters: [],
    pitchers: []
  };
  players.forEach(function (p) {
    var rbi = p.RBI || p.rbi;
    var hr = p.HR || p.hr;

    if (rbi !== undefined || hr !== undefined) {
      res.batters.push(p);
    } else {
      res.pitchers.push(p);
    }
  });
  return res;
};

var playerStats_1 = playerStats;

var dashSplit = /(–|-|−|&ndash;)/;

var parseTeam = function parseTeam(txt) {
  if (!txt) {
    return {};
  }

  var away = /^ *@ */.test(txt);
  return {
    name: txt.replace(/^ *\@ */, ''),
    home: !away
  };
};

var parseRecord = function parseRecord(txt) {
  if (!txt) {
    return {};
  }

  var arr = txt.split(dashSplit);
  var obj = {
    wins: parseInt(arr[0], 10) || 0,
    losses: parseInt(arr[2], 10) || 0
  };
  obj.games = obj.wins + obj.losses;
  var plusMinus = obj.wins / obj.games;
  obj.plusMinus = Number(plusMinus.toFixed(2));
  return obj;
};

var parseScore = function parseScore(txt) {
  if (!txt) {
    return {};
  }

  txt = txt.replace(/^[wl] /i, '');
  var arr = txt.split(dashSplit);
  var obj = {
    winner: parseInt(arr[0], 10),
    loser: parseInt(arr[2], 10)
  };

  if (isNaN(obj.winner) || isNaN(obj.loser)) {
    return {};
  }

  return obj;
};

var parseAttendance = function parseAttendance() {
  var txt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  //support [[Rogers Center]] (23,987)
  if (txt.indexOf('(') !== -1) {
    var m = txt.match(/\(([0-9 ,]+)\)/);

    if (m && m[1]) {
      txt = m[1];
    }
  }

  txt = txt.replace(/,/g, '');
  return parseInt(txt, 10) || null;
};

var parsePitchers = function parsePitchers(row) {
  var win = row.Win || row.win || '';
  win = win.replace(/\(.*?\)/, '').trim();
  var loss = row.Loss || row.loss || '';
  loss = loss.replace(/\(.*?\)/, '').trim();
  var save = row.Save || row.save || '';
  save = save.replace(/\(.*?\)/, '').trim();

  if (dashSplit.test(save) === true) {
    save = null;
  }

  return {
    win: win,
    loss: loss,
    save: save
  };
};

var parseRow = function parseRow(row) {
  if (!row) {
    return null;
  }

  var team = parseTeam(row.opponent || row.Opponent);
  var record = parseRecord(row.record || row.Record);
  var obj = {
    date: row.date || row.Date,
    team: team.name || team.Name,
    home: team.home || team.Home || false,
    pitchers: parsePitchers(row),
    result: parseScore(row.score || row.Score || row['box score'] || row['Box Score']),
    record: record,
    attendance: parseAttendance(row.attendance || row.Attendance || row['location (attendance)'] || row['Location (Attendance)'])
  };
  return obj;
};

var parseGame = parseRow;

//amazingly, it's not clear who won the game, without the css styling.
//try to pull-it out based on the team's record
var addWinner = function addWinner(games) {
  var wins = 0;
  games.forEach(function (g) {
    if (g.record.wins > wins) {
      g.win = true;
      wins = g.record.wins;
    } else {
      g.win = false;
    } //improve the result format, now that we know who won..


    var res = g.result;

    if (g.win) {
      g.result = {
        us: res.winner,
        them: res.loser
      };
    } else {
      g.result = {
        us: res.loser,
        them: res.winner
      };
    }
  });
  return games;
};

var winner = addWinner;

var doTable = function doTable(rows) {
  var games = []; //is it a legend/junk table?

  if (rows[1] && rows[1].Legend) {
    return games;
  }

  rows.forEach(function (row) {
    games.push(parseGame(row));
  }); //remove empty weird ones

  games = games.filter(function (g) {
    return g.team && g.date;
  }); //&& g.result.winner !== undefined

  return games;
};

var doSection = function doSection(section) {
  var tables = section.tables(); //do all subsections, too

  section.children().forEach(function (s) {
    tables = tables.concat(s.tables());
  }); //try to find a game log template

  if (tables.length === 0) {
    tables = section.templates('mlb game log section') || section.templates('mlb game log month');
    tables = tables.map(function (m) {
      return m.data;
    }); //make it look like a table
  } else {
    tables = tables.map(function (t) {
      return t.keyValue();
    });
  }

  return tables;
}; //get games of regular season


var gameLog = function gameLog(doc) {
  var games = []; // grab the generated section called 'Game Log'

  var section = doc.sections('game log') || doc.sections('game log and schedule') || doc.sections('regular season') || doc.sections('season');

  if (!section) {
    console.warn('no game log section for: \'' + doc.title() + '\'');
    return games;
  }

  var tables = doSection(section);
  tables.forEach(function (table) {
    var arr = doTable(table);
    games = games.concat(arr);
  });
  games = winner(games);
  return games;
};

var postSeason = function postSeason(doc) {
  var series = []; //ok, try postseason, too

  var section = doc.sections('postseason game log') || doc.sections('postseason') || doc.sections('playoffs') || doc.sections('playoff');

  if (!section) {
    return series;
  }

  var tables = doSection(section);
  tables.forEach(function (table) {
    var arr = doTable(table);
    series.push(arr);
  }); //tag them as postseason
  // games.forEach((g) => g.postSeason = true)

  series.forEach(function (games) {
    return winner(games);
  });
  return series;
};

var gameLog_1 = {
  season: gameLog,
  postseason: postSeason
};

var parseTitle = function parseTitle() {
  var season = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var num = season.match(/[0-9]+/) || [];
  var year = Number(num[0]) || season;
  var team = season.replace(/[0-9]+/, '').replace(/_/g, ' ').replace(' season', '');
  return {
    year: year,
    season: season,
    team: team.trim()
  };
}; //this is just a table in a 'roster' section


var parseRoster = function parseRoster(doc, res) {
  var s = doc.sections('roster') || doc.sections('players') || doc.sections(res.year + ' roster');

  if (!s) {
    return {};
  }

  var players = s.templates('mlbplayer') || [];
  players = players.map(function (o) {
    delete o.template;
    return o;
  });
  return players;
}; //this is just a table in a '2008 draft picks' section


var draftPicks = function draftPicks(doc) {
  var want = /\bdraft\b/i;
  var s = doc.sections().find(function (sec) {
    return want.test(sec.title());
  });

  if (!s) {
    return [];
  }

  var table = s.tables(0);

  if (!table) {
    return [];
  }

  return table.keyValue();
}; //grab game-data from a MLB team's wikipedia page:


var parsePage = function parsePage(doc) {
  if (!doc) {
    return {};
  }

  var res = parseTitle(doc.title());
  res.games = gameLog_1.season(doc);
  res.postseason = gameLog_1.postseason(doc); //grab the roster/draft data

  res.roster = parseRoster(doc, res);
  res.draftPicks = draftPicks(doc); //get the per-player statistics

  res.playerStats = playerStats_1(doc);
  return res;
};

var parse = parsePage;

var addMethod = function addMethod(models) {
  models.wtf.getSeason = function (team, year) {
    //soften-up the team-input
    team = teams.find(function (t) {
      return t === team || t.toLowerCase().includes(team.toLowerCase());
    }) || team;
    team = team.replace(/ /g, '_');
    year = year || new Date().getFullYear();
    var page = "".concat(year, "_").concat(team, "_season");
    return models.wtf.fetch(page)["catch"](console.log).then(parse);
  };
};

var src = addMethod;

export default src;
