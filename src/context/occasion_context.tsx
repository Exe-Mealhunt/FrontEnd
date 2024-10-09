"use client";
import React, { createContext, useState } from "react";

export const OccasionContext = createContext<any>("");

export const OccasionProvider = ({ children }: any) => {
  const [chosenOccasion, setChosenOccasion] = useState<string>("");

  return (
    <OccasionContext.Provider value={{ chosenOccasion, setChosenOccasion }}>
      {children}
    </OccasionContext.Provider>
  );
};
