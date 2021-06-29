const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "ba2c04792c1825",
  password: "2b08771e",
  database: "heroku_14640958c11046a",
});

app.get("/", (req, res, next) => {
  res.render("hello.ejs");
});

app.get("/table", (req, res) => {
  connection.query("select * from test", (error, results) => {
    res.render("table.ejs", { items: results });
  });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  connection.query(
    "insert into test (name) value(?);",
    [req.body.itemName],
    (error, results) => {
      res.redirect("/table");
    }
  );
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  connection.query(
    "DELETE FROM `test` WHERE (`id` = ?);",
    id,
    (error, results) => {
      res.redirect("/table");
    }
  );
});

app.listen(process.env.PORT || 5000);
