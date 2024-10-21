import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../../../constants/types/recipes.type";

// Array of possible cooking times
const cookingTimes = [25, 30, 35, 40, 45];
const servings = [4, 5, 6, 7, 8, 9, 10];

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const randomCookingTime =
    cookingTimes[Math.floor(Math.random() * cookingTimes.length)];
  const cookingTime = recipe.cookingTime || `${randomCookingTime} min`;
  const randomserving = servings[Math.floor(Math.random() * servings.length)];
  const serving = recipe.serving || `${randomserving}`;

  return (
    <div className="card flex justify-center m-3">
      <Link className="flex justify-center" href={`/recipes/${recipe.id}`}>
        <div className="relative overflow-hidden w-[250px] h-[150px]">
          <figure className="group flex items-center justify-center h-full relative">
            {recipe.imageUrl && (
              <Image
                className="group-hover:scale-110 transition-transform duration-700 object-cover w-full h-full"
                src={recipe.imageUrl}
                alt={recipe.name}
                width={250}
                height={250}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <span className="absolute top-3 left-3 text-center text-black bg-[#d7ff49] text-sm px-3 py-1">
              {recipe.occasionName}
            </span>
          </figure>
        </div>
      </Link>
      <div className="card-body p-0">
        <div className="flex justify-evenly text-black text-sm ">
          <div className="flex items-center">Serving: {serving}</div>
          <div className="flex items-center">
            <span className="mx-2">|</span>
          </div>
          <div className="flex items-center">Cooking time: {cookingTime}</div>
        </div>
        <h2 className="card-title flex justify-center text-black font-cormorant text-center">
          {recipe.name}
        </h2>
      </div>
    </div>
  );
}
