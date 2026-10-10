
'use client';

import React from 'react';
import { useField } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  isTextArea = false,
  rows = 3,
  icon: Icon,
  className = '',
  ...props
}) {
  const [field, meta] = useField(name);

  const hasError = Boolean(meta?.touched && meta?.error);
  const errorId = `${name}-error`;

  const baseInputStyles = `
    block w-full min-w-0 rounded-lg border
    bg-white dark:bg-slate-950
    px-3 py-2.5
    text-sm font-sans
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    shadow-sm
    transition-colors duration-200
    focus:outline-none focus:ring-2
    disabled:cursor-not-allowed
    disabled:bg-slate-100 disabled:text-slate-500
    dark:disabled:bg-slate-800 dark:disabled:text-slate-400
    ${
      hasError
        ? `
          border-red-500 dark:border-red-500
          focus:border-red-500 focus:ring-red-500/20
        `
        : `
          border-slate-300 dark:border-slate-700
          hover:border-slate-400 dark:hover:border-slate-600
          focus:border-blue-500 dark:focus:border-blue-500
          focus:ring-blue-500/20
        `
    }
  `;

  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span
            aria-hidden="true"
            className={`
              pointer-events-none absolute left-3
              text-slate-500 dark:text-slate-400
              ${isTextArea ? 'top-3' : 'top-1/2 -translate-y-1/2'}
            `}
          >
            <Icon size={18} />
          </span>
        )}

        {isTextArea ? (
          <textarea
            {...field}
            {...props}
            id={name}
            rows={rows}
            placeholder={placeholder}
            value={field.value ?? ''}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`
              ${baseInputStyles}
              ${Icon ? 'pl-10' : ''}
              resize-y
            `}
          />
        ) : (
          <input
            {...field}
            {...props}
            id={name}
            type={type}
            placeholder={placeholder}
            value={field.value ?? ''}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`
              ${baseInputStyles}
              ${Icon ? 'pl-10' : ''}
            `}
          />
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-0.5 flex items-start gap-1 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {meta.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

