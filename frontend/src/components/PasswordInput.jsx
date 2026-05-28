import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M1 9C1 9 4 3 9 3C14 3 17 9 17 9C17 9 14 15 9 15C4 15 1 9 1 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="9"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M2 2L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 4.2C8 4.07 8.49 4 9 4C14 4 17 9 17 9C16.6 9.7 16.1 10.38 15.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.7 13.7C10.16 13.9 9.59 14 9 14C4 14 1 9 1 9C1.9 7.47 3.07 6.16 4.4 5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.6 6.6A2.5 2.5 0 0 0 11.4 11.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PasswordInput({ name, label, placeholder = "" }) {
  const [showPassword, setShowPassword] = useState(false);

  const { register, formState: { errors }, } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col mb-5">
      <label htmlFor={name} className="utah-label">
        {label}
        <span className="text-utah-terracotta"> *</span>
      </label>

      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`utah-input ${error ? "error" : ""} pr-11`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 border-none bg-transparent cursor-pointer flex items-center text-utah-muted p-1 transition-colors hover:text-utah-terracotta"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      <div id={`${name}-error`}>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
}