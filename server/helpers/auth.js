require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config");

const userStatus = {
  active: "ACTIVE",
  blocked: "BLOCKED",
};

const Auth = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    return token;
  },
  /**
   * Authenticate Token
   */
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      return res.status(400).send({ message: "No token provided." }); // if there isn't any token
    }

    jwt.verify(token, process.env.SECRET, async (err, user) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "Failed to authenticate token." });
      }
      req.user = user;
      try {
        const userQuery = await pool.query(
          "SELECT * FROM users WHERE id = $1",
          [user.userId]
        );

        const userById = userQuery.rows[0];

        if (!userById) {
          return res.status(401).send({ message: "User can not be found." });
        }

        if (userById.status !== userStatus.active) {
          return res.status(401).send({ message: "User is blocked" });
        }
        next(); // pass the execution off to whatever request the client intended
      } catch (error) {
        console.log(error.message, "Error message: ", res.status);
      }
    });
  },
};

module.exports = Auth;
