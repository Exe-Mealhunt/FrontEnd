import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export type IngredientType = {
  id: string;
  name: string;
  category: string;
};

export default function IngredientSelectionForm({
  ingredient,
  selectedIngredients,
  setSelectedIngredients,
}: {
  ingredient: { [key: string]: IngredientType[] };
  selectedIngredients: IngredientType[];
  setSelectedIngredients: React.Dispatch<
    React.SetStateAction<IngredientType[]>
  >;
}) {
  const [showMore, setShowMore] = useState<{ [category: string]: boolean }>({});

  const handleSelect = (id: string, name: string, category: string) => {
    setSelectedIngredients((prevSelected: IngredientType[]) => {
      const isSelected = prevSelected.some(
        (item) => item.id === id && item.name === name,
      );
      if (isSelected) {
        return prevSelected.filter(
          (item) => item.id !== id || item.name !== name,
        );
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
      <h2 className="text-lg font-bold text-center mb-2 text-black">
        Choose Your Ingredients:
      </h2>
      {Object.keys(ingredient).map((category) => (
        <div key={category}>
          <h3 className="text-center text-lg font-bold flex justify-between text-black">
            {category.toUpperCase()}
            {ingredient[category].length > 10 && (
              <>
                {showMore[category] ? (
                  <MdKeyboardArrowUp onClick={() => toggleShowMore(category)} />
                ) : (
                  <MdKeyboardArrowDown
                    onClick={() => toggleShowMore(category)}
                  />
                )}
              </>
            )}
          </h3>

          {ingredient[category].slice(0, 10).map((item) => (
            <button
              key={item.id}
              className={`btn btn-sm m-1 font-medium rounded-none ${
                selectedIngredients.some(
                  (selectedItem) =>
                    selectedItem.id === item.id &&
                    selectedItem.name === item.name,
                )
                  ? "bg-[#93c759] text-white"
                  : "bg-[#f1f2f4] text-[#909198]"
              } hover:bg-[#93c759] hover:text-white`}
              onClick={() => handleSelect(item.id, item.name, category)}
            >
              {item.name}
            </button>
          ))}

          {!showMore[category] && ingredient[category].length > 10 && (
            <button
              className="btn btn-sm m-1 font-medium rounded-none bg-[#f1f2f4] text-[#909198]"
              onClick={() => toggleShowMore(category)}
            >
              ({ingredient[category].length - 10} more)
            </button>
          )}

          {showMore[category] &&
            ingredient[category].slice(10).map((item) => (
              <button
                key={item.id}
                className={`btn btn-sm m-1 font-medium rounded-none ${
                  selectedIngredients.some(
                    (selectedItem) =>
                      selectedItem.id === item.id &&
                      selectedItem.name === item.name,
                  )
                    ? "bg-[#93c759] text-white"
                    : "bg-[#f1f2f4] text-[#909198]"
                } hover:bg-[#93c759] hover:text-white`}
                onClick={() => handleSelect(item.id, item.name, category)}
              >
                {item.name}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}
