const express = require("express");
const app = express();

const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);
let people = [];

connection.query(
  `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment primary key, name varchar(255))`
);
const sql = `INSERT INTO people (name) values ('Geraldo'), ('Wesley'), ('Stephane')`;
connection.query(sql);

connection.query("SELECT * FROM people", function (err, result, fields) {
  if (err) throw err;
  Object.keys(result).forEach(function (key) {
    var row = result[key];
    people.push(row);
  });
});

connection.end();

app.get("/", (req, res) => {
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${people.map(p => `<li> ${p.name} </li>`).join("")}
    </ul>
  `);
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));
