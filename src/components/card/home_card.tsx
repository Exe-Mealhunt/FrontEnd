import Image from "next/image";
import Link from "next/link";

import { Recipe } from "../../../constants/types/recipes.type";

export default function HomeCard({ recipe }: { recipe: Recipe }) {
  console.log(recipe);
  return (
    <div className="card w-96 m-3 relative group rounded-none">
      <Link href={`/recipes/${recipe.id}`}>
        <figure className="relative">
          <div className="">
            {recipe.imageUrl && (
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                width={400}
                height={206}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-3xl font-bold">See the recipe</p>
          </div>
        </figure>
      </Link>
      <div className="card-body p-5">
        <div className="flex justify-evenly text-[#46500c] text-sm ">
          <div className="flex items-center"> Serving: {recipe.serving}</div>
          <div className="flex items-center">
            <span className="mx-2">|</span>
          </div>
          <div className="flex items-center">
            Cooking time: {recipe.cookingTime}
          </div>
        </div>

        <h2 className="card-title flex justify-center text-black font-cormorant text-center">
          {recipe.name}
        </h2>
      </div>
    </div>
  );
}
