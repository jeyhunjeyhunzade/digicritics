require("dotenv").config();
import http from "http";
import express from "express";
import cors from "cors";
var helmet = require("helmet");
var compression = require("compression");
import { uploadSingleMedia, uploadMultipleMedia } from "./mediaupload";
import queries from "./queries";
import { jwtCheck } from "./helpers/auth";
import { io, initSocketServer } from "./socket";

//port
const port = process.env.PORT || 3000;

//middleware
const app = express();
const server = http.createServer(app);
initSocketServer(server);
app.use(cors());
app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.json({ limit: "25mb" }));
app.use(helmet());
app.use(compression());

//Users
app.post("/login", queries.Users.loginUser);
app.post("/signUp", queries.Users.createUser);
app.post("/users/email", queries.Users.getUserIdByEmail);
app.get("/users/:id", queries.Users.getUserById);
app.get("/users", jwtCheck, queries.Users.getUsers);
app.delete("/users", jwtCheck, queries.Users.deleteUser);
app.patch("/users/block", queries.Users.blockUser);
app.patch("/users/unblock", jwtCheck, queries.Users.unBlockUser);
app.patch("/users/updaterole", queries.Users.updateUserRole);
app.patch("/users/edit", jwtCheck, queries.Users.updateUser);

//Reviews
app.get("/reviews", queries.Reviews.getReviews);
app.get("/reviews/:reviewId/comments", queries.Reviews.getCommentsForReview);
app.get("/tags", queries.Reviews.getTags);
app.get("/categories", queries.Reviews.getCategories);
app.get("/reviews/:id", queries.Reviews.getReviewById);
app.get("/reviews/tags/:tagName", queries.Reviews.getReviewsByTag);
app.get("/reviews/similarReview/:reviewId", queries.Reviews.getSimilarReviews);
app.post("/createCategory", jwtCheck, queries.Reviews.createCategory);
app.post("/review/createReview", jwtCheck, queries.Reviews.createReview);
app.post("/getFullTextSearch", queries.Reviews.getFullTextSearch);
app.patch("/reviews/updateReview", jwtCheck, queries.Reviews.editReview);
app.patch("/reviews/:reviewId/like", jwtCheck, queries.Reviews.likeReview);
app.patch("/reviews/:reviewId/rate", jwtCheck, queries.Reviews.rateReview);
app.patch(
  "/reviews/:reviewId/addComment",
  jwtCheck,
  queries.Reviews.addCommentToReview
);
app.delete("/reviews/:reviewId/delete", jwtCheck, queries.Reviews.deleteReview);
app.delete("/deleteCategory", jwtCheck, queries.Reviews.deleteCategory);

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

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
