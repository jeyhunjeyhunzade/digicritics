"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet = require("helmet");
var compression = require("compression");
var queries_1 = __importDefault(require("./queries"));
var auth_js_1 = __importDefault(require("./helpers/auth.js"));
//port
var port = 8000;
//middleware
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(helmet());
app.use(compression());
//Users
app.post("/login", queries_1.default.Users.loginUser);
app.post("/signUp", queries_1.default.Users.createUser);
app.get("/users/:id", auth_js_1.default.authenticateToken, queries_1.default.Users.getUserById);
app.get("/users", queries_1.default.Users.getUsers);
app.delete("/users", auth_js_1.default.authenticateToken, queries_1.default.Users.deleteUser);
app.patch("/users/block", auth_js_1.default.authenticateToken, queries_1.default.Users.blockUser);
app.patch("/users/unblock", auth_js_1.default.authenticateToken, queries_1.default.Users.unBlockUser);
app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port, "."));
});
