require("dotenv").config();
const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const queries = require("./queries");
const Auth = require("./helpers/auth.js");

//port
const port = 8000;

//middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

//Users
app.post("/login", queries.Users.loginUser);
app.post("/signUp", queries.Users.createUser);
app.get("/users/:id", Auth.authenticateToken, queries.Users.getUserById);
app.get("/users", Auth.authenticateToken, queries.Users.getUsers);
app.delete("/users", Auth.authenticateToken, queries.Users.deleteUser);
app.patch("/users/block", Auth.authenticateToken, queries.Users.blockUser);
app.patch("/users/unblock", Auth.authenticateToken, queries.Users.unBlockUser);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
