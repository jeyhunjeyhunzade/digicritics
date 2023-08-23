"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var Pool = require("pg").Pool;
var isProduction = process.env.NODE_ENV === "production";
var connectionStringDev = "postgresql://".concat(process.env.PG_USER, ":").concat(process.env.DBPASSWORD, "@").concat(process.env.PG_HOST, ":").concat(process.env.PG_PORT, "/").concat(process.env.PG_DATABASE);
var connectionStringProd = process.env.POSTGRES_URL + "?sslmode=require";
var pool = new Pool({
    connectionString: isProduction ? connectionStringProd : connectionStringDev,
});
exports.default = pool;
