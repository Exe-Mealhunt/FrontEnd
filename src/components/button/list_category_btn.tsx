import React from "react";

type CategoryBtnProps = {
  title: string;
};

export default function CategoryBtn({ title }: CategoryBtnProps) {
  return (
    <button className="btn bg-[#c7c799] font-medium hover:bg-secondary hover:text-white text-[#46500c] border-none rounded-none ">
      {title}
    </button>
  );
}
