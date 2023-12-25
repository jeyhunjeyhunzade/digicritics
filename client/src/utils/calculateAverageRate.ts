import { Rate } from "@app/types/types";

export const calculateAverageRate = (ratings: Rate[]): number => {
  let total = 0;
  let average = 0;

  ratings.forEach((rate) => {
    total += rate.rating;
  });

  average = Math.round(total / ratings.length);
  return average;
};
