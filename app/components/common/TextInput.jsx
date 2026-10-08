import FieldError from "./FieldError";

export default function TextInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
  touched,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}

        {required && (
          <span className="ml-1 text-rose-500">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-slate-100 ${
          error && touched
            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-800"
        }`}
      />

      <FieldError error={error} touched={touched} />
    </div>
  );
}