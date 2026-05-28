import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export default function FormInput({ name, label, type = "text", placeholder = "", }) {
  const { register, formState: { errors }, } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="utah-label">
        {label}
        <span className="text-utah-terracotta"> *</span>
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`utah-input ${error ? "error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
      />

      <div id={`${name}-error`}>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
}