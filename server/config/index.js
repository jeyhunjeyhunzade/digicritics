require("dotenv").config();

const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";
const connectionStringDev = `postgresql://${process.env.PG_USER}:${process.env.DBPASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const connectionStringProd = process.env.POSTGRES_URL + "?sslmode=require";

const pool = new Pool({
  connectionString: isProduction ? connectionStringProd : connectionStringDev,
});
module.exports = pool;
