import Image from "next/image";
import Link from "next/link";

type dishType = {
  id: number;
  image: string;
  title: string;
  description: string;
  cookingTime: string;
  serving: number;
};

export default function RecipeCard({ dish }: { dish: dishType }) {
  return (
    <div className="card flex justify-center">
      <Link className="flex justify-center" href={`/recipes/${dish.id}`}>
        <div className="relative overflow-hidden w-[250px]">
          <figure className="group flex items-center justify-center">
            <Image
              className="group-hover:scale-110 transition-transform duration-400"
              src={dish.image}
              alt={dish.title}
              width={250}
              height={200}
            />
          </figure>
        </div>
      </Link>
      <div className="card-body">
        <div className="flex justify-evenly text-black text-sm ">
          <div className="flex items-center"> Serving: {dish.serving}</div>
          <div className="flex items-center">
            <span className="mx-2">|</span>
          </div>
          <div className="flex items-center">
            Cooking time: {dish.cookingTime}
          </div>
        </div>
        <h2 className="card-title flex justify-center text-black font-cormorant text-center">
          {dish.title}
        </h2>
      </div>
    </div>
  );
}
