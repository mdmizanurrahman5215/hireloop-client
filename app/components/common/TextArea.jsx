'use client';

import { useEffect, useRef } from "react";
import FieldError from "./FieldError";

export default function TextArea({
  label,
  name,
  value = "",
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false,
  minRows = 2, // ডিফল্ট ২ সারির থাকবে
}) {
  const textareaRef = useRef(null);

  // টেক্সট পরিবর্তনের সাথে সাথে অটো-হাইট অ্যাডজাস্ট করার ইফেক্ট
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // উচ্চতা রিসেট করে কন্টেন্টের প্রকৃত scrollHeight গণনা করা হচ্ছে
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}

      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={minRows}
        placeholder={placeholder}
        className={`w-full resize-none overflow-hidden rounded-xl border bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-950 dark:text-slate-100 ${
          error && touched
            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-800"
        }`}
      />

      <FieldError error={error} touched={touched} />
    </div>
  );
}