import { Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { prisma } from "../config";
import { LikeAction } from "../types/enums";

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

      const existingTags = await prisma.tag.findMany({
        where: {
          name: {
            in: tags,
          },
        },
      });

      const existingTagIds = existingTags.map((tag) => tag.id);

      const tagAssociations = tags.map((tagName: string) => {
        const tagId = existingTagIds.find((id) => {
          const tag = existingTags.find((tag) => tag.name === tagName);
          return tag ? tag.id === id : false;
        });

        return tagId ? { id: tagId } : { name: tagName };
      });

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
            connect: existingTagIds.map((id) => ({ id })), // Connect to existing tags
            create: tagAssociations.filter((tag: any) => !("id" in tag)), // Create new tags
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
        return response.status(500).send({ message: "Unknown error" });
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

  getTags: async (request: Request, response: Response) => {
    try {
      const tags = await prisma.tag.findMany();

      response.json({
        message: "Tags retrieved successfully",
        tags,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },

  likeReview: async (request: Request, response: Response) => {
    try {
      const { userId } = request.body;
      const reviewId = parseInt(request.params.reviewId);

      if (!userId || isNaN(reviewId)) {
        return response
          .status(400)
          .send({ message: "Please provide both userId and a valid reviewId" });
      }

      const existingLike = await prisma.like.findFirst({
        where: {
          AND: {
            userId: userId,
            reviewId: reviewId,
          },
        },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return response.status(200).json({
          message: "Review unliked successfully",
          action: LikeAction.UNLIKED,
        });
      } else {
        const newLike = await prisma.like.create({
          data: {
            userId,
            reviewId,
          },
        });

        if (!newLike) {
          return response.status(500).send({ message: "Failed to like" });
        }

        return response.status(200).json({
          message: "Review liked successfully",
          action: LikeAction.LIKED,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },
  rateReview: async (request: Request, response: Response) => {
    try {
      const { userId, rating } = request.body;
      const reviewId = parseInt(request.params.reviewId);

      if (!userId || isNaN(reviewId)) {
        return response.status(400).send({
          message: "Please provide a valid userId, reviewId",
        });
      }

      const existingRating = await prisma.rating.findFirst({
        where: {
          AND: {
            userId: userId,
            reviewId: reviewId,
          },
        },
      });

      if (existingRating) {
        await prisma.rating.update({
          where: {
            id: existingRating.id,
          },
          data: {
            rating: rating,
          },
        });

        return response.status(200).json({
          message: "Review rating updated successfully",
        });
      } else {
        const newRating = await prisma.rating.create({
          data: {
            userId,
            reviewId,
            rating,
          },
        });

        if (!newRating) {
          return response
            .status(500)
            .send({ message: "Failed to rate the review" });
        }

        return response.status(200).json({
          message: "Review rated successfully",
        });
      }
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
