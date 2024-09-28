import Image from "next/image";

import ListCategory from "@/components/list_category";
import HeroImg from "../assets/meal_hero.jpg";
import HomeCard from "@/components/card/home_card";

const categories = [
  {
    name: "Appetizer",
    image: "https://picsum.photos/200/300",
    link: "/appetizer",
  },
  {
    name: "Bakery",
    image: "https://picsum.photos/200/301",
    link: "/bakery",
  },
  {
    name: "Beverages",
    image: "https://picsum.photos/200/302",
    link: "/beverages",
  },
  {
    name: "Desserts",
    image: "https://picsum.photos/200/303",
    link: "/desserts",
  },
  {
    name: "Dinner",
    image: "https://picsum.photos/200/304",
    link: "/dinner",
  },
  {
    name: "Lunch",
    image: "https://picsum.photos/200/305",
    link: "/lunch",
  },
  {
    name: "Salad",
    image: "https://picsum.photos/200/306",
    link: "/salad",
  },
];

const newDish = [
  {
    image: "https://picsum.photos/400/206",
    title: "Thai Basil Chicken",
    description:
      "Stir-fried chicken with Thai basil, chilies, and garlic, served with steamed jasmine rice.",
  },
  {
    image: "https://picsum.photos/400/207",
    title: "Creamy Mushroom Pasta",
    description:
      "Fettuccine tossed in a creamy mushroom sauce, topped with parmesan cheese and fresh parsley.",
  },
  {
    image: "https://picsum.photos/400/208",
    title: "Japanese Teriyaki Salmon",
    description:
      "Grilled salmon fillet glazed with a sweet and savory teriyaki sauce, served with steamed bok choy.",
  },
  {
    image: "https://picsum.photos/400/209",
    title: "Indian Butter Chicken",
    description:
      "Marinated chicken cooked in a rich butter tomato sauce, served with basmati rice and naan bread.",
  },
  {
    image: "https://picsum.photos/400/210",
    title: "Korean BBQ Beef",
    description:
      "Grilled beef short ribs marinated in a sweet and spicy Korean BBQ sauce, served with steamed kimchi.",
  },
  {
    image: "https://picsum.photos/400/211",
    title: "Vegan Black Bean Chili",
    description:
      "A hearty and flavorful vegan chili made with black beans, sweet potatoes, and a blend of spices.",
  },
  {
    image: "https://picsum.photos/400/212",
    title: "Roasted Vegetable Salad",
    description:
      "A colorful salad made with roasted vegetables such as sweet potatoes, Brussels sprouts, and cauliflower, tossed with a citrus vinaigrette.",
  },
  {
    image: "https://picsum.photos/400/213",
    title: "Grilled Chicken Caesar Salad",
    description:
      "A classic Caesar salad made with grilled chicken, romaine lettuce, croutons, and parmesan cheese, tossed with a tangy Caesar dressing.",
  },
  {
    image: "https://picsum.photos/400/214",
    title: "Creamy Tomato Soup",
    description:
      "A comforting and creamy tomato soup made with fresh tomatoes and herbs, served with a side of crusty bread.",
  },
];
export default function Page() {
  return (
    <div className="bg-primary">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-end text-right h-full">
          <div className="flex flex-col items-end justify-center">
            <h1 className="text-7xl font-bold text-black p-4 font-cormorant w-full">
              Every Bite
            </h1>

            <div className="flex">
            <h1 className="text-6xl font-bold text-black font-cormorant w-full pt-14">
              Tells&nbsp;a
            </h1>
            <h1 className="text-9xl font-bold text-secondary font-cormorant w-full">
              &nbsp;Flavor
            </h1>
            </div>
          </div>
        </div>
        <Image
          src={HeroImg}
          alt="Picture of the author"
          width={1200}
          height={800}
        />
      </div>

      <div className="bg-secondary p-12">
        <div className="justify-center">
          <h1 className="flex justify-center text-6xl text-primary pb-10 font-cormorant w-full md:text-8xl">
            Explore By Category
          </h1>
          <ListCategory categories={categories} />
        </div>
      </div>

      <div>
        <div className="mt-40">
          <h2 className="flex justify-center text-black text-6xl font-cormorant p-20">
            Latest Recipes
          </h2>
        </div>

        <div className="bg-[#f2fbb0] grid grid-cols-3 gap-4 m-20 mb-0 rounded-md">
  {newDish.slice(0, 8).map((dish, index) => (
    <div
      key={index}
      className={`relative ${index % 3 === 1 ? "-translate-y-1/4 z-10" : ""}`}
    >
      <HomeCard dish={dish} />
    </div>
  ))}

<a href="/recipes" className="flex justify-center items-center bg-[#46500c] text-black text-xl font-bold transition-transform duration-300 transform hover:scale-105 cursor-pointer p-4">
  Explore All
</a>
</div>

      </div>
    </div>
  );
}
