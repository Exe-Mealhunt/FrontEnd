"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { getRequest } from "../../../helpers/api-requests";
import ShoppingListCard from "../card/shopping_list_card";

export default function ShoppingList() {
  const { data: session } = useSession();
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10);
      getRequest("/shopping-lists/get-shopping-lists", { userId })
        .then((response) => {
          setShoppingList(response);
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleDelete = (id: number) => {
    // Update the list after deletion
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen flex justify-center">
      {loading ? (
        <div className="flex w-full h-screen justify-center items-center bg-primary">
          <Loading />
        </div>
      ) : (
        <form className="w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            My Shopping List
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {shoppingList.map((recipe) => (
              <ShoppingListCard
                key={recipe.id}
                recipe={{ ...recipe, onDelete: handleDelete }}
              />
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
