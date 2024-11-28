"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Ingredient } from "../../../constants/types/ingrdients.type";
import { postRequest } from "../../../helpers/api-requests";
import { toast } from "react-toastify";

export type ConfirmAddShoppingListProps = {
  open: boolean;
  ingredient: Ingredient;
  recipeName: string;
  recipeId: number;
  handleOpen: (ing: any) => void;
  refreshRecipeDetails: () => void;
};

export default function ConfirmAddShoppingList({
  open,
  ingredient,
  recipeName,
  recipeId,
  handleOpen,
  refreshRecipeDetails,
}: ConfirmAddShoppingListProps) {
  const { data: session } = useSession();

  const handleSubmit = async () => {
    try {
      if (session?.user?.id) {
        const userId = parseInt(session.user.id, 10);
        const response = await postRequest(
          "/ingredientShoppingList",
          {},
          { ingredientId: ingredient.id, recipeId, userId },
        );
        if (response.ingredientId) {
          toast.success(`Add ${ingredient.ingredientName} succcessful!!!!`);
        }
        handleOpen("");
        refreshRecipeDetails();
      } else {
        toast.error(`You need to login to add to shopping list`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something wrong");
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box rounded-none bg-white">
        <h3 className="font-bold text-lg text-black">Add to shopping list!</h3>
        <p className="py-4 text-black">
          Would you like to add the ingredient &apos;{ingredient.ingredientName}
          &apos; from the &apos;{recipeName}&apos; to your shopping list?
        </p>
        <div className="modal-action">
          <button
            onClick={() => handleOpen("")}
            className="btn bg-secondary hover:bg-secondary/80 text-primary rounded-none border-none text-x"
          >
            No, thanks
          </button>
          <button
            onClick={handleSubmit}
            className="btn bg-[#46500c] text-primary rounded-none border-none hover:bg-[#46500c]/80"
          >
            Yes
          </button>
        </div>
      </div>
    </dialog>
  );
}
