import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../../../constants/types/recipes.type";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="card flex justify-center m-3">
      <Link className="flex justify-center" href={`/recipes/${recipe.id}`}>
        <div className="relative overflow-hidden w-[250px] h-[150px]">
          <figure className="group flex items-center justify-center h-full">
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
          </figure>
        </div>
      </Link>
      <div className="card-body p-0">
        <div className="flex justify-evenly text-black text-sm ">
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
