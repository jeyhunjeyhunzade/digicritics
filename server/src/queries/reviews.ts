import Auth from "../helpers/auth";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { prisma } from "../config";

const Reviews = {
  createReview: async (request: Request, response: Response) => {
    try {
      const {
        reviewTitle,
        workName,
        category,
        reviewGrade,
        tags,
        reviewContent,
        reviewImages,
        userId,
      } = request.body;

      const newReview = await prisma.review.create({
        data: {
          reviewTitle,
          workName,
          category,
          reviewGrade,
          reviewContent,
          reviewImages,
          user: {
            connect: { id: userId },
          },
          tags: {
            create: tags.map((tagName: string) => ({
              name: tagName,
            })),
          },
        },
      });

      response.json({
        message: "Review created successfully",
        review: newReview,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },
  getReviews: async (request: Request, response: Response) => {
    try {
      const reviews = await prisma.review.findMany({
        include: {
          tags: true,
          likes: true,
          ratings: true,
          comments: true,
          user: true,
        },
      });

      response.json(reviews);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "unknown error" });
      }
    }
  },
  getReviewById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const review = await prisma.review.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          tags: true,
          likes: true,
          ratings: true,
          comments: true,
          user: true,
        },
      });

      if (!review) {
        return response.status(404).send({ message: "Review not found" });
      }

      response.json(review);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },
};

export default Reviews;
