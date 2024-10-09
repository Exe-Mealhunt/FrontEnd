"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { OccasionContext } from "../../context/occasion_context";

import { Occasion } from "../../../constants/types/occasion.type";

export default function OccasionList({ occasions }: { occasions: Occasion[] }) {
  const { setChosenOccasion } = useContext(OccasionContext);

  const handleOccasionClick = (name: string) => {
    setChosenOccasion(name);
  };

  return (
    <div className="flex justify-center flex-wrap md:flex-nowrap">
      {occasions.slice(0, 6).map((occasion) => (
        <Link
          key={occasion.id}
          href={"/recipes"}
          onClick={() => handleOccasionClick(occasion.name)}
          className={`bg-primary transition-transform duration-500 ease-in-out md:w-1/3 w-full md:mx-4 mx-2 md:mb-0 mb-4`}
          style={{
            transform: `rotate(${occasions.indexOf(occasion) % 2 === 0 ? "-25deg" : "25deg"})`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${occasions.indexOf(occasion) % 2 === 0 ? "0deg" : "0deg"})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${occasions.indexOf(occasion) % 2 === 0 ? "-25deg" : "25deg"})`;
          }}
        >
          <div className="transition duration-300">
            <Image
              src={occasion.imageUrl!}
              alt={occasion.name}
              width={100}
              height={150}
              className="md:h-64 md:w-full w-full h-56 border-8 border-primary object-cover"
            />
            <p className="text-center font-cormorant text-black font-bold text-xl md:text-2xl">
              {occasion.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
