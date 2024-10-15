"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import RecipeCard from "@/components/card/recipe_card";

import { getRequest } from "../../../../helpers/api-requests";
import { Recipe } from "../../../../constants/types/recipes.type";
import VideoEmbed from "../../../../helpers/video_embed";

export default function Detail({ params }: { params: { recipe_id: string } }) {
  const recipeId = parseInt(params.recipe_id, 10);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesDetail, setRecipesDetail] = useState<Recipe>();

  useEffect(() => {
    getRequest("/recipes", {})
      .then((recipes) => {
        setRecipes(recipes);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getRequest(`/recipes/${recipeId}`, {})
      .then((recipesDetail) => {
        setRecipesDetail(recipesDetail);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-primary p-14 overflow-hidden">
      <div className="grid grid-cols-2 gap-5 md:gap-10 xl:gap-16">
        {recipesDetail?.imageUrl && (
          <Image
            src={recipesDetail.imageUrl}
            alt={recipesDetail.name}
            width={800}
            height={450}
            className="h-[350px] w-full md:h-[450px] md:w-[800px] xl:h-[550px] xl:w-[1100px] object-cover"
            layout="responsive"
          />
        )}

        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <button className="btn text-lg bg-secondary text-white border-none rounded-none hover:bg-secondary/90 md:text-xl xl:text-2xl">
              Desserts
            </button>

            <div className="text-lg md:text-xl xl:text-2xl pl-5 text-black md:pl-10 xl:pl-16">
              July 12, 2023
            </div>
          </div>

          {/* Title */}
          <h1 className="cormorant-bold text-7xl md:text-8xl xl:text-7xl mb-7 text-black">
            {recipesDetail?.name}
          </h1>

          {/* Introduce */}
          <p className="font-medium text-black md:text-lg xl:text-xl">
            {recipesDetail?.content}
          </p>
        </div>
      </div>

      {/* Recipe */}
      <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 xl:gap-16">
        <div className="md:max-h-full xl:max-h-full">
          {/* How to make */}
          <h5 className="cormorant-bold text-4xl py-5 text-black">
            How to make:
          </h5>

          <div
            className="text-black"
            dangerouslySetInnerHTML={{ __html: recipesDetail?.tutorial ?? "" }}
          />

          <h5 className="cormorant-bold text-6xl py-5 text-black">
            Watch Video
          </h5>

          <div className="flex justify-center">
            {recipesDetail?.video && <VideoEmbed url={recipesDetail.video} />}
          </div>
        </div>

        <div className="justify-center mx-0 bg-primary">
          <div className="bg-white border-2 border-black p-9 md:p-10 xl:p-14">
            <h5 className="cormorant-bold text-4xl py-5 text-black">
              Ingredients:
            </h5>

            <ul className="list-disc pl-5 text-black">
              {recipesDetail?.recipeIngredients?.map((ing) => (
                <li key={ing.id}>
                  {ing.ingredient.ingredientName}: {ing.quantity} {ing.unit}{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <span className="text-8xl text-center cormorant-bold text-black pr-2">
          Related
        </span>
        <span className="text-8xl text-center bonheur-royale-regular text-secondary">
          Recipes
        </span>
      </div>

      <div className="flex flex-wrap pt-5 md:flex-nowrap">
        {recipes.slice(0, 4).map((recipe) => (
          <div key={recipe.id} className="w-full md:w-1/4 p-2">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
