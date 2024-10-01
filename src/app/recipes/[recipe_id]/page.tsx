import React from "react";
import Image from "next/image";

import logoImg from "../../../assets/login_image.jpg";
import RecipeCard from "@/components/card/recipe_card";

import { newDish } from "@/app/mock_data";

// export default function Detail({ params }: { params: { recipe_id: number } }) {
export default function Detail() {
  return (
    <div className="bg-primary p-14">
      <div className="grid grid-cols-2 gap-5 md:gap-10 xl:gap-16">
        <Image
          src={logoImg}
          alt="login"
          className="h-[350px] w-full md:h-[450px] md:w-[800px] xl:h-[550px] xl:w-[1100px] object-cover"
        />

        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <button className="btn text-lg bg-secondary text-white border-none rounded-none hover:bg-secondary/90 md:text-xl xl:text-2xl">
              Desserts
            </button>

            <div className="text-lg md:text-xl xl:text-2xl pl-5 text-black md:pl-10 xl:pl-16">
              July 12, 2023
            </div>
          </div>
          {/* Title */}
          <h1 className="cormorant-bold text-7xl md:text-8xl xl:text-9xl mb-7 text-black">
            Traditional Italian pizza
          </h1>

          {/* Introduce */}
          <p className="font-medium text-black md:text-lg xl:text-xl">
            A pizza recipe with a twist, featuring a folded pizza dough filled
            with tomato sauce, mozzarella cheese, and Italian sausage or other
            meat, creating a delicious and portable meal.
          </p>
        </div>
      </div>

      {/* Recipe */}
      <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 xl:gap-16">
        <div className="overflow-y-auto md:max-h-[600px] xl:max-h-[750px]">
          <h5 className="cormorant-bold text-4xl pb-5 text-black">
            Jump to recipe
          </h5>
          <p className="text-black text-lg">
            Because occasionally circumstances occur in which toil and pain can
            procure him some great pleasure. To take a trivial example, which of
            us ever undertakes laborious physical exercise, except to obtain
            some advantage from it? But who has any right to find fault with a
            man who chooses to enjoy a pleasure that has no annoying
            consequences, or one who avoids a pain that produces no resultant
            pleasure?
          </p>

          {/* How to make */}
          <h5 className="cormorant-bold text-4xl py-5 text-black">
            How to make:
          </h5>

          <ol className="list-decimal pl-10 text-black">
            <li>
              Toss together (most of) the dry ingredients. The wise man
              therefore always holds in these matters to this principle of
              selection: he rejects pleasures to secure other greater
              pleasuresThe wise man therefore always holds in these matters to
              this principle of selection.
            </li>
            <li>
              Add the wet ingredients. Temporibus autem quibusdam et aut
              officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae. Itaque
              earum rerum hic tenetur a sapiente delectus, ut et voluptates
              repudiandae sint et molestiae non recusandae.
            </li>
            <li>
              Bake printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book.
            </li>
            <li>
              Add coconut but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
            </li>
            <li>
              Let it cool it has a more-or-less normal distribution of letters,
              as opposed to using &apos;Content here, content here&apos;, making
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as their default model
              text, and a search for &apos;lorem ipsum&apos; will uncover many
              web sites still in their infancy. Various versions have evolved
              over the years, sometimes by accident, sometimes on purpose
              (injected humour and the like).
            </li>
            <li>
              Add your mix-ins(Optional) There are many variations of passages
              of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words
              which don&apos;t look even slightly believable. If you are going
              to use a passage of Lorem Ipsum, you need to be sure there
              isn&apos;t anything embarrassing hidden in the middle of text.
            </li>
            <li>
              Enjoy Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </li>
          </ol>

          {/* Note */}
          <h5 className="cormorant-bold text-4xl py-5 text-black">Note:</h5>

          <ol className="list-decimal pl-10 text-black">
            <li>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from &quot;de Finibus Bonorum et Malorum&quot; by Cicero
              are also reproduced in their exact original form, accompanied by
              English versions from the 1914 translation by H. Rackham.
            </li>
            <li>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using &apos;Content here,
              content here&apos;, making it look like readable English.
            </li>
            <li>
              Will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </li>
          </ol>
        </div>

        <div className="bg-primary">
          <div className="bg-white border-2 border-black p-9 md:p-10 xl:p-14">
            <h5 className="cormorant-bold text-4xl py-5 text-black">
              Ingredients:
            </h5>

            <ul className="list-disc text-black text-lg pl-8">
              <li>Besan (gram flour) - 1 cup</li>
              <li>Eno fruit salt - 1 tsp</li>
              <li>Yogurt - 1/2 cup</li>
              <li>Water - 1/2 cup</li>
              <li>Salt - 1/2 tsp</li>
              <li>Sugar - 1 tsp</li>
              <li>Turmeric powder - 1/4 tsp</li>
              <li>Green chilies - 2-3, finely chopped</li>
              <li>Ginger - 1 inch, grated or finely chopped</li>
              <li>Lemon juice - 1-2 tsp</li>
              <li>Oil - 1 tbsp</li>
              <li>Mustard seeds - 1 tsp</li>
              <li>Curry leaves - a few</li>
              <li>Water - for steaming</li>
            </ul>

            <h5 className="cormorant-bold text-4xl py-5 text-black">Needed:</h5>

            <ul className="list-disc text-black text-lg pl-8">
              <li>Blender or mixer grinder</li>
              <li>Serving dish</li>
              <li>Mixing bowl</li>
            </ul>

            <h5 className="cormorant-bold text-4xl py-5 text-black">
              Nutrition:
            </h5>
            <ul className="list-disc text-black text-lg pl-8">
              <li>Calories: 200-400 calories per slice</li>
              <li>Fat: 8-15 grams</li>
              <li>Sodium: 300-700 milligrams</li>
              <li>Carbohydrates: 25-40 grams</li>
              <li>Fiber: 1-3 grams</li>
              <li>Protein: 7-15 grams</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <span className="text-8xl text-center cormorant-bold text-black pr-2">
          Related
        </span>
        <span className="text-8xl text-center bonheur-royale-regular text-secondary">
          Recipes
        </span>
      </div>

      <div className="flex flex-wrap pt-5 md:flex-nowrap">
        {newDish.slice(0, 4).map((dish) => (
          <div key={dish.id} className="w-full md:w-1/4 p-2">
            <RecipeCard dish={dish} />
          </div>
        ))}
      </div>
    </div>
  );
}
