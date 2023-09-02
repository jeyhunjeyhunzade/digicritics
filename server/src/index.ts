import "dotenv/config";
import express from "express";
import cors from "cors";
var helmet = require("helmet");
var compression = require("compression");
import queries from "./queries";
import Auth from "./helpers/auth";
import { uploadSingleMedia, uploadMultipleMedia } from "./mediaupload";

//port
const port = 8000;

//middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(helmet());
app.use(compression());

//Users
app.post("/login", queries.Users.loginUser);
app.post("/signUp", queries.Users.createUser);
app.get("/users/:id", queries.Users.getUserById);
app.get("/users", Auth.authenticateToken, queries.Users.getUsers);
app.delete("/users", Auth.authenticateToken, queries.Users.deleteUser);
app.patch("/users/block", Auth.authenticateToken, queries.Users.blockUser);
app.patch("/users/unblock", Auth.authenticateToken, queries.Users.unBlockUser);
app.patch(
  "/users/setAdmin",
  Auth.authenticateToken,
  queries.Users.updateUserRole
);
app.patch("/users/edit", Auth.authenticateToken, queries.Users.updateUser);

//Reviews
app.post(
  "/review/createReview",
  Auth.authenticateToken,
  queries.Reviews.createReview
);
app.get("/reviews", queries.Reviews.getReviews);
app.get("/reviews/:id", queries.Reviews.getReviewById);
app.patch(
  "/reviews/:reviewId/like",
  Auth.authenticateToken,
  queries.Reviews.likeReview
);
app.patch(
  "/reviews/:reviewId/rate",
  Auth.authenticateToken,
  queries.Reviews.rateReview
);

//media upload api
app.post("/uploadMedia", (req, res) => {
  uploadSingleMedia(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send({ message: err }));
});
app.post("/uploadMultipleMedia", (req, res) => {
  uploadMultipleMedia(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send({ message: err }));
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
