import Auth from "../helpers/auth";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserStatus } from "../types/enums";
import { prisma } from "../config";

const Users = {
  loginUser: async (request: Request, response: Response) => {
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
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return response.status(404).send({ message: "User cannot be found." });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return response
          .status(400)
          .send({ message: "Email and password do not match" });
      }

      if (user.status !== UserStatus.ACTIVE) {
        return response.status(403).send({ message: "User is blocked" });
      }

      const token = Auth.generateToken(user.id);
      return response.status(201).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  createUser: async (request: Request, response: Response) => {
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
      const existingUser = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return response
          .status(404)
          .send({ message: "Already registered with this email" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }

    const hashPassword = Auth.hashPassword(password);

    try {
      const newUser = await prisma.users.create({
        data: {
          email: email,
          password: hashPassword,
          full_name: name,
          status: UserStatus.ACTIVE,
        },
      });

      const token = Auth.generateToken(newUser.id);

      response.status(200).json({ token, message: "Successfully created" });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  getUsers: async (_request: Request, response: Response) => {
    try {
      const allUsers = await prisma.users.findMany({
        select: {
          id: true,
          full_name: true,
          email: true,
          status: true,
          register_time: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      response.status(200).json(allUsers);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  getUserById: async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id);

      if (!id) {
        return response.status(400).send({ message: "Please provide an id" });
      }

      const userById = await prisma.users.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          full_name: true,
          email: true,
          status: true,
        },
      });

      if (!userById) {
        return response.status(404).send({ message: "User not found" });
      }

      response.status(200).json(userById);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  deleteUser: async (request: Request, response: Response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "Please provide at least one id" });
      }

      await prisma.users.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      response
        .status(200)
        .send({ message: `Users deleted with IDs: ${userIds.join(", ")}` });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  blockUser: async (request: Request, response: Response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        console.log("request", request.body.userIds);
        return response
          .status(400)
          .send({ message: "Please provide at least one id" });
      }

      await prisma.users.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          status: UserStatus.BLOCKED,
        },
      });

      response
        .status(200)
        .send({ message: `Users blocked with IDs: ${userIds.join(", ")}` });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  unBlockUser: async (request: Request, response: Response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "Please provide at least one id" });
      }

      await prisma.users.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          status: UserStatus.ACTIVE,
        },
      });

      response
        .status(200)
        .send({ message: `Users unblocked with IDs: ${userIds.join(", ")}` });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },
  makeUsersAdmin: async (request: Request, response: Response) => {
    try {
      const userIds = request.body.userIds;

      if (!userIds || !userIds.length) {
        return response
          .status(400)
          .send({ message: "Please provide at least one id" });
      }

      await prisma.users.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          isAdmin: true,
        },
      });

      response.status(200).send({
        message: `Selected users are now admins: ${userIds.join(", ")}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },
};

export default Users;
