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
require("dotenv/config");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var config_1 = __importDefault(require("../config"));
var userStatus = {
    active: "ACTIVE",
    blocked: "BLOCKED",
};
var SECRET = process.env.SECRET;
if (!SECRET) {
    throw Error("SECRET should be defiend");
}
var Auth = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    hashPassword: function (password) {
        return (0, bcrypt_1.hashSync)(password, (0, bcrypt_1.genSaltSync)(8));
    },
    /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
    comparePassword: function (hashPassword, password) {
        return (0, bcrypt_1.compareSync)(password, hashPassword);
    },
    /**
     * isValidEmail helper method
     * @param {string} email
     * @returns {Boolean} True or False
     */
    isValidEmail: function (email) {
        return /\S+@\S+\.\S+/.test(email);
    },
    /**
     * Gnerate Token
     * @param {string} id
     * @returns {string} token
     */
    generateToken: function (id) {
        var token = (0, jsonwebtoken_1.sign)({
            userId: id,
        }, SECRET, { expiresIn: "1h" });
        return token;
    },
    /**
     * Authenticate Token
     */
    authenticateToken: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var authHeader, token;
        return __generator(this, function (_a) {
            authHeader = req.headers["authorization"];
            token = authHeader && authHeader.split(" ")[1];
            if (token === null) {
                return [2 /*return*/, res.status(400).send({ message: "No token provided." })]; // if there isn't any token
            }
            (0, jsonwebtoken_1.verify)(token, SECRET, function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
                var userQuery, userById, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                return [2 /*return*/, res
                                        .status(401)
                                        .send({ message: "Failed to authenticate token." })];
                            }
                            req.user = user;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, (0, config_1.default)("SELECT * FROM users WHERE id = $1", [
                                    user.userId,
                                ])];
                        case 2:
                            userQuery = _a.sent();
                            userById = userQuery.rows[0];
                            if (!userById) {
                                return [2 /*return*/, res.status(401).send({ message: "User can not be found." })];
                            }
                            if (userById.status !== userStatus.active) {
                                return [2 /*return*/, res.status(401).send({ message: "User is blocked" })];
                            }
                            next(); // pass the execution off to whatever request the client intended
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            if (error_1 instanceof Error) {
                                return [2 /*return*/, res.status(500).send({ message: error_1.message })];
                            }
                            else {
                                return [2 /*return*/, res.status(500).send({ message: "unknown error" })];
                            }
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); },
};
exports.default = Auth;
