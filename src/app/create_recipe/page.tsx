"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import CreateRecipe from "@/components/create_recipe/create_recipe";
import CreateIngredient from "@/components/create_ingredient/create_ingredient";

export default function CreateRecipePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <div className="bg-[url('https://img.freepik.com/free-photo/ingredients-cabbage-carrot-pie-cabbage-carrots-eggs-flour-milk-butter-spices-white-background_127032-2866.jpg?w=1800&t=st=1729571560~exp=1729572160~hmac=a8446e659c27ecf598ec93ece324c8e78cce3d945f34e195d207b1273e279fbd')] bg-cover bg-center min-h-screen">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="w-full">
          <CreateRecipe />
        </div>
        <div className="w-full">
          <CreateIngredient />
        </div>
      </div>
    </div>
  );
}
