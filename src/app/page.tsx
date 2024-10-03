import Image from "next/image";

import ListCategory from "@/components/list_category";
import HeroImg from "../assets/meal_hero.jpg";
import HomeCard from "@/components/card/home_card";
import RecipeCard from "@/components/card/recipe_card";

import { newDish, categories } from "./mock_data";

export default function Page() {
  return (
    <div className="bg-primary">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-end text-right h-full">
          <div className="flex flex-col items-end justify-center">
            <h1 className="text-7xl font-bold text-black p-4 cormorant-bold w-full">
              Every Bite
            </h1>

            <div className="flex">
              <h1 className="text-6xl font-bold text-black cormorant-bold w-full p-4 pt-14">
                Tells a
              </h1>
              <h1 className="text-9xl font-bold text-secondary cormorant-bold w-full pr-4">
                Flavor
              </h1>
            </div>

            <h2 className="text-secondary bonheur-royale-regular text-3xl font-bold text-right pr-20">
              Hi There! We&rsquo;re MealHunt,
            </h2>
            <h2 className="text-black cormorant-bold text-1xl font-bold text-right pr-20 w-96">
              The cook, writer and photographer behind this little blog. We’ve
              picked up their love for food along the way, and with this blog,
              We share our food story with you.
            </h2>

            <a
              href="https://www.facebook.com/profile.php?id=61566404104949&is_tour_dismissed&locale=vi_VN"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 256 256"
                style={{ marginRight: "10rem" }}
              >
                <g fill="#fd5904" fillRule="nonzero">
                  <g transform="scale(8.53333,8.53333)">
                    <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z" />
                  </g>
                </g>
              </svg>
            </a>
          </div>
          <div></div>
        </div>
        <Image
          src={HeroImg}
          alt="Picture of the author"
          width={1200}
          height={800}
        />
      </div>

      <div className="bg-[#f58661] p-14 justify-center h-[80vh]">
        <div className="pt-20">
          <div className="flex pb-10">
            <h1 className="flex justify-end pr-5 pb-10 text-6xl text-primary cormorant-bold w-full md:text-8xl">
              Explore By
            </h1>
            <h1 className="flextext-6xl text-primary bonheur-royale-regular w-full md:text-8xl">
              Category
            </h1>
          </div>

          <ListCategory categories={categories} />
        </div>
      </div>

      <div>
        <div className="mt-40">
          <h2 className="flex justify-center text-black text-6xl cormorant-bold p-20">
            Latest Recipes
          </h2>
        </div>

        <div className="bg-[#f2fbb0] grid grid-cols-1 md:grid-cols-3 gap-4 m-20 mb-0 rounded-md">
          {newDish.slice(0, 8).map((dish, index) => (
            <div
              key={index}
              className={`relative ${index % 3 === 1 ? "-translate-y-1/4 z-10" : ""}`}
            >
              <HomeCard dish={dish} />
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

      <div>
        <div className="bg-[#9baad0] p-14 justify-center">
          <h1 className="flex justify-center text-6xl text-black pb-8 cormorant-bold w-full md:text-8xl">
            We love our
          </h1>
          <h1 className="flex justify-center text-6xl text-black bonheur-royale-regular w-full md:text-8xl">
            lunch
          </h1>
          <div className="grid grid-cols-3 gap-4 m-20 mb-0 rounded-md">
            {newDish.slice(0, 3).map((dish, index) => (
              <div key={index}>
                <RecipeCard dish={dish} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
