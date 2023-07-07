const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const session = require('express-session');
const methodOverride = require("method-override");

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));



app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(methodOverride("_method"));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'ec_db'
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/list", (req, res) => {
  const sql = "SELECT * FROM itemlist";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("list", {
      itemlist: result,
    });
  });
});

app.get("/create", (req, res) => {
  const itemname = req.query.itemname;

  const sql = "INSERT INTO review VALUES (?)";
  const values = [itemname];

  con.query(sql, values, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/list"); // データ保存後にリダイレクトするURLを指定します
  });
});



app.post("/", (req, res) => {
  const { itemname, userId, content, evaluation} = req.body;
  

  const sql = "INSERT INTO review (itemname, userId, content, evaluation) VALUES (?, ?, ?, ?)";
  const values = [itemname, Id, content, evaluation];

  con.query(sql, values, function (err, result, fields) {
    if (err) throw err;
    console.log(result);

    res.redirect("/");
  });
});



app.post("/basket/:itemname/add", (req, res) => {
  const itemname = req.params.itemname;
  const price = req.body.price;

  const sql = "SELECT * FROM itemlist WHERE itemname = ?";
  con.query(sql, [itemname], function (err, result, fields) {
    if (err) throw err;
    const itemlist = result.map((itemname) => {
      itemname.images = itemname.itemimage.split(",");
      return itemname;
    });
    // カートに追加（セッションに保存）
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({ itemname, price });

    res.redirect("/basket");
  });
});

app.get("/basket", (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  let itemTotal = {}; // 各アイテム名のカラム合計金額を格納するオブジェクト

  // カート内の商品の画像情報と合計金額を計算する
  const itemNames = cart.map((item) => item.itemname);

  if (itemNames.length === 0) {
    // カートが空の場合は空の結果をレンダリングする
    res.render("basket", {
      cart: cart,
      total: total,
      itemlist: [],
      itemTotal: itemTotal,
      itemCounts: {},
    });
  } else {
    const sql = "SELECT * FROM itemlist WHERE itemname IN (?)";
    con.query(sql, [itemNames], function (err, result, fields) {
      if (err) throw err;

      const itemlist = result.map((item) => {
        item.images = item.itemimage.split(",");
        return item;
      });

      // 各商品の価格を取得して合計金額を計算する
      cart.forEach(function (item) {
        const foundItem = itemlist.find((i) => i.itemname === item.itemname);
        if (foundItem) {
          total += foundItem.price;
          if (itemTotal[item.itemname]) {
            itemTotal[item.itemname] += foundItem.price;
          } else {
            itemTotal[item.itemname] = foundItem.price;
          }
        }
      });
      const itemCounts = {};
      cart.forEach((item) => {
        if (itemCounts[item.itemname]) {
          itemCounts[item.itemname]++;
        } else {
          itemCounts[item.itemname] = 1;
        }
      });

      res.render("basket", {
        cart: cart,
        total: total,
        itemlist: itemlist,
        itemTotal: itemTotal,
        itemCounts: itemCounts,
      });
    });
  }
});




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


app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM review WHERE id = ?"
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/basket/delete/:itemname", (req, res) => {
  const itemname = req.params.itemname;

  if (req.session.cart) {
    const index = req.session.cart.findIndex(item => item.itemname === itemname);
    if (index !== -1) {
      req.session.cart.splice(index, 1);
    }
  }

  res.redirect("/basket");
});



app.get("/", (req, res) => {
  let sql = `
  SELECT
    itemlist.itemname,
    itemlist.price,
    GROUP_CONCAT(itemlist.itemimage) AS images,
    COALESCE(ROUND(AVG(review.evaluation), 2), 0) AS averagerating,
    COALESCE(COUNT(review.evaluation), 0) AS reviewcount
  FROM
    itemlist
  LEFT JOIN
    review ON itemlist.itemname = review.itemname
  GROUP BY
    itemlist.itemname, itemlist.price
`;


  const sortOption = req.query.sort;

  if (sortOption === "priceDesc") {
    sql += " ORDER BY itemlist.price DESC";
  } else if (sortOption === "priceAsc") {
    sql += " ORDER BY itemlist.price ASC";
  } else if (sortOption === "nameAsc") {
    sql += " ORDER BY itemlist.itemname ASC";
  } else if (sortOption === "ratingDesc") {
    sql += " ORDER BY averagerating DESC";
  } else if (sortOption === "reviewDesc") {
    sql += " ORDER BY reviewcount DESC";
  }

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", { itemlist: result });
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
