"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Logo from "../../assets/logo.png";

export default function Header() {
  const path = usePathname();

  const isActive = (href: string) =>
    path === href ? "active text-secondary" : "text-black hover:text-secondary";

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <div
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <a href="/" className={isActive("/")}>
              Home
            </a>
            <a href="/recipes" className={isActive("/recipes")}>
              Recipes
            </a>
            <a href="/about" className={isActive("/about")}>
              About
            </a>
            <a href="/cart" className={isActive("/cart")}>
              Cart
            </a>
            <a href="/login" className={isActive("/login")}>
              Login
            </a>
          </div>
        </div>
        <a className="normal-case text-xl text-black" href="/">
        <Image
          src={Logo}
          alt="Picture of the author"
          width={75}
          height={75}
        />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex gap-x-8">
        <a href="/" className={isActive("/")}>
          Home
        </a>
        <a href="/recipes" className={isActive("/recipes")}>
          Recipes
        </a>
        <a href="/about" className={isActive("/about")}>
          About
        </a>
      </div>
      <div className="navbar-end gap-x-8">
        <a href="/cart" className={isActive("/cart")}>
          Cart
        </a>
        <a href="/login" className={isActive("/login")}>
          Login
        </a>
      </div>
    </div>
  );
}
