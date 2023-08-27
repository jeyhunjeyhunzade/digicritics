import "dotenv/config";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { prisma } from "../config";
import { UserStatus } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET as string;

if (!SECRET) {
  throw Error("SECRET should be defiend");
}

const Auth = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password: string | Buffer): string {
    return hashSync(password, genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword: string, password: string | Buffer): boolean {
    return compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id: any): string {
    const token = sign(
      {
        userId: id,
      },
      SECRET,
      { expiresIn: "1h" }
    );
    return token;
  },
  /**
   * Authenticate Token
   */
  authenticateToken: async (req: any, res: any, next: () => void) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) {
      return res.status(400).send({ message: "No token provided." }); // if there isn't any token
    }

    verify(token, SECRET, async (err: any, user: any) => {
      try {
        const decoded = jwt.verify(token, SECRET) as {
          userId: number;
        };
        const id = decoded.userId;

        const userById = await prisma.users.findUnique({
          where: {
            id,
          },
        });

        if (!userById) {
          return res.status(401).send({ message: "User cannot be found." });
        }

        if (userById.status === UserStatus.BLOCKED) {
          return res.status(401).send({ message: "User is blocked" });
        }

        req.user = user;
        next();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).send({ message: error.message });
        } else {
          return res.status(500).send({ message: "unknown error" });
        }
      }
    });
  },
};

export default Auth;
