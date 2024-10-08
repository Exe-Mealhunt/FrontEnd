import React from "react";
import { Occasion } from "../../../constants/types/occasion.type";

interface ListOccasionBtnProps extends Occasion {
  onClick: () => void;
  isSelected: boolean;
}

export default function ListOccasionBtn({
  name,
  onClick,
  isSelected,
}: ListOccasionBtnProps) {
  return (
    <button
      className={`btn font-medium ${isSelected ? "bg-secondary text-white" : "bg-[#c7c799] text-[#46500c]"} hover:bg-secondary hover:text-white border-none rounded-none`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
