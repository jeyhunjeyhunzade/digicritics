import "dotenv/config";
import express from "express";
import cors from "cors";
var helmet = require("helmet");
var compression = require("compression");
import { uploadSingleMedia, uploadMultipleMedia } from "./mediaupload";
import queries from "./queries";
import { jwtCheck } from "./helpers/auth";

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
app.post("/users/email", queries.Users.getUserIdByEmail);
app.get("/users/:id", jwtCheck, queries.Users.getUserById);
app.get("/users", jwtCheck, queries.Users.getUsers);
app.delete("/users", jwtCheck, queries.Users.deleteUser);
app.patch("/users/block", queries.Users.blockUser);
app.patch("/users/unblock", jwtCheck, queries.Users.unBlockUser);
app.patch("/users/updaterole", queries.Users.updateUserRole);
app.patch("/users/edit", jwtCheck, queries.Users.updateUser);

//Reviews
app.get("/reviews", queries.Reviews.getReviews);
app.get("/tags", queries.Reviews.getTags);
app.get("/categories", queries.Reviews.getCategories);
app.post("/createCategory", jwtCheck, queries.Reviews.createCategory);
app.post("/review/createReview", jwtCheck, queries.Reviews.createReview);
app.get("/reviews/:id", queries.Reviews.getReviewById);
app.patch("/reviews/:reviewId/like", jwtCheck, queries.Reviews.likeReview);
app.patch("/reviews/:reviewId/rate", jwtCheck, queries.Reviews.rateReview);
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

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
