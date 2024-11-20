"use client";
import React, { useEffect, useState } from "react";

import { getRequest } from "../../../helpers/api-requests";
import Loading from "@/app/loading";

import { Recipe } from "../../../constants/types/recipes.type";
import Link from "next/link";
import Image from "next/image";

export default function ListLunch() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  useEffect(() => {
    getRequest("/recipes", { "occasion-name": "Lunch" })
      .then((response) => {
        setRecipes(response.recipes);
        setLoadingRecipes(false);
      })
      .catch(() => {
        setLoadingRecipes(false);
      });
  }, []);

  return loadingRecipes ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-4 md:mx-20 mb-0 rounded-md">
      {recipes.slice(0, 3).map((dish, index) => (
        <div
          key={index}
          className="card flex justify-center m-3 w-[350px] h-[250px]"
        >
          <Link className="flex justify-center" href={`/recipes/${dish.id}`}>
            <div className="relative overflow-hidden w-full h-full">
              <figure className="group flex items-center justify-center h-full relative">
                {dish.imageUrl && (
                  <Image
                    className="group-hover:scale-110 transition-transform duration-500 object-cover w-full h-full"
                    src={dish.imageUrl}
                    alt={dish.name}
                    width={350}
                    height={250}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                <span className="absolute bottom-0 left-0 text-center text-black bg-[#d7ff49] text-sm px-3 py-1">
                  {dish.occasionName}
                </span>
              </figure>
            </div>
          </Link>
          <div className="card-body p-0">
            <h2 className="card-title pt-5 flex justify-center text-2xl text-black font-cormorant text-center">
              {dish.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
