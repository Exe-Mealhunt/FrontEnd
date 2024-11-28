import React from "react";
import { deleteRequest } from "../../../helpers/api-requests";

export type ShoppingListCardProps = {
  id: string;
  imgUrl: string;
  name: string;
  ingredientUnits: {
    ingredientName: string;
    quantity: number;
    unit: string;
  }[];
  onDelete: (id: string) => void; // Callback to notify parent about deletion
};

export default function ShoppingListCard({
  recipe,
}: {
  recipe: ShoppingListCardProps;
}) {
  const handleDelete = async () => {
    try {
      await deleteRequest("/shopping-lists/delete-shopping-list", {
        id: recipe.id,
      });
      recipe.onDelete(recipe.id); // Notify parent about deletion
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };

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
      {/* Add Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
