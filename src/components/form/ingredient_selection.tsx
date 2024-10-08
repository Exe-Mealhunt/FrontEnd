import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import { Category } from "../../../constants/types/categories.type";

export default function IngredientSelectionForm({
  ingredient,
  selectedIngredients,
  setSelectedIngredients,
}: {
  ingredient: { id: number; name: string; ingredientCategories: any[] };
  selectedIngredients: any[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [showMore, setShowMore] = useState<{ [category: string]: boolean }>({});

  const handleSelect = (id: number, name: string, category: string) => {
    setSelectedIngredients((prevSelected: Category[]) => {
      const isSelected = prevSelected.some(
        (item: Category) => item.name === name,
      );
      if (isSelected) {
        return prevSelected.filter((item: Category) => item.name !== name);
      } else {
        return [...prevSelected, { id, name, category }];
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
      <h3 className="text-center text-lg font-bold flex justify-between text-black">
        {ingredient.name.toUpperCase()}
        {ingredient.ingredientCategories.length > 10 && (
          <>
            {showMore[ingredient.name] ? (
              <MdKeyboardArrowUp
                onClick={() => toggleShowMore(ingredient.name)}
              />
            ) : (
              <MdKeyboardArrowDown
                onClick={() => toggleShowMore(ingredient.name)}
              />
            )}
          </>
        )}
      </h3>

      {ingredient.ingredientCategories.slice(0, 10).map((item) => (
        <button
          key={item.ingredient.id}
          className={`btn btn-sm m-1 font-medium rounded-none ${
            selectedIngredients.some(
              (selectedItem) =>
                selectedItem.id === item.ingredient.id &&
                selectedItem.name === item.ingredient.ingredientName,
            )
              ? "bg-[#93c759] text-white"
              : "bg-[#f1f2f4] text-[#909198]"
          } hover:bg-[#93c759] hover:text-white`}
          onClick={() =>
            handleSelect(
              item.ingredient.id,
              item.ingredient.ingredientName,
              ingredient.name,
            )
          }
        >
          {item.ingredient.ingredientName}
        </button>
      ))}

      {!showMore[ingredient.name] &&
        ingredient.ingredientCategories.length > 10 && (
          <button
            className="btn btn-sm m-1 font-medium rounded-none bg-[#f1f2f4] text-[#909198]"
            onClick={() => toggleShowMore(ingredient.name)}
          >
            ({ingredient.ingredientCategories.length - 10} more)
          </button>
        )}

      {showMore[ingredient.name] &&
        ingredient.ingredientCategories.slice(10).map((item) => (
          <button
            key={item.ingredient.id}
            className={`btn btn-sm m-1 font-medium rounded-none ${
              selectedIngredients.some(
                (selectedItem) =>
                  selectedItem.id === item.ingredient.id &&
                  selectedItem.name === item.ingredient.ingredientName,
              )
                ? "bg-[#93c759] text-white"
                : "bg-[#f1f2f4] text-[#909198]"
            } hover:bg-[#93c759] hover:text-white`}
            onClick={() =>
              handleSelect(
                item.ingredient.id,
                item.ingredient.ingredientName,
                ingredient.name,
              )
            }
          >
            {item.ingredient.ingredientName}
          </button>
        ))}
    </div>
  );
}
