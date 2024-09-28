import Image from "next/image";

type dishType = {
  image: string;
  title: string;
  description: string;
};

export default function RecipeCard({ dish }: { dish: dishType }) {
  return (
    <div className="card flex justify-center">
      <div className="relative overflow-hidden h-[150px] w-[300px]">
        <figure className="group flex items-center justify-center">
          <Image
            className="group-hover:scale-110 transition-transform duration-300"
            src={dish.image}
            alt={dish.title}
            width={250}
            height={200}
          />
        </figure>
      </div>
      <div className="card-body">
        <h2 className="card-title flex justify-center text-black font-cormorant">
          {dish.title}
        </h2>
        <p className="flex justify-center text-black font-cormorant">
          {dish.description}
        </p>
      </div>
    </div>
  );
}
