"use client";
import React, { useState } from "react";
import RecipeCard from "@/components/card/recipe_card";

import ListCategoryBtn from "@/components/button/list_category_btn";
import SearchInput from "@/components/input/search_input";
import Pagination from "@/components/pagination";

import { newDish, categories } from "../mock_data";

export default function RecipesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(newDish.length / itemsPerPage);

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-primary">
      <div className="container mx-auto p-20 bg-white w-full">
        <div className="w-full">
          <h1 className="text-8xl text-black text-center font-bold cormorant-bold">
            MealHunt&nbsp;
          </h1>
          <h1 className="text-8xl text-center font-bold bonheur-royale-regular text-secondary">
            Recipes
          </h1>
        </div>

        <div className="flex justify-center w-full">
          <h3 className="text-xl text-[#e3bb21]">
            Discover Deliciouness Daily
          </h3>
        </div>
      </div>

      <div className="flex justify-around mt-10">
        <SearchInput />
      </div>

      <div className="flex justify-between mx-40 mt-10">
        {categories.map((category, index) => (
          <div key={index} className="mx-3">
            <ListCategoryBtn title={category.name} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 m-20 mb-0 rounded-md">
        {newDish.slice(indexOfFirstDish, indexOfLastDish).map((dish, index) => (
          <div key={index}>
            <RecipeCard dish={dish} />
          </div>
        ))}
      </div>

      <div className="flex justify-end py-10 mr-36">
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
