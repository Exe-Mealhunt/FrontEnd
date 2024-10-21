"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

import { getRequest, postRequest } from "../../../helpers/api-requests";
import CustomAutoComplete from "@/components/auto_complete";
import { isValidVideoURL } from "../../../helpers/valid-video-url";
import { isValidImageURL } from "../../../helpers/valid-image-url";

import { Occasion } from "../../../constants/types/occasion.type";
import { Ingredient } from "../../../constants/types/ingrdients.type";
import { Unit } from "../../../constants/types/unit.type";
import { UnitData } from "../../../constants/unit";

const TextEditor = dynamic(() => import("@/components/input/tutorial_input"), {
  ssr: false,
});

export default function CreateRecipePage() {
  const { data: session } = useSession();

  const router = useRouter();

  const [recipeName, setRecipeName] = useState("");
  const [video, setVideo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [occasionValue, setOccasionValue] = useState<number | null>(null);
  const [filteredOccasions, setFilteredOccasions] = useState<Occasion[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: number; unit: string | null; quantity: number }[]
  >([]);
  const [ingredientValue, setIngredientValue] = useState<any>({});
  const [ingredientQuantity, setIngredientQuantity] = useState(1);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    [],
  );
  const [unitValue, setUnitValue] = useState<Unit>("");
  const [filteredUnits, setFilteredUnits] = useState<Unit[]>([]);
  const [tutorial, setTutorial] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await getRequest("/occasions/all", {});
      setOccasions(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getRequest("/ingredient/get-ingredients", {});
      setIngredients(response);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipeName) {
      toast.error("Recipe Name is required");
      return;
    }

    if (!isValidImageURL(imageUrl)) {
      toast.error("Image URL must be a valid Image link");
      return;
    }

    if (!isValidVideoURL(video)) {
      toast.error("Video URL must be a valid TikTok or YouTube link");
      return;
    }

    if (occasionValue === null) {
      toast.error("Select Occasion is required");
      return;
    }

    if (selectedIngredients.length === 0) {
      toast.error("Ingredient is required");
      return;
    }

    const recipeData = {
      userId: session?.user?.id,
      name: recipeName,
      video,
      imageUrl,
      content,
      occasionId: occasionValue,
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId,
        unit: ingredient.unit || null,
        quantity: ingredient.quantity,
      })),
      tutorial,
    };

    try {
      const response = await postRequest("/recipes", recipeData);
      console.log(response);
      toast.success("Recipe submitted successfully!");
      if (response === "Recipe added successfully.") {
        router.push("/recipes");
      }
    } catch (error) {
      alert("An error occurred while submitting the recipe. Please try again.");
      console.error(error);
    }
  };

  const search = (
    event: any,
    items: any[],
    setFiltered: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    const query = event.query.toLowerCase();
    const filtered = items.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query),
      ),
    );
    setFiltered(filtered);
  };

  const addIngredient = () => {
    const selectedIngredient = ingredients.find(
      (ingredient) =>
        ingredient.ingredientName === ingredientValue.ingredientName,
    );
    if (selectedIngredient) {
      const newIngredient = {
        ingredientId: selectedIngredient.id,
        unit: unitValue || null,
        quantity: ingredientQuantity,
      };

      setSelectedIngredients((prev) => [...prev, newIngredient]);
      setIngredientValue("");
      setUnitValue("");
      setIngredientQuantity(1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Create Recipe
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Recipe Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="recipeName"
                >
                  Recipe Name:
                </label>
                <input
                  id="recipeName"
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter recipe name"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="videoUrl">
                  Image URL:
                </label>
                <input
                  id="ImageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>

              {/* Video URL */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="videoUrl">
                  Video URL:
                </label>
                <input
                  id="videoUrl"
                  type="url"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter video URL"
                  required
                />
              </div>

              {/* Recipe Content */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="Content">
                  Recipe Content:
                </label>
                <textarea
                  id="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter recipe Content"
                  rows={4}
                  required
                />
              </div>

              {/* Recipe Tutorial */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="videoUrl">
                  Tutorial:
                </label>
                <TextEditor text={tutorial} setText={setTutorial} />
              </div>
            </div>
            <div>
              {/* Select Occasion */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="occasion">
                  Select Occasion:
                </label>
                <CustomAutoComplete
                  value={
                    occasions.find((oc) => oc.id === occasionValue)?.name || ""
                  }
                  suggestions={filteredOccasions}
                  completeMethod={(e) =>
                    search(e, occasions, setFilteredOccasions)
                  }
                  onChange={(e) => setOccasionValue(e.value.id)}
                  field="name"
                  placeholder="Search Occasion"
                />
              </div>

              {/* Select Ingredient */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="ingredient"
                >
                  Select Ingredient:
                </label>
                <CustomAutoComplete
                  value={ingredientValue}
                  suggestions={filteredIngredients}
                  completeMethod={(e) =>
                    search(e, ingredients, setFilteredIngredients)
                  }
                  onChange={(e) => setIngredientValue(e.value)}
                  field="ingredientName"
                  placeholder="Search Ingredient"
                />
              </div>

              {/* Unit */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="unit">
                  Unit:
                </label>
                <CustomAutoComplete
                  value={unitValue}
                  suggestions={filteredUnits}
                  completeMethod={(e) => search(e, UnitData, setFilteredUnits)}
                  onChange={(e) => setUnitValue(e.value)}
                  field=""
                  placeholder="Search Unit"
                />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={ingredientQuantity}
                  onChange={(e) =>
                    setIngredientQuantity(Number(e.target.value))
                  }
                  className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                  placeholder="Enter quantity"
                  min={1}
                />
              </div>

              {/* Add Ingredient Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addIngredient}
                  className="bg-secondary text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-blue-500 transition-all"
                >
                  Add Ingredient
                </button>
              </div>
            </div>
          </div>

          {/* Display Selected Ingredients */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-700">
              Selected Ingredients
            </h2>
            <ul className="list-disc ml-4 text-gray-600">
              {selectedIngredients.map((item, index) => {
                const ingredient = ingredients.find(
                  (ing) => ing.id === item.ingredientId,
                );
                return (
                  <li key={index}>
                    {ingredient
                      ? `${ingredient.ingredientName} - ${item.quantity} ${
                          item.unit || ""
                        }`
                      : ""}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-green-500 transition-all"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
