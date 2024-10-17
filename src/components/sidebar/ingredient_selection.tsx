"use client";
import React, { useState, useEffect, useContext } from "react";
import { FaTrashCan, FaTrash } from "react-icons/fa6";

import SearchInput from "../input/search_input";
import IngredientSelectionForm from "../form/ingredient_selection";
import { getRequest } from "../../../helpers/api-requests";
import { IngredientsContext } from "@/context/ingredients_context";

import { Category } from "../../../constants/types/categories.type";

export default function IngredientSidebar() {
  const [selectedIngredients, setSelectedIngredients] =
    useContext(IngredientsContext);
  const [ingredient, setIngredient] = useState<Category[]>([]);
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchIngredient, setSearchIngredient] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm);
    setIsSearching(searchTerm.length > 0);
  };

  useEffect(() => {
    getRequest("/categories/all", {})
      .then((ingredients) => {
        setIngredient(ingredients);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isSearching) {
      getRequest("/ingredient/get-ingredients", {
        value: searchInput,
      })
        .then((searchIngredient) => {
          setSearchIngredient(searchIngredient);
        })
        .catch(() => {});
    } else {
      setSearchIngredient([]);
    }
  }, [searchInput, isSearching]);

  const toggleViewSelected = () => setShowSelected(!showSelected);

  const removeIng = (name: string) => {
    setSelectedIngredients((prevIng: Category[]) =>
      prevIng.filter((ing: Category) => ing.name !== name),
    );
  };

  const clearAllIng = () => setSelectedIngredients([]);

  return (
    <div className="bg-[#c7c799]">
      <div className="flex flex-col items-center">
        <h1 className="text-black font-bold text-2xl pt-2 pb-1">Pantry</h1>
        <div className="flex items-center">
          <h2 className="py-2 pl-2 text-black">
            You have {selectedIngredients.length} Ingredients,
          </h2>
          <h2
            className="py-2 pr-2 pl-1 cursor-pointer text-black underline"
            onClick={toggleViewSelected}
          >
            View here
          </h2>
        </div>
        <div className="w-72 pb-5">
          <SearchInput
            placeholder="Find ingredients...."
            onSearch={handleSearch}
          />
          {searchIngredient.length > 0 && (
            <div className="relative">
              <div
                className="absolute rounded-md shadow-md hover:bg-gray-10 bg-white p-2 mt-0.5 w-full overflow-y-auto"
                style={{
                  maxHeight: searchIngredient.length > 10 ? "250px" : "unset",
                }}
              >
                {searchIngredient.map((ing) => (
                  <div
                    className="px-4 py-2 hover:bg-gray-10 cursor-pointer text-black"
                    key={ing.id}
                    onClick={() =>
                      setSelectedIngredients((prevIng: Category[]) => {
                        const exists = prevIng.some(
                          (selected: Category) => selected.id === ing.id,
                        );

                        return exists
                          ? prevIng
                          : [
                              ...prevIng,
                              {
                                id: ing.id,
                                name: ing.ingredientName,
                                category: ing.category,
                              },
                            ];
                      })
                    }
                  >
                    {ing.ingredientName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSelected && (
        <div className="h-screen overflow-y-auto">
          <h2 className="text-lg font-bold text-center mb-2 text-black">
            Selected Ingredients:
          </h2>

          {selectedIngredients.length > 0 && (
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

          {/* Hiển thị danh sách selectedIngredients */}
          <div className="flex flex-col items-center">
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((ingredient: any) => (
                <div
                  key={ingredient.id}
                  className="bg-white w-64 flex justify-between items-center px-4 py-2 mb-2 rounded-md shadow-sm"
                >
                  <span className="text-black">{ingredient.name}</span>
                  <button
                    onClick={() => removeIng(ingredient.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashCan />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-black text-center">No ingredients selected.</p>
            )}
          </div>
        </div>
      )}

      {!showSelected && (
        <div className="overflow-y-auto h-screen">
          <h2 className="text-lg font-bold text-center mb-2 text-black">
            Choose Your Ingredients:
          </h2>

          <IngredientSelectionForm categories={ingredient} />
        </div>
      )}
    </div>
  );
}
