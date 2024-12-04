"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Logo from "../../assets/logo.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { User } from "../../../constants/types/user.type";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const path = usePathname();

  const isActive = (href: string) =>
    path === href
      ? "active font-medium text-lg text-secondary"
      : "font-medium text-black text-lg hover:text-secondary";

  return (
    <div className="navbar bg-primary px-8">
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
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
            <Link href="/recipes" className={isActive("/recipes")}>
              Recipes
            </Link>
            <Link href="/blog" className={isActive("/blog")}>
              Blog
            </Link>
            <Link href="/subscriptions" className={isActive("/cart")}>
              Subscriptions
            </Link>
            {!session && (
              <Link href="/login" className={isActive("/login")}>
                Login
              </Link>
            )}
          </div>
        </div>
        <Link className="normal-case text-xl font-medium text-black" href="/">
          <Image src={Logo} alt="Logo" width={75} height={75} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex gap-x-8">
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
        <Link href="/recipes" className={isActive("/recipes")}>
          Recipes
        </Link>
        {session?.user?.subscription != null && (
          <Link href="/blog" className={isActive("/blog")}>
            Blog
          </Link>
        )}
      </div>
      <div className="navbar-end gap-x-8">
        {session ? (
          <div className="flex items-center gap-x-2">
            <p className="text-black">
              Welcome, {(session.user as User)!.fullName}
            </p>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost m-0 p-0">
                <TiArrowSortedDown className="w-5 h-5 text-black" />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link href="/account">
                    <button className="bg-white text-black w-full text-left">
                      Account
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/subscriptions">
                    <button className="bg-white text-black w-full text-left">
                      My Subscriptions
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    className="bg-white text-black w-full text-left"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link href="/login" className={isActive("/login")}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
