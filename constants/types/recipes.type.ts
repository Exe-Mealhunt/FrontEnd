import { Ingredient } from "./ingrdients.type";

export type Recipe = {
  id: number;
  name: string;
  imageUrl: string;
  cookingTime?: string;
  serving?: number;
  content?: string;
  tutorial?: string;
  recipeIngredients?: any[];
  video?: string;
};
