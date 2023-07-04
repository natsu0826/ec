const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('assets'));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'ec_db'
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/basket/:item")

app.get("/list/:itemname", (req, res) => {
  const sql = "SELECT * FROM itemlist WHERE itemname = ?";
  con.query(sql, [req.params.itemname], function (err, result, fields) {
    if (err) throw err;
    const itemlist = result.map((itemname) => {
      itemname.images = itemname.itemimage.split(",");
      return itemname;
    });

    const selectedValue = req.query.sort;
    const reviewSql = "SELECT * FROM review WHERE itemname = ?";

    let sqlWithSort = reviewSql;
    if (selectedValue === "2") {
      sqlWithSort += " ORDER BY evaluation DESC";
    } else if (selectedValue === "3") {
      sqlWithSort += " ORDER BY evaluation ASC";
    }
    con.query(sqlWithSort, [req.params.itemname], function (err, reviewResult, fields) {
      if (err) throw err;
      res.render("list", {
        itemlist: itemlist,
        review: reviewResult,
      });
    });
  });
});

app.get("/", (req, res) => {
  const sql =
    "SELECT DISTINCT itemname, GROUP_CONCAT(itemimage) AS images, GROUP_CONCAT(price) AS prices FROM itemlist GROUP BY itemname";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { itemlist: result });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
