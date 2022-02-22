require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cats = require("./cat.js");
const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES,
  ssl: {
    rejectUnauthorized: false,
  },
});
// pool.query("SELECT * FROM users", (err, res) => {
//   console.log(res.rows);
//   pool.end();
// });
(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM users");
    console.log(res.rows[0]);
  } catch (e) {
    console.log(e);
  } finally {
    // Make sure to release the client before any error handling,
    client.release();
  }
})();

const authenticate = async (username, password) => {
  const client = await pool.connect();
  try {
    console.log({ username, password });
    const res = await client.query(
      `SELECT * from users WHERE username = '${username}' AND pass = '${password}'`
    );
    console.log("-----------SQL RES---------------");
    if (res.rows[0]) {
      console.log("found account");
      return true;
    } else {
      console.log("account dne");
      return false;
    }
  } catch (e) {
    console.log(e);
  } finally {
    // Make sure to release the client before any error handling,
    client.release();
  }
};

const getPosts = async (username) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * from posts
      where username IN 
      (SELECT distinct unnest(array[
              username1
              , username2
          ]) as users
      from friendships
      WHERE username1 ='${username}'
      OR username2 = '${username}')`
    );
    console.log("-----------SQL RES---------------");
    console.log(res.rows);
    return res.rows;
  } catch (e) {
    console.log(e);
  } finally {
    // Make sure to release the client before any error handling,
    client.release();
  }
};

let db = [
  {
    name: "buster",
    breed: "terrier",
    weight: "122",
  },
];

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  console.log({ username, password });
  const isAuthenticated = await authenticate(username, password);
  if (isAuthenticated) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get("/posts/:username", async (req, res) => {
  const { username } = req.params;
  response = await getPosts(username);
  res.send({
    body: response,
  });
});

// app.use("/cats", cats);

// app.get("/", (req, res) => {
//   const { name } = req.query;
//   const pet = db.find((pet) => pet.name === name);
//   res.send({
//     body: pet,
//   });
// });

// app.post("/", (req, res) => {
//   db = [...db, req.body];
//   res.send({
//     body: db,
//   });
// });

// app.put("/", (req, res) => {
//   let { name } = req.body;
//   console.log(name);
//   db.forEach((pet, i) => {
//     console.log(pet);
//     if (pet.name === name) {
//       db[i] = req.body;
//     }
//   });
//   console.log(db);
//   res.send({
//     body: db,
//   });
// });

// app.delete("/", (req, res) => {
//   updatedAnimal = req.body;
//   db = db.filter((animal) => animal.name !== updatedAnimal.name);
//   res.send({
//     body: db,
//   });
// });

app.listen(port, () => {
  console.log("Listening on", port);
});
