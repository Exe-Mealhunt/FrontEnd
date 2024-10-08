"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const IngredientsContext = createContext<any[]>([]);

export const IngredientsProvider = ({ children }: any) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const savedIngredients = Cookies.get("selectedIngredients");
    if (savedIngredients) {
      setSelectedIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      Cookies.set("selectedIngredients", JSON.stringify(selectedIngredients), {
        expires: 7,
      });
    } else {
      Cookies.remove("selectedIngredients");
    }
  }, [selectedIngredients]);

  return (
    <IngredientsContext.Provider
      value={[selectedIngredients, setSelectedIngredients]}
    >
      {children}
    </IngredientsContext.Provider>
  );
};
