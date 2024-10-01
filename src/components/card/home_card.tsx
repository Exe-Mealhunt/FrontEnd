import Image from "next/image";

type dishType = {
  image: string;
  title: string;
  description: string;
};

export default function HomeCard({ dish }: { dish: dishType }) {
  return (
    <div className="card w-96 m-3 relative group rounded-none">
      <figure className="relative">
        <Image src={dish.image} alt={dish.title} width={400} height={206} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-3xl font-bold">See the recipe</p>
        </div>
      </figure>
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
