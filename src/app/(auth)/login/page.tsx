"use client";

import InputForm from "@/components/InputForm";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login(){
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-5 bg-[url('/images/login.png')] bg-cover"></div>
      <div className="col-span-7 flex items-center justify-center">
        <div className="text-center w-7/12">
          <Image
            src={"/images/logo.svg"}
            className="mx-auto"
            alt="Logo"
            width={200}
            height={200}
          ></Image>
          <h1 className="text-ell-900 text-3xl font-bold mt-2">Log in</h1>
          <p className="mt-2 mb-4">Welcome back! Please enter your details.</p>
          <form >
            <div className="text-left py-2">
              <InputForm
                label="Email"
                name="email"
                type="email"
                required={true}
                inputClass="py-1.5"
              />
            </div>
            <div className="text-left py-2">
              <InputForm
                label="Password"
                name="password"
                type="password"
                required={true}
                inputClass="py-1.5"
              />
            </div>
            <div className="flex justify-between text-sm px-2">
              <div className="flex hover:bg-slate-200 rounded-md">
                <input type="checkbox" name="remember" id="remember" />
                <label
                  htmlFor="remember"
                  className="px-2 text-form cursor-pointer"
                >
                  Remember for 30 days
                </label>
              </div>
              <Link href={"#"} className="text-ell-900 hover:font-bold">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-ell-900 text-white py-2 text-center w-full mt-4 mb-2 rounded-md hover:bg-ell-950"
            >
              Sign In
            </button>
            <div className="flex items-center justify-center gap-3 mb-2 mt-1 w-full">
              <button className="w-full flex items-center justify-center gap-2 py-2 outline outline-1 hover:outline-2 outline-ell-900 rounded-md hover:bg-slate-200">
                <FcGoogle size={25} />
                <p>Login with Google</p>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 outline outline-1 hover:outline-2 outline-ell-900 rounded-md hover:bg-slate-200">
                <FaFacebook size={25} color="#1877F2" />
                <p>Login with Facebook</p>
              </button>
            </div>
            <div className="flex items-center justify-center mb-8">
              <p>Don&apos;t have an account?</p>
              <Link
                href={"/register"}
                className="text-ell-900 px-1 hover:font-semibold"
              >
                Sign up
              </Link>
            </div>
          </form>
          <div className="text-form">&copy;ErasmusLifeHousing</div>
        </div>
      </div>
    </div>
  );
};
