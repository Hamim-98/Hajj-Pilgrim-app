const express = require("express");
const router = express.Router();

// const connection = require("../config/database");
router.get("/", (req, res, next) => {
 const deviceID= req.query.deviceID;
 const val=req.query.val;
//  console.log(val)
  // console.log(data)
  const mysql = require("mysql");
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "password",
  //   database: "ppug_debug",
  //   port: 3306,
  // });
 
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "password",
  //   database: "haji",
  //   port: 3306,
  // });

  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
  });


  var today = new Date();
  function date() {
    var dd = today.getDate();
    // if(dd<10){
    //   dd='0'+dd
    // }
    // dd = dd - 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    // console.log(today);
  }
  date();

  var ret = [];
  var dat = [];

  // var q = `SELECT * FROM haji_data WHERE topicDeviceID="${station}" AND DATE_FORMAT(timestamp, "%e/%c/%Y")="${today}";`;
  var q = `SELECT MIN(${val}) as min,MAX(${val}) as max, AVG(${val}) as avg,timestamp, HOUR(timestamp) AS hour, DATE_FORMAT(timestamp, "%e/%c/%y") AS date FROM haji_data WHERE topicDeviceID="${deviceID}" AND DATE_FORMAT(timestamp, "%e/%c/%Y")="${today}" GROUP BY hour,date ORDER BY hour;`;
  // var q = `SELECT MIN(O2) as min,MAX(O2) as max, AVG(O2) as avg,timestamp, HOUR(timestamp) AS hour, DATE_FORMAT(timestamp, "%d/%c/%y") AS date FROM geyser_one WHERE DATE_FORMAT(timestamp, "%e/%c/%Y")="${today}" GROUP BY hour,date ORDER BY hour;`;
  // console.log(data)
  connection.connect();
  connection.query(q, function (error, row, fields) {
    if (error) {
      console.log(error);
    }
    if (row) {
      for (var i = 0; i < row.length; i++) {
        if (row[i].hour < 10) {
          row[i].hour = "0" + row[i].hour;
        }
        dat.push({
          min: row[i].min.toFixed(2),
          max: row[i].max.toFixed(2),
          avg: row[i].avg.toFixed(2),
          timestamp: row[i].timestamp,
          hour: row[i].hour,
          date: row[i].date,
        });
      }
      // console.log(row);
    }

    ret = JSON.stringify(dat);
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(ret);
  });
  connection.end();
});
module.exports = router;
