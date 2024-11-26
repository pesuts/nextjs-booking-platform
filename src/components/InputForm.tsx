"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputForm({
  label,
  addLabel,
  type = "text",
  labelClass,
  inputClass,
  placeholder,
  required = false,
  requiredSymbol = false,
  name,
}: {
  label?: string;
  addLabel?: string;
  type?: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  required?: boolean;
  requiredSymbol?: boolean;
  name: string;
}) {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

    useEffect(() => {
    if (passwordShow) {
      setTimeout(() => {
        setPasswordShow(false);
      }, 6000)
    }
  }, [passwordShow])

  return (
    <>
      <label htmlFor={name} className={`inline-block ${labelClass}`}>
        {label}
        {requiredSymbol && <span className="text-red-900">*</span>}
      </label>
      <div className="relative">
        <input
          type={passwordShow ? "text" : type}
          required={required}
          name={name}
          id={name}
          className={`block w-full px-4 py-2 my-2 rounded-md text-form outline outline-1 outline-form/30 bg-white focus:bg-slate-100 focus:border-2 focus:border-ell-800 ${inputClass}`}
          placeholder={placeholder ?? `Enter your ${name?.toLowerCase()}`}
        />
        {type === "password" && (
          <span
            onClick={() => setPasswordShow((state) => !state)}
            className="absolute right-6 top-[20%] cursor-pointer opacity-80 hover:opacity-100"
          >
            {passwordShow ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        )}
      </div>
      {addLabel && <p className="text-slate-500 text-sm -mt-2">{addLabel}</p>}
    </>
  );
}