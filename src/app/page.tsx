"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import OccasionList from "@/components/list_occasion";
import HeroImg from "../assets/meal_hero.jpg";
import DessertImg from "../assets/dessert_image.png";
import HomeCard from "@/components/card/home_card";
import { getRequest } from "../../helpers/api-requests";
import Loading from "./loading";
import ListLunch from "@/components/list-recipe/list_lunch";
import ListDessert from "@/components/list-recipe/list_desserts";
import { OccasionContext } from "@/context/occasion_context";

import { Recipe } from "../../constants/types/recipes.type";
import { Occasion } from "../../constants/types/occasion.type";

export default function Page() {
  const { setChosenOccasion } = useContext(OccasionContext);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [occasion, setOccasion] = useState<Occasion[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [loadingOccasions, setLoadingOccasions] = useState(true);

  const handleOccasionClick = (name: string) => {
    setChosenOccasion(name);
  };

  useEffect(() => {
    getRequest("/recipes", {})
      .then((response) => {
        setRecipes(response.recipes);
        setLoadingRecipes(false);
      })
      .catch(() => {
        setLoadingRecipes(false);
      });
  }, []);

  useEffect(() => {
    getRequest("/occasions/all", {})
      .then((occasion) => {
        setOccasion(occasion);
        setLoadingOccasions(false);
      })
      .catch(() => {
        setLoadingOccasions(false);
      });
  }, []);

  return (
    <div className="bg-primary">
      {loadingRecipes && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center md:justify-end text-center md:text-right h-full">
          <div className="flex flex-col items-center md:items-end justify-center">
            <h1 className="text-4xl md:text-7xl font-bold text-black p-4 cormorant-bold w-full">
              Every Bite
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start">
              <h1 className="text-3xl md:text-6xl font-bold text-black cormorant-bold w-full p-4 md:pt-14">
                Tells a
              </h1>
              <h1 className="text-5xl md:text-9xl font-bold text-secondary cormorant-bold w-full pr-4">
                Flavor
              </h1>
            </div>

            <h2 className="text-secondary bonheur-royale-regular text-xl md:text-3xl font-bold text-center md:text-right pr-0 md:pr-20">
              Hi There! We&rsquo;re MealHunt,
            </h2>
            <h2 className="text-black cormorant-bold text-sm md:text-xl font-bold text-center md:text-right pr-0 md:pr-20 w-96">
              The cook, writer and photographer behind this little blog. We’ve
              picked up their love for food along the way, and with this blog,
              We share our food story with you.
            </h2>

            <a
              className="mr-20"
              href="https://www.facebook.com/profile.php?id=61566404104949&is_tour_dismissed&locale=vi_VN"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 256 256"
                className="mt-4 md:mt-0"
              >
                <g fill="#fd5904" fillRule="nonzero">
                  <g transform="scale(8.53333,8.53333)">
                    <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z" />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={HeroImg}
            alt="Picture of the author"
            width={600}
            height={400}
            className="hidden md:block w-full h-auto"
          />
        </div>
      </div>

      <div className="bg-[#f58661] p-14 justify-center h-auto flex flex-col items-center">
        <div className="pt-20">
          <div className="flex pb-10">
            <h1 className="flex justify-end pr-5 pb-10 text-6xl text-primary cormorant-bold w-full md:text-8xl">
              Explore By
            </h1>
            <h1 className="flex text-6xl text-primary bonheur-royale-regular w-full md:text-8xl">
              Category
            </h1>
          </div>
          {loadingOccasions ? (
            <Loading />
          ) : (
            <OccasionList occasions={occasion} />
          )}
        </div>
      </div>

      <div className="mt-40">
        <h2 className="flex justify-center text-black text-6xl cormorant-bold p-20">
          Latest Recipes
        </h2>

        <div className="bg-[#f2fbb0] grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-20 mb-0 rounded-md">
          {recipes.slice(0, 8).map((recipe, index) => (
            <div
              key={index}
              className={`relative ${
                index % 3 === 1 ? "-translate-y-1/4 z-10" : ""
              } transition-transform duration-300`}
            >
              <HomeCard recipe={recipe} />
            </div>
          ))}
          <a
            href="/recipes"
            className="flex justify-center items-center bg-[#46500c] text-black text-xl font-bold transition-transform duration-300 transform hover:scale-105 cursor-pointer p-4"
          >
            Explore All
          </a>
        </div>
      </div>

      <div className="bg-[#9baad0] p-14 justify-center mt-20">
        <h1 className="flex justify-center text-6xl text-black pb-8 cormorant-bold w-full md:text-8xl">
          We love our
        </h1>
        <h1 className="flex justify-center text-6xl text-black bonheur-royale-regular w-full md:text-8xl">
          lunch
        </h1>
        <ListLunch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[.75fr_1fr] gap-4 bg-primary p-5 md:p-10">
        <div className="bg-[#e3bb21] p-5">
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <h1 className="text-xl text-white pr-3 cormorant-bold md:text-6xl">
                Our Best
              </h1>

              <h1 className="text-xl text-white bonheur-royale-regular md:text-6xl">
                Desserts
              </h1>
            </div>
            <h1 className="text-xl text-white cormorant-bold md:text-6xl ml-2">
              Recipes
            </h1>

            <div className="mt-5">
              <Link
                href={"/recipes"}
                onClick={() => handleOccasionClick("Dessert")}
              >
                <button className="btn bg-[#46500c] text-primary rounded-none border-none hover:bg-primary hover:text-[#46500c] cormorant-bold text-xl">
                  Explore all
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <Image
              src={DessertImg}
              alt="Dessert Image"
              width={300}
              height={200}
              className="hidden md:block"
            />
          </div>
        </div>

        <ListDessert />
      </div>
    </div>
  );
}
