"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaTrashCan, FaTrash } from "react-icons/fa6";

import SearchInput from "../input/search_input";
import IngredientSelectionForm from "../form/ingredient_selection";

import { mockIngredients } from "@/app/mock_data";

export default function IngredientSidebar() {
  const [selectedIng, setSelectedIng] = useState<
    { id: string; name: string; category: string }[]
  >([]);
  const [showSelected, setShowSelected] = useState<boolean>(false);

  useEffect(() => {
    const savedIng = Cookies.get("selectedIngredients");
    if (savedIng) {
      setSelectedIng(JSON.parse(savedIng));
    }
  }, []);

  useEffect(() => {
    if (selectedIng.length > 0) {
      Cookies.set("selectedIngredients", JSON.stringify(selectedIng), {
        expires: 7,
      });
    } else {
      Cookies.remove("selectedIngredients");
    }
  }, [selectedIng]);

  const toggleViewSelected = () => setShowSelected(!showSelected);

  const removeIng = (id: string) => {
    setSelectedIng((prevIng) => prevIng.filter((ing) => ing.id !== id));
  };

  const clearAllIng = () => setSelectedIng([]);

  const groupedIng = selectedIng.reduce(
    (acc: { [key: string]: { id: string; name: string }[] }, ing) => {
      acc[ing.category] = acc[ing.category] || [];
      acc[ing.category].push({ id: ing.id, name: ing.name });
      return acc;
    },
    {},
  );

  return (
    <div className="bg-[#c7c799]">
      <div className="flex flex-col items-center">
        <h1 className="text-black font-bold text-2xl pt-2 pb-1">Pantry</h1>
        <div className="flex items-center">
          <h2 className="py-2 pl-2 text-black">
            You have {selectedIng.length} Ingredients,
          </h2>
          <h2
            className="py-2 pr-2 pl-1 cursor-pointer text-black underline"
            onClick={toggleViewSelected}
          >
            View here
          </h2>
        </div>
        <div className="w-72 pb-5">
          <SearchInput placeholder="Find ingredients...." />
        </div>
      </div>

      {showSelected && (
        <div className="h-screen overflow-y-auto">
          <h2 className="text-lg font-bold text-center mb-2 text-black">
            Selected Ingredients:
          </h2>

          {selectedIng.length > 0 && (
            <div className="flex justify-center mb-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                onClick={clearAllIng}
              >
                <FaTrash className="mr-2" />
                Clear All
              </button>
            </div>
          )}

          {Object.keys(groupedIng).length > 0 ? (
            Object.keys(groupedIng).map((cate) => (
              <div className="bg-white m-3 p-3 shadow-xl" key={cate}>
                <h3 className="text-lg font-bold text-black">
                  {cate.toUpperCase()}
                </h3>
                <div>
                  {groupedIng[cate].map((ing) => (
                    <div
                      key={ing.id}
                      className="flex justify-between text-[#909198] m-2 p-2 border-b border-gray-300"
                    >
                      {ing.name}
                      <FaTrashCan
                        className="cursor-pointer"
                        onClick={() => removeIng(ing.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-black">No ingredients selected.</p>
          )}
        </div>
      )}

      {!showSelected && (
        <div className="overflow-y-auto h-screen">
          <h2 className="text-lg font-bold text-center mb-2 text-black">
            Choose Your Ingredients:
          </h2>
          {mockIngredients.map((ing: any) => (
            <IngredientSelectionForm
              key={Object.keys(ing)[0]}
              ingredient={ing}
              selectedIngredients={selectedIng}
              setSelectedIngredients={setSelectedIng}
            />
          ))}
        </div>
      )}
    </div>
  );
}
