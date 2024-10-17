import { FaUtensils, FaPizzaSlice, FaIceCream } from "react-icons/fa";
import Image from "next/image";

import logoImg from "../../assets/login_image.jpg";
import { FaHandPointRight } from "react-icons/fa";

const PRICING_DATA = [
  {
    name: "Basic Meal",
    price: "$9.99",
    iconComponent: <FaUtensils size={40} />,
    benefits: ["1 Starter", "1 Main Course", "1 Dessert"],
  },
  {
    name: "Family Meal",
    price: "$19.99",
    iconComponent: <FaPizzaSlice size={40} />,
    benefits: ["2 Starters", "2 Main Courses", "2 Desserts"],
  },
  {
    name: "Deluxe Meal",
    price: "$29.99",
    iconComponent: <FaIceCream size={40} />,
    benefits: ["3 Starters", "3 Main Courses", "3 Desserts"],
  },
];

export default function Page() {
  return (
    <>
      <Image
        src={logoImg}
        alt="high demand pricing plan background"
        className="h-screen w-full opacity-70 hidden lg:inline-block "
      />

      <div className="bg-[#fffad6] font-sans lg:bg-transparent flex flex-col lg:flex-row absolute justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 px-5 xl:px-0 py-8 lg:py-0 w-full gap-6 items-center lg:items-stretch">
        {PRICING_DATA.map((data, index) => (
          <div key={index} className="relative">
            <div className="max-w-sm xl:w-[384px] p-6 bg-white group h-full rounded-2xl lg:hover:-translate-y-6 ease-in duration-300 hover:bg-[#0B0641] hover:text-white border xl:border-none border-[#0B0641]">
              <div className="flex flex-row gap-5 items-center">
                <div className="text-black group-hover:text-white">
                  {data.iconComponent}
                </div>
                <span className="text-3xl font-bold text-black group-hover:text-white">
                  {data.name}
                </span>
              </div>
              <span className="flex mt-4 text-[#A9A9AA] text-2xl">
                What You&apos;ll Get
              </span>
              {data.benefits.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-2.5 items-start mt-6 text-left text-lg"
                >
                  <div className="pt-1 shrink-0 text-black group-hover:text-white">
                    <FaHandPointRight />
                  </div>
                  <span className="text-black group-hover:text-white">
                    {data}
                  </span>
                </div>
              ))}
              <div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
              <div className="h-36">
                <div className="bottom-6 left-6 right-6 absolute">
                  <div className="flex justify-start items-baseline">
                    <span className="text-[32px] font-bold text-black group-hover:text-white">
                      {data.price}
                    </span>
                  </div>
                  <button className="w-full px-4 py-3 bg-[#FFF5FA] text-[#FF1D89] group-hover:text-white group-hover:bg-[#FF1D89] rounded-xl mt-6 font-semibold text-xl">
                    Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
