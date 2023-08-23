"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("../helpers/auth"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("../config"));
var userStatus = {
    active: "ACTIVE",
    blocked: "BLOCKED",
};
var Users = {
    loginUser: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, userQuery, userById, updateLastLogin, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password;
                    if (!email || !password) {
                        return [2 /*return*/, response.status(400).send({ message: "Some values are missing" })];
                    }
                    if (!auth_1.default.isValidEmail(email)) {
                        return [2 /*return*/, response
                                .status(400)
                                .send({ message: "Please enter a valid email address" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, config_1.default.query("SELECT * FROM users WHERE email = $1", [email])];
                case 2:
                    userQuery = _b.sent();
                    userById = userQuery.rows[0];
                    if (!userById) {
                        return [2 /*return*/, response.status(404).send({ message: "User can not be found." })];
                    }
                    if (!bcrypt_1.default.compareSync(password, userById.password)) {
                        return [2 /*return*/, response
                                .status(400)
                                .send({ message: "email and password does not match" })];
                    }
                    if (userById.status !== userStatus.active) {
                        return [2 /*return*/, response.status(403).send({ message: "User is blocked" })];
                    }
                    return [4 /*yield*/, config_1.default.query("UPDATE users SET last_login = current_timestamp WHERE id = $1", [userById.id])];
                case 3:
                    updateLastLogin = _b.sent();
                    token = auth_1.default.generateToken(userById.id);
                    return [2 /*return*/, response.status(201).json({ token: token })];
                case 4:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_1.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    createUser: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, name, userQuery, userById, error_2, hashPassword, newUser, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, email = _a.email, password = _a.password, name = _a.name;
                    if (!email || !password || !name) {
                        return [2 /*return*/, response.status(400).send({ message: "Some values are missing" })];
                    }
                    if (!auth_1.default.isValidEmail(email)) {
                        return [2 /*return*/, response
                                .status(400)
                                .send({ message: "Please enter a valid email address" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, config_1.default.query("SELECT * FROM users WHERE email = $1", [email])];
                case 2:
                    userQuery = _b.sent();
                    userById = userQuery.rows[0];
                    if (userById) {
                        return [2 /*return*/, response
                                .status(404)
                                .send({ message: "Already registered with this email" })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_2.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 4];
                case 4:
                    hashPassword = auth_1.default.hashPassword(password);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, config_1.default.query("INSERT INTO users ( email, password, name, status) VALUES ($1, $2, $3, $4) RETURNING *", [email, hashPassword, name, userStatus.active])];
                case 6:
                    newUser = _b.sent();
                    response.status(200).json({ message: "Successfully created" });
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _b.sent();
                    if (error_3 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_3.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); },
    getUsers: function (_request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var allUsers, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, config_1.default.query("SELECT id, name, email, status, register_time, last_login FROM users ORDER BY id ASC")];
                case 1:
                    allUsers = _a.sent();
                    response.status(200).json(allUsers.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    if (error_4 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_4.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getUserById: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userById, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt(request.params.id);
                    if (!id) {
                        return [2 /*return*/, response.status(400).send({ message: "please provide an id" })];
                    }
                    return [4 /*yield*/, config_1.default.query("SELECT id, name, email, status FROM users WHERE id = $1", [id])];
                case 1:
                    userById = _a.sent();
                    response.status(200).json(userById.rows[0]);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    if (error_5 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_5.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteUser: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var userIds, deletedUser;
        return __generator(this, function (_a) {
            try {
                userIds = request.body.userIds;
                if (!userIds || !userIds.length) {
                    return [2 /*return*/, response
                            .status(400)
                            .send({ message: "please provide at least one id" })];
                }
                deletedUser = config_1.default.query("DELETE FROM users WHERE id = ANY($1)", [
                    userIds,
                ]);
                response
                    .status(200)
                    .send({ message: "Users deleted with ID: ".concat(userIds) });
            }
            catch (error) {
                if (error instanceof Error) {
                    return [2 /*return*/, response.status(500).send({ message: error.message })];
                }
                else {
                    return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                }
            }
            return [2 /*return*/];
        });
    }); },
    blockUser: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var userIds, blockedUser, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userIds = request.body.userIds;
                    if (!userIds || !userIds.length) {
                        return [2 /*return*/, response
                                .status(400)
                                .send({ message: "please provide at least one id" })];
                    }
                    return [4 /*yield*/, config_1.default.query("UPDATE users SET status = $1 WHERE id = ANY($2)", [userStatus.blocked, userIds])];
                case 1:
                    blockedUser = _a.sent();
                    response
                        .status(200)
                        .send({ message: "Users blocked with ID: ".concat(userIds) });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    if (error_6 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_6.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    unBlockUser: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var userIds, blockedUser, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userIds = request.body.userIds;
                    if (!userIds || !userIds.length) {
                        return [2 /*return*/, response
                                .status(400)
                                .send({ message: "please provide at least one id" })];
                    }
                    return [4 /*yield*/, config_1.default.query("UPDATE users SET status = $1 WHERE id = ANY($2)", [userStatus.active, userIds])];
                case 1:
                    blockedUser = _a.sent();
                    response
                        .status(200)
                        .send({ message: "Users unblocked with ID: ".concat(userIds) });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    if (error_7 instanceof Error) {
                        return [2 /*return*/, response.status(500).send({ message: error_7.message })];
                    }
                    else {
                        return [2 /*return*/, response.status(500).send({ message: "unknown error" })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = Users;
