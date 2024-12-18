import Image from "next/image";
import Link from "next/link";

import { Recipe } from "../../../constants/types/recipes.type";

const cookingTimes = [25, 30, 35, 40, 45];
const servings = [4, 5, 6, 7, 8, 9, 10];

export default function HomeCard({ recipe }: { recipe: Recipe }) {
  const randomCookingTime =
    cookingTimes[Math.floor(Math.random() * cookingTimes.length)];
  const cookingTime = recipe.cookingTime || `${randomCookingTime} min`;
  const randomserving = servings[Math.floor(Math.random() * servings.length)];
  const serving = recipe.serving || `${randomserving}`;
  return (
    <div className="card w-96 m-3 relative group rounded-none">
      <Link href={`/recipes/${recipe.id}`}>
        <figure className="group flex items-center justify-center h-full relative">
          {recipe.imageUrl && (
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              width={400}
              height={206}
            />
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-3xl font-bold">See the recipe</p>
          </div>
          <span className="absolute top-3 left-3 text-center text-black bg-[#d7ff49] text-sm px-3 py-1">
            {recipe.occasionName}
          </span>
        </figure>
      </Link>
      <div className="card-body p-5">
        <div className="flex justify-evenly text-[#46500c] text-sm ">
          <div className="flex items-center"> Serving: {serving}</div>
          <div className="flex items-center">
            <span className="mx-2">|</span>
          </div>
          <div className="flex items-center">Cooking time: {cookingTime}</div>
        </div>

        <h2 className="card-title flex justify-center text-black text-2xl font-cormorant text-center">
          {recipe.name}
        </h2>
      </div>
    </div>
  );
}
