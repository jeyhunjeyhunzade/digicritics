import { Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { prisma } from "../config";
import { io } from "../socket";
import { LikeAction } from "../types/enums";

// TODO: refactor this
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

      const existingCategory = await prisma.category.findUnique({
        where: {
          name: category,
        },
      });

      if (!existingCategory) {
        return response.status(400).json({ message: "Category not found" });
      }

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
          reviewGrade,
          reviewContent,
          reviewImages,
          user: {
            connect: { id: userId },
          },
          category: {
            connect: { id: existingCategory.id },
          },
          tags: {
            connect: existingTagIds.map((id) => ({ id })),
            create: tagAssociations.filter((tag: any) => !("id" in tag)),
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

  editReview: async (request: Request, response: Response) => {
    try {
      const {
        reviewId,
        reviewTitle,
        workName,
        category,
        reviewGrade,
        tags,
        reviewContent,
        reviewImages,
      } = request.body;

      const existingReview = await prisma.review.findUnique({
        where: {
          id: reviewId,
        },
      });

      if (!existingReview) {
        return response.status(404).json({ message: "Review not found" });
      }

      const existingCategory = await prisma.category.findUnique({
        where: {
          name: category,
        },
      });

      if (!existingCategory) {
        return response.status(400).json({ message: "Category not found" });
      }

      const existingTags = await prisma.tag.findMany({
        where: {
          name: {
            in: tags,
          },
        },
      });

      const existingTagIds = existingTags.map((tag) => tag.id);

      const newTagNames = tags.filter(
        (tagName: string) => !existingTags.some((tag) => tag.name === tagName)
      );

      const createdTags = await Promise.all(
        newTagNames.map(async (tagName: string) => {
          const createdTag = await prisma.tag.create({
            data: {
              name: tagName,
            },
          });
          return createdTag.id;
        })
      );

      const allTagIds = [...existingTagIds, ...createdTags];

      const updatedReview = await prisma.review.update({
        where: {
          id: reviewId,
        },
        data: {
          reviewTitle,
          workName,
          reviewGrade,
          reviewContent,
          reviewImages,
          category: {
            connect: { id: existingCategory.id },
          },
          tags: {
            set: allTagIds.map((id) => ({ id })),
          },
        },
      });

      response.json({
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },

  deleteReview: async (request: Request, response: Response) => {
    try {
      const { reviewId } = request.params;

      if (!reviewId) {
        return response
          .status(400)
          .send({ message: "Please provide a valid reviewId" });
      }

      const existingReview = await prisma.review.findUnique({
        where: {
          id: parseInt(reviewId),
        },
      });

      if (!existingReview) {
        return response.status(404).json({ message: "Review not found" });
      }

      await prisma.like.deleteMany({
        where: {
          reviewId: parseInt(reviewId),
        },
      });

      await prisma.rating.deleteMany({
        where: {
          reviewId: parseInt(reviewId),
        },
      });

      await prisma.comment.deleteMany({
        where: {
          reviewId: parseInt(reviewId),
        },
      });

      await prisma.review.deleteMany({
        where: {
          id: parseInt(reviewId),
        },
      });

      response.json({ message: "Review deleted successfully" });
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
          category: true,
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
          category: true,
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

  getReviewsByTag: async (request: Request, response: Response) => {
    try {
      const { tagName } = request.params;

      const reviews = await prisma.review.findMany({
        where: {
          tags: {
            some: {
              name: tagName, // Filter by the tag name
            },
          },
        },
        include: {
          tags: true,
          likes: true,
          ratings: true,
          comments: true,
          user: true,
          category: true,
        },
      });

      if (reviews.length === 0) {
        return response
          .status(404)
          .send({ message: "No reviews found for this tag" });
      }

      response.json(reviews);
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

  createCategory: async (request: Request, response: Response) => {
    try {
      const { categoryName } = request.body;

      const existingCategory = await prisma.category.findUnique({
        where: {
          name: categoryName,
        },
      });

      if (existingCategory) {
        return response.status(400).json({
          message: "Category with this name already exists",
        });
      }

      const newCategory = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });

      response.json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ message: error.message });
      } else {
        return response.status(500).json({ message: "Unknown error" });
      }
    }
  },

  deleteCategory: async (request: Request, response: Response) => {
    try {
      const { categoryName } = request.body;

      const existingCategory = await prisma.category.findUnique({
        where: {
          name: categoryName,
        },
      });

      if (!existingCategory) {
        return response.status(404).json({
          message: "Category not found",
        });
      }

      await prisma.category.delete({
        where: {
          id: existingCategory.id,
        },
      });

      response.json({
        message: "Category deleted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ message: error.message });
      } else {
        return response.status(500).json({ message: "Unknown error" });
      }
    }
  },

  getCategories: async (request: Request, response: Response) => {
    try {
      const categories = await prisma.category.findMany();

      response.json({
        categories,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ message: error.message });
      } else {
        return response.status(500).json({ message: "Unknown error" });
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

  addCommentToReview: async (request: Request, response: Response) => {
    try {
      const { userId, content } = request.body;
      const reviewId = parseInt(request.params.reviewId);

      const existingReview = await prisma.review.findUnique({
        where: {
          id: reviewId,
        },
      });

      if (!existingReview) {
        return response.status(400).json({ message: "Review not found" });
      }

      const newComment = await prisma.comment.create({
        data: {
          content,
          user: {
            connect: { id: userId },
          },
          review: {
            connect: { id: reviewId },
          },
        },
        include: {
          user: true,
        },
      });

      io.emit("getComments", {
        newComment,
      });

      response.json({
        message: "Comment added to the review successfully",
        comment: newComment,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },

  getCommentsForReview: async (request: Request, response: Response) => {
    try {
      const { reviewId } = request.params;

      const comments = await prisma.comment.findMany({
        where: {
          reviewId: parseInt(reviewId),
        },
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      });

      response.json({
        message: "Comments retrieved successfully",
        comments,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).send({ message: error.message });
      } else {
        return response.status(500).send({ message: "Unknown error" });
      }
    }
  },

  getFullTextSearch: async (request: Request, response: Response) => {
    try {
      const { searchQuery } = request.body;

      if (!searchQuery) {
        return response
          .status(400)
          .send({ message: "Search query is required." });
      }

      const reviews = await prisma.review.findMany({
        where: {
          OR: [
            {
              reviewTitle: {
                search: searchQuery,
              },
            },
            {
              workName: {
                search: searchQuery,
              },
            },
            {
              reviewContent: {
                search: searchQuery,
              },
            },
            {
              comments: {
                some: {
                  content: {
                    contains: searchQuery,
                  },
                },
              },
            },
          ],
        },
        include: {
          tags: true,
          likes: true,
          ratings: true,
          comments: true,
          category: true,
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
};

export default Reviews;
