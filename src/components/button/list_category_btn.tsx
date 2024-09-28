import React from "react";

type categoryBtn = {
  title: string;
};

export default function ListCategoryBtn(categoryBtn: categoryBtn) {
  return (
    <button className="btn bg-[#c7c799] text-lg hover:bg-secondary hover:text-white text-[#46500c] border-none">
      {categoryBtn.title}
    </button>
  );
}
