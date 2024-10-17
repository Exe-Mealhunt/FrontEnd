import React, { useContext, useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import { IngredientsContext } from "@/context/ingredients_context";

import { Category } from "../../../constants/types/categories.type";

export default function IngredientSelectionForm({
  categories,
}: {
  categories: Category[];
}) {
  const [selectedIngredients, setSelectedIngredients] =
    useContext(IngredientsContext);

  const [showMore, setShowMore] = useState<{ [category: string]: boolean }>({});

  const handleSelect = (ingredient: any) => {
    const cate = categories
      .filter((category) =>
        category.ingredientCategories.some(
          (item: any) => item.ingredient.id === ingredient.id,
        ),
      )
      .map((category) => category.name);

    const newIngredient = {
      id: ingredient.id,
      name: ingredient.ingredientName,
      cate,
    };
    setSelectedIngredients((prev: any) => {
      const isAlreadySelected = prev.some(
        (item: any) => item.id === newIngredient.id,
      );

      if (isAlreadySelected) {
        return prev.filter((item: any) => item.id !== newIngredient.id);
      } else {
        return [...prev, newIngredient];
      }
    });
  };

  const toggleShowMore = (category: string) => {
    setShowMore((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="bg-white m-3 p-3 shadow-xl">
      {categories.map((category) => {
        const ingredientCategories = category.ingredientCategories;
        const isExpanded = showMore[category.name];

        return (
          <div key={category.id}>
            <h3 className="text-center text-lg font-bold flex justify-between text-black p">
              {category.name}
            </h3>

            {ingredientCategories
              .slice(0, isExpanded ? ingredientCategories.length : 10)
              .map((item: any) => (
                <button
                  key={item.ingredient.id}
                  onClick={() => handleSelect(item.ingredient)}
                  className={`btn btn-sm m-1 font-medium rounded-none ${
                    selectedIngredients.some(
                      (selectedItem: any) =>
                        selectedItem.id === item.ingredient.id &&
                        selectedItem.name === item.ingredient.ingredientName,
                    )
                      ? "bg-[#93c759] text-white"
                      : "bg-[#f1f2f4] text-[#909198]"
                  } hover:bg-[#93c759] hover:text-white`}
                >
                  {item.ingredient.ingredientName}
                </button>
              ))}

            {ingredientCategories.length > 10 && (
              <button
                onClick={() => toggleShowMore(category.name)}
                className="btn btn-sm m-1 font-medium rounded-none bg-[#f1f2f4] text-[#909198]"
              >
                {isExpanded ? (
                  <>
                    Show Less <MdKeyboardArrowUp />
                  </>
                ) : (
                  <>
                    Show More ({ingredientCategories.length - 10} more){" "}
                    <MdKeyboardArrowDown />
                  </>
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
