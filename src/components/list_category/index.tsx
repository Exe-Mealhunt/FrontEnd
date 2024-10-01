"use client";
import Image from "next/image";
import Link from "next/link";

export type ListCategoryProps = {
  categories: {
    name: string;
    image: string;
    link: string;
  }[];
};

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="flex justify-center flex-wrap md:flex-nowrap">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.link}
          className={`bg-primary transition-transform duration-500 ease-in-out md:w-1/3 w-full md:mx-4 mx-2 md:mb-0 mb-4`}
          style={{
            transform: `rotate(${categories.indexOf(category) % 2 === 0 ? "-20deg" : "20deg"})`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${categories.indexOf(category) % 2 === 0 ? "0deg" : "0deg"})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${categories.indexOf(category) % 2 === 0 ? "-20deg" : "20deg"})`;
          }}
        >
          <div className="bg-primary m-1 p-1 transition duration-300">
            <Image
              src={category.image}
              alt={category.name}
              width={150}
              height={150}
              className="md:h-64 md:w-full w-full h-56"
            />
            <p className="text-center font-cormorant text-black font-bold text-xl md:text-2xl">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

type Category = {
  name: string;
  image: string;
  link: string;
};
