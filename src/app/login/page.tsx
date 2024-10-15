"use client";
import Image from "next/image";
import logoImg from "../../assets/login_image.jpg";
import Link from "next/link";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!userInfo.email || !userInfo.password) {
      setError("Please enter both email and password.");
      return;
    }

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (res && res.error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="h-screen bg-primary relative">
      <Image src={logoImg} alt="login" fill className="object-cover" />
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
        <form
          className="w-full max-w-md bg-primary p-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-medium text-center mb-6 text-black">
            Login
          </h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-center mb-6">
            <span className="font-medium text-sm text-black">
              Don&apos;t have an account?
            </span>
            <Link
              href="/register"
              className="font-medium text-sm text-blue-500 hover:text-blue-800"
            >
              Sign up
            </Link>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-secondary hover:bg-[#4CAF50] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>

            <a
              className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
