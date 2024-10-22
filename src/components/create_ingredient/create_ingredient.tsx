import React, { useEffect, useState } from "react";

import CustomAutoComplete from "../auto_complete";
import { getRequest, postRequest } from "../../../helpers/api-requests";
import { toast } from "react-toastify";
import { Category } from "../../../constants/types/categories.type";

export default function CreateIngredient() {
  const [ingredientName, setIngredientName] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const [categoryValue, setCategoryValue] = useState<Category>();
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);

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

  useEffect(() => {
    (async () => {
      const response = await getRequest("/categories/all");
      setCategory(response);
    })();
  }, []);

  const addCategory = () => {
    const selectedCate = category.find(
      (cate: Category) => cate.id === categoryValue!.id,
    );

    const duplicateCategory = selectedCategory.some(
      (cate) => cate.name === categoryValue!.name,
    );
    if (duplicateCategory) {
      toast.error("Duplicate category!!!");
      return;
    } else if (selectedCate) {
      setSelectedCategory((prev) => [...prev, selectedCate]);
    }
  };

  const removeCategory = (id: number) => {
    setSelectedCategory((prev) =>
      prev.filter((category) => category.id !== id),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryValue) {
      toast.error("Select Category is required");
      return;
    }

    const categoryIds = selectedCategory.map((cate) => cate.id);
    const ingredientData = {
      ingredientName,
      categoryIds,
    };
    try {
      const response = await postRequest("/ingredient", ingredientData);
      if (response.ingredientName) {
        toast.success("Created ingredient successfully!");
        window.location.reload();
      }
    } catch (error) {
      alert("An error occurred while submitting the recipe. Please try again.");
      console.error(error);
    }
    setIngredientName("");
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          New Ingredient
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row justify-between">
            {/* Ingredient Name */}
            <div className="mb-4 sm:mb-0 sm:w-1/2 pr-0 sm:pr-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="ingredientName"
              >
                Ingredient Name: <span className="text-red-500">*</span>
              </label>
              <input
                id="ingredientName"
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                className="input w-full text-gray-900 bg-white rounded-md border border-gray-300 p-3 focus:border-indigo-500"
                placeholder="Enter ingredient name"
                required
              />
            </div>
            <div className="sm:w-1/2">
              {/* Select Category */}
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="ingredient"
                >
                  Select Category: <span className="text-red-500">*</span>
                </label>
                <CustomAutoComplete
                  value={categoryValue}
                  suggestions={filteredCategory}
                  completeMethod={(e) =>
                    search(e, category, setFilteredCategory)
                  }
                  onChange={(e) => setCategoryValue(e.value)}
                  field="name"
                  placeholder="Search Category"
                />
              </div>

              {/* Add Ingredient Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addCategory}
                  className="bg-secondary text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-blue-500 transition-all"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

          {/* Display Selected Categories */}
          {selectedCategory.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-gray-700">
                Selected Categories
              </h2>
              <ul className="list-disc ml-4 text-gray-600">
                {selectedCategory.map((item, index) => (
                  <li key={index} className="flex">
                    <span className="text-black">{item.name}</span>
                    <button
                      onClick={() => removeCategory(item.id)}
                      className="text-red-500 ml-2"
                      aria-label="Remove category"
                    >
                      &#10006;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="bg-green-600 text-white px-4 py-2 w-full md:w-auto rounded-md hover:bg-green-500 transition-all mt-4"
            type="submit"
          >
            Create Ingredient
          </button>
        </form>
      </div>
    </div>
  );
}
