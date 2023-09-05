import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { prisma } from "../config";
import { AuthAction } from "../types/enums";

const Users = {
  loginUser: async (request: Request, response: Response) => {
    const { email } = request.body;

    if (!email) {
      return response.status(400).send({ message: "Some values are missing" });
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

      if (user.status === UserStatus.BLOCKED) {
        return response.status(403).send({ message: "User is blocked" });
      }

      return response.status(201).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },

  createUser: async (request: Request, response: Response) => {
    const { email, name, profileImage } = request.body;
    if (!email || !name) {
      return response.status(400).send({ message: "Some values are missing" });
    }

    try {
      const existingUser = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return response.status(200).send({ message: "Successfully logged in" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }

    try {
      const newUser = await prisma.users.create({
        data: {
          email: email,
          fullName: name,
          profileImage: profileImage,
        },
      });

      response.status(200).json({ newUser, message: "Successfully created" });
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
          fullName: true,
          email: true,
          status: true,
          createdTime: true,
          Like: true,
          Rating: true,
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
          fullName: true,
          email: true,
          status: true,
          profileImage: true,
          createdTime: true,
          reviews: {
            include: {
              likes: true,
              ratings: true,
              category: true,
            },
          },
          Like: true,
          Rating: true,
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

  getUserIdByEmail: async (request: Request, response: Response) => {
    try {
      const email = request.body.email;

      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!user) {
        return response.status(201).send({
          message: "User not found",
          action: AuthAction.REGISTER_REQUIRED,
        });
      }

      response.status(200).json(user);
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
          status: UserStatus.USER,
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

  updateUserRole: async (request: Request, response: Response) => {
    try {
      const { userIds, status } = request.body;

      if (!userIds || !userIds.length || !status) {
        return response
          .status(400)
          .send({ message: "Please provide at least one id or status" });
      }

      await prisma.users.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          status: status,
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

  updateUser: async (request: Request, response: Response) => {
    try {
      const { id, fullName, profileImage } = request.body;

      if (!id) {
        return response.status(400).send({ message: "Please provide an id" });
      }

      if (!fullName && !profileImage) {
        return response
          .status(400)
          .send({ message: "Please provide data to update" });
      }

      const updatedUser = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          fullName: fullName,
          profileImage: profileImage,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          status: true,
          profileImage: true,
          createdTime: true,
        },
      });

      if (!updatedUser) {
        return response.status(404).send({ message: "User not found" });
      }

      response.status(200).json(updatedUser);
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
