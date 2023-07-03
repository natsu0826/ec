    const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
});


app.use(bodyParser.urlencoded({ extended: true }));



con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});
app.get('/', (req, res) => {
  res.render('index');
});





app.listen(port, () => console.log(`Example app listening on port ${port}!`));
