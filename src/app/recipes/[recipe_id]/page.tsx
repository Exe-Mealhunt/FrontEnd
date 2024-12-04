"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BiPlusCircle } from "react-icons/bi";

import RecipeCard from "@/components/card/recipe_card";
import { getRequest } from "../../../../helpers/api-requests";
import { Recipe } from "../../../../constants/types/recipes.type";
import VideoEmbed from "../../../../helpers/video_embed";
import formatDate from "../../../../helpers/day-format";
import { OccasionContext } from "@/context/occasion_context";
import { IngredientsContext } from "@/context/ingredients_context";
import Loading from "@/app/loading";
import ConfirmAddShoppingList from "@/components/modal/confirm_add_shopping_list";

export default function Detail({ params }: { params: { recipe_id: string } }) {
  const { data: session } = useSession();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  const [selectedIngredients] = useContext(IngredientsContext);
  const recipeId = parseInt(params.recipe_id, 10);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesDetail, setRecipesDetail] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const { setChosenOccasion } = useContext(OccasionContext);
  const [openModal, setOpenModal] = useState(false);
  const [ingredientToShopping, setIngredientToShopping] = useState<any>({});

  const handleOpen = (ing: any) => {
    setIngredientToShopping(ing);
    setOpenModal(!openModal);
  };

  const handleOccasionClick = (name: string) => {
    setChosenOccasion(name);
  };

  useEffect(() => {
    setLoading(true);
    getRequest("/recipes", {})
      .then((response) => {
        setRecipes(response.recipes);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (session === undefined) return;

    setLoading(true);

    const ingredientNames = selectedIngredients.map(
      (ingredient: { id: string; name: string; category: string }) =>
        ingredient.name,
    );

    getRequest(`/recipes/${recipeId}`, {
      ingredientNames: ingredientNames,
      ...(userId && { userId }),
    })
      .then((recipesDetail) => {
        setRecipesDetail(recipesDetail);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session, userId, recipeId, selectedIngredients]);

  const refreshRecipeDetails = () => {
    setLoading(true);
    const ingredientNames = selectedIngredients.map(
      (ingredient: { id: string; name: string; category: string }) =>
        ingredient.name,
    );

    getRequest(`/recipes/${recipeId}`, {
      ingredientNames: ingredientNames,
      ...(userId && { userId }),
    })
      .then((recipesDetail) => {
        setRecipesDetail(recipesDetail);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return loading ? (
    <div className="flex justify-center bg-primary items-center">
      <Loading />
    </div>
  ) : (
    <div className="bg-primary p-6 md:p-14 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 xl:gap-16">
        {recipesDetail?.recipe.imageUrl && (
          <Image
            src={recipesDetail.recipe.imageUrl}
            alt={recipesDetail.recipe.name}
            width={800}
            height={450}
            className="h-[350px] w-full object-cover md:h-[450px] md:w-[800px] xl:h-[550px] xl:w-[1100px]"
            layout="responsive"
          />
        )}

        <div className="flex flex-col justify-center p-4 md:p-0">
          <div className="flex items-center mb-4">
            <Link key={recipesDetail?.recipe.id} href={"/recipes"}>
              <button
                onClick={() =>
                  handleOccasionClick(recipesDetail.recipe.occasionName)
                }
                className="btn text-lg bg-secondary text-white border-none rounded hover:bg-secondary/90 md:text-xl xl:text-2xl"
              >
                {recipesDetail?.recipe.occasionName}
              </button>
            </Link>
            <div className="text-lg md:text-xl xl:text-2xl pl-5 text-black">
              {recipesDetail?.recipe.createdAt
                ? formatDate(recipesDetail.recipe.createdAt)
                : ""}
            </div>
          </div>

          <h1 className="cormorant-bold text-4xl md:text-5xl xl:text-6xl mb-7 text-black">
            {recipesDetail?.recipe.name}
          </h1>

          <p className="font-medium text-black text-base md:text-lg xl:text-xl">
            {recipesDetail?.recipe.content}
          </p>
        </div>
      </div>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h5 className="cormorant-bold text-4xl py-5 text-black">
            How to make:
          </h5>
          <div
            className="text-black"
            dangerouslySetInnerHTML={{
              __html: recipesDetail?.recipe.tutorial ?? "",
            }}
          />

          {session?.user?.subscription != null && (
            <h5 className="cormorant-bold text-4xl py-5 text-black">
              Watch Video
            </h5>
          )}
          {session?.user?.subscription != null && (
            <div className="flex justify-center">
              {recipesDetail?.recipe.video && (
                <VideoEmbed url={recipesDetail.recipe.video} />
              )}
            </div>
          )}
        </div>

        <div className="bg-primary ">
          <div className="bg-white border-2 p-10 border-black">
            <h5 className="cormorant-bold text-4xl py-5 text-black">
              Ingredients:
            </h5>

            <ul className="list-disc pl-5 text-black">
              {recipesDetail?.recipe.ingredients?.map((ing: any) => (
                <li key={ing.id}>
                  {ing.ingredientName}: {ing.quantity} {ing.unit}
                </li>
              ))}
            </ul>

            {session?.user?.subscription != null && (
              <h5 className="cormorant-bold text-4xl py-5 text-black">
                Missing
              </h5>
            )}
            {session?.user?.subscription != null && (
              <ul className="list-disc pl-5 text-red-500">
                {recipesDetail?.missingIngredients?.map((ing: any) => (
                  <li key={ing.id} className="flex items-center">
                    <div>{ing.ingredientName}</div>

                    {ing.isInShoppingList === false && (
                      <button
                        onClick={() => handleOpen(ing)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <BiPlusCircle size={20} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {session?.user?.subscription != null && (
              <ConfirmAddShoppingList
                open={openModal}
                handleOpen={handleOpen}
                ingredient={ingredientToShopping}
                recipeName={recipesDetail?.recipe.name}
                recipeId={recipesDetail?.recipe.id}
                refreshRecipeDetails={refreshRecipeDetails}
              />
            )}
          </div>
        </div>
      </div>

      <div className="pt-10">
        <span className="text-4xl md:text-6xl text-center cormorant-bold text-black pr-2">
          Related
        </span>
        <span className="text-4xl md:text-6xl text-center bonheur-royale-regular text-secondary">
          Recipes
        </span>
      </div>

      <div className="flex flex-wrap pt-5 justify-center">
        {recipes.slice(0, 4).map((recipe) => (
          <div key={recipe.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
