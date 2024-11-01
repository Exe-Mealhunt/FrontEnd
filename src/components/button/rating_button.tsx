import React from "react";

export const RatingComponent = ({ rating, name }: any) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="rating rating-sm rating-half">
      {[...Array(5)].map((_, index) => {
        const fullStarIndex = index + 1;
        const halfStarIndex = index + 0.5;

        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              name={name}
              className="mask mask-star-2 mask-half-1 bg-yellow-500"
              checked={roundedRating === halfStarIndex}
              readOnly
            />
            <input
              type="radio"
              name={name}
              className="mask mask-star-2 mask-half-2 bg-yellow-500"
              checked={roundedRating >= fullStarIndex}
              readOnly
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
