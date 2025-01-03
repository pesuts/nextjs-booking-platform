"use client";

import InputForm from "@/components/InputForm";
import { useToast } from "@/context/ToastContext";
import isValidEmail from "@/lib/emailValidate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const showToast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  const [name, setName] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [rePassword, setRePassword] = useState<string | undefined>(undefined);
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);
  const [rePasswordErrorMessage, setRePasswordErrorMessage] = useState<
    string | null
  >(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email,
      name,
      password,
    };
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resBody: {
      error: boolean;
      status: number;
      message: string;
    } = await res.json();
    showToast(
      resBody.error ? "error" : "success",
      resBody.error ? "Error" : "Success",
      resBody.message
    );
    if (!resBody.error) {
      setEmail("");
      setPassword("");
      setRePassword("");
      setName("");
      router.push("/");
    } else {
      setEmail("");
      return;
    }
  };

  const handleName = (value: string) => {
    setName(value);
  };
  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleRePassword = (value: string) => {
    setRePassword(value);
  };

  useEffect(() => {
    if (email && !isValidEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email not valid!");
      return;
    }
    setEmailError(false);
    setEmailErrorMessage(null);
  }, [email]);

  useEffect(() => {
    if (password && password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Must be atleast 8 characters");
      return;
    }
    if (rePassword && rePassword.length >= 8 && password !== rePassword) {
      setPasswordError(true);
      setPasswordErrorMessage("Password Not Match");
      return;
    }
    if (password === rePassword) {
      setRePasswordError(false);
      setRePasswordErrorMessage(null);
    }
    setPasswordError(false);
    setPasswordErrorMessage(null);
  }, [password]);

  useEffect(() => {
    console.log("panjang re : ", rePassword?.length);
    if (rePassword && rePassword.length < 8) {
      setRePasswordError(true);
      setRePasswordErrorMessage("Must be atleast 8 characters");
      return;
    }
    if (password && password.length >= 8 && password !== rePassword) {
      setRePasswordError(true);
      setRePasswordErrorMessage("Password Not Match");
      return;
    }
    if (password === rePassword) {
      setPasswordError(false);
      setPasswordErrorMessage(null);
    }
    setRePasswordError(false);
    setRePasswordErrorMessage(null);
  }, [rePassword]);

  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-6 bg-[url('/images/regist-bg.png')] bg-cover flex items-center justify-center flex-col">
        <div className="text-center w-7/12">
          <h1 className="text-ell-900 text-3xl font-bold mb-3 text-left">
            Sign up
          </h1>
          <form className="text-sm" onSubmit={handleSubmit}>
            <div className="text-left py-1">
              <InputForm
                label="Name"
                name="name"
                required={true}
                requiredSymbol={true}
                inputClass="py-1.5"
                handler={handleName}
              />
            </div>
            <div className="text-left py-1">
              <InputForm
                label="Email"
                name="email"
                type="email"
                value={email}
                required={true}
                requiredSymbol={true}
                inputClass="py-1.5"
                handler={handleEmail}
                error={emailError}
                errorMessage={emailErrorMessage}
              />
            </div>
            <div className="text-left py-1">
              <InputForm
                label="Password"
                name="password"
                type="password"
                value={password}
                autoComplete="new-password"
                placeholder="Create a password"
                required={true}
                requiredSymbol={true}
                inputClass="py-1.5"
                addLabel="Must be atleast 8 characters."
                handler={handlePassword}
                error={passwordError}
                errorMessage={passwordErrorMessage}
              />
            </div>
            <div className="text-left py-1">
              <InputForm
                label="Repeat Password"
                name="repassword"
                type="password"
                value={rePassword}
                autoComplete="new-password"
                placeholder="Repeat password"
                required={true}
                requiredSymbol={true}
                inputClass="py-1.5"
                addLabel="Must be atleast 8 characters."
                handler={handleRePassword}
                error={rePasswordError}
                errorMessage={rePasswordErrorMessage}
              />
            </div>
            <button
              type="submit"
              disabled={emailError || passwordError || rePasswordError}
              className="bg-ell-900 text-white py-2 text-center w-full mt-4 mb-2 rounded-md hover:bg-ell-950"
            >
              Create Account
            </button>
            <div className="flex items-center justify-center gap-3 mb-2 mt-1 w-full">
              <button className="w-full flex items-center justify-center gap-2 py-2 outline outline-1 hover:outline-2 outline-ell-900 rounded-md hover:bg-slate-200">
                <FcGoogle size={25} />
                <p>Sign up with Google</p>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 outline outline-1 hover:outline-2 outline-ell-900 rounded-md hover:bg-slate-200">
                <FaFacebook size={25} color="#1877F2" />
                <p>Sign up with Facebook</p>
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p>Already have an account?</p>
              <Link
                href={"/login"}
                className="text-ell-900 px-1 hover:font-semibold"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
        <div className="text-form w-full px-16 mt-6 select-none text-sm">
          <div className="flex justify-between">
            <p>&copy;ErasmusLifeHousing</p>
            <div className="flex items-center">
              <MdEmail />
              <p>help@erasmuslifehousing.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 bg-[url('/images/register.png')] bg-cover"></div>
    </div>
  );
};

export default Login;
