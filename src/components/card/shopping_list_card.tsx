import React from "react";

export type ShoppingListCardProps = {
  imgUrl: string;
  name: string;
  ingredientUnits: {
    ingredientName: string;
    quantity: number;
    unit: string;
  }[];
};

export default function ShoppingListCard({
  recipe,
}: {
  recipe: ShoppingListCardProps;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <img
        src={recipe.imgUrl}
        alt={recipe.name}
        className="h-32 object-cover rounded-md w-full"
      />
      <h2 className="text-lg text-black font-semibold mt-2 text-center">
        {recipe.name}
      </h2>
      <ul className="mt-2 w-full">
        {recipe.ingredientUnits.map((ingredient, index) => (
          <li key={index} className="text-gray-600">
            {ingredient.ingredientName}: {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
  );
}
