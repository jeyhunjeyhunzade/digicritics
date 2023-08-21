const Auth = require("../helpers/auth");
const bcrypt = require("bcrypt");
const pool = require("../config");

const userStatus = {
  active: "ACTIVE",
  blocked: "BLOCKED",
};

const Users = {
  loginUser: async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send({ message: "Some values are missing" });
    }

    if (!Auth.isValidEmail(email)) {
      return response
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }

    try {
      const userQuery = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      userById = userQuery.rows[0];
      if (!userById) {
        return response.status(404).send({ message: "User can not be found." });
      }

      if (!bcrypt.compareSync(password, userById.password)) {
        return response
          .status(400)
          .send({ message: "email and password does not match" });
      }

      if (userById.status !== userStatus.active) {
        return response.status(403).send({ message: "User is blocked" });
      }

      const updateLastLogin = await pool.query(
        "UPDATE users SET last_login = current_timestamp WHERE id = $1",
        [userById.id]
      );

      const token = Auth.generateToken(userById.id);
      return response.status(201).json({ token });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  createUser: async (request, response) => {
    const { email, password, name } = request.body;
    if (!email || !password || !name) {
      return response.status(400).send({ message: "Some values are missing" });
    }

    if (!Auth.isValidEmail(email)) {
      return response
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }

    try {
      const userQuery = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      userById = userQuery.rows[0];
      if (userById) {
        return response
          .status(404)
          .send({ message: "Already registered with this email" });
      }
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }

    const hashPassword = Auth.hashPassword(password);

    try {
      const newUser = await pool.query(
        "INSERT INTO users ( email, password, name, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [email, hashPassword, name, userStatus.active]
      );

      response.status(200).json({ message: `Successfully created` });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  getUsers: async (_, response) => {
    try {
      const allUsers = await pool.query(
        "SELECT id, name, email, status, register_time, last_login FROM users ORDER BY id ASC"
      );
      response.status(200).json(allUsers.rows);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  getUserById: async (request, response) => {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).send({ message: "please provide an id" });
      }

      const userById = await pool.query(
        "SELECT id, name, email, status FROM users WHERE id = $1",
        [id]
      );
      response.status(200).json(userById.rows[0]);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  deleteUser: async (request, response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "please provide at least one id" });
      }

      const deletedUser = pool.query("DELETE FROM users WHERE id = ANY($1)", [
        userIds,
      ]);
      response
        .status(200)
        .send({ message: `Users deleted with ID: ${userIds}` });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  blockUser: async (request, response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "please provide at least one id" });
      }

      const blockedUser = await pool.query(
        "UPDATE users SET status = $1 WHERE id = ANY($2)",
        [userStatus.blocked, userIds]
      );

      response
        .status(200)
        .send({ message: `Users blocked with ID: ${userIds}` });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },

  unBlockUser: async (request, response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "please provide at least one id" });
      }

      const blockedUser = await pool.query(
        "UPDATE users SET status = $1 WHERE id = ANY($2)",
        [userStatus.active, userIds]
      );
      response
        .status(200)
        .send({ message: `Users unblocked with ID: ${userIds}` });
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  },
};

module.exports = Users;
