const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "1",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "2",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com"
    }
  ]
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    // database.users
    //   .filter(user => {
    //     user.email === req.body.email;
    //   })
    //   .some(user => user.password === req.body.password)
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
  ) {
    res.json(database.users[1]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
  });
  const newUser = {
    id: database.users.length + 2,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  };
  console.log(newUser);
  database.users.push(newUser);
  console.log(database.users[database.users.length - 1]);
  res.json(newUser);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("No such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("Not found");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
