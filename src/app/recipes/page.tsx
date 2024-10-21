"use client";
import React, { useContext, useEffect, useState } from "react";

import RecipeCard from "@/components/card/recipe_card";
import ListOccasionBtn from "@/components/button/list_occasion_btn";
import SearchInput from "@/components/input/search_input";
import Pagination from "@/components/pagination";
import IngredientSidebar from "@/components/sidebar/ingredient_selection";
import { getRequest } from "../../../helpers/api-requests";
import { IngredientsContext } from "@/context/ingredients_context";
import { OccasionContext } from "@/context/occasion_context";
import Loading from "../loading";

import { Occasion } from "../../../constants/types/occasion.type";
import { Recipe } from "../../../constants/types/recipes.type";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function RecipesPage() {
  const { data: session } = useSession();

  const [selectedIngredients] = useContext(IngredientsContext);
  const { chosenOccasion, setChosenOccasion } = useContext(OccasionContext);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [occasion, setOccasion] = useState<Occasion[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState<number>(12);

  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm);
  };

  const handleOccasionSelect = (occasionName: string) => {
    if (selectedOccasion === occasionName) {
      setSelectedOccasion("");
      setChosenOccasion("");
    } else {
      setChosenOccasion("");
      setSelectedOccasion(occasionName);
    }
  };

  useEffect(() => {
    if (chosenOccasion) {
      setSelectedOccasion(chosenOccasion);
    }
  }, [chosenOccasion]);

  useEffect(() => {
    const ingredientNames = selectedIngredients.map(
      (ingredient: { id: string; name: string; category: string }) =>
        ingredient.name,
    );

    setLoading(true);
    getRequest("/recipes", {
      "search-value": searchInput,
      "ingredient-names": ingredientNames,
      "occasion-name": selectedOccasion || chosenOccasion,
      "page-size": 100,
    })
      .then((response) => {
        setRecipes(response.recipes);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [searchInput, selectedIngredients, selectedOccasion, chosenOccasion]);

  useEffect(() => {
    getRequest("/occasions/all", {})
      .then((occasion) => {
        setOccasion(occasion);
      })
      .catch(() => {});
  }, []);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  return (
    <div className="bg-primary">
      <div className="container mx-auto p-4 md:p-20 bg-white w-full md:w-11/12">
        <div className="w-full">
          <h1 className="text-4xl md:text-8xl text-black text-center font-bold">
            MealHunt&nbsp;
          </h1>
          <h1 className="text-4xl md:text-8xl text-center font-bold bonheur-royale-regular text-secondary">
            Recipes
          </h1>
        </div>

        <div className="flex justify-center w-full">
          <h3 className="text-xl text-[#e3bb21]">
            Discover Deliciouness Daily
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1">
          <IngredientSidebar />
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="flex justify-between mt-10 md:mx-40">
            <div className="w-96">
              <SearchInput
                placeholder="Find recipe..."
                onSearch={handleSearch}
              />
            </div>
            {session && (
              <Link href={"/create_recipe"}>
                <button className="btn bg-[#46500c] rounded-none border-none hover:bg-secondary text-white">
                  Create Recipe
                </button>
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mx-4 mt-10 overflow-x-auto">
                {occasion.map((occasion: Occasion, index) => (
                  <div key={index} className="mx-2 mb-3">
                    <ListOccasionBtn
                      onClick={() => handleOccasionSelect(occasion.name)}
                      isSelected={selectedOccasion === occasion.name}
                      name={occasion.name}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-0 rounded-md">
                {currentRecipes.map((recipe, index) => (
                  <div key={index}>
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end py-10 md:mr-36">
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalPages={totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
