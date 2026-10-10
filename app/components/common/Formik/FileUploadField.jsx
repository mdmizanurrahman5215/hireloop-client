
'use client';

import React, { useState } from 'react';
import { useField } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  CheckCircle,
  X,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function FileUploadField({
  label,
  name,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  required = false,
  className = '',
}) {
  const [field, meta, helpers] = useField(name);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  const hasError = Boolean(
    meta?.touched && (meta?.error || fileError)
  );

  const errorMessage = fileError || meta?.error;

  const validateAndSetFile = (file) => {
    if (!file) return;

    setFileError('');

    // File size check (MB to Bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      setFileError(`File size exceeds ${maxSizeMB}MB limit`);
      helpers?.setTouched(true);
      return;
    }

    helpers?.setValue(file);
    helpers?.setTouched(true);
  };

  const handleFileChange = (event) => {
    const file = event?.currentTarget?.files?.[0];

    validateAndSetFile(file);

    // Allow selecting the same file again after removing it.
    event.currentTarget.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];

    validateAndSetFile(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    helpers?.setValue(null);
    helpers?.setTouched(false);
    setFileError('');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
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

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          rounded-xl border-2 border-dashed p-4 text-center
          transition-colors duration-200
          ${
            hasError
              ? 'border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-950/30'
              : isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
              : 'border-slate-300 bg-slate-50 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-500'
          }
        `}
      >
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={handleFileChange}
          onBlur={() => helpers?.setTouched(true)}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {field?.value ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left dark:border-slate-700 dark:bg-slate-900">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <FileText size={20} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {field.value.name}
                </span>

                <span className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {(
                    field.value.size /
                    (1024 * 1024)
                  ).toFixed(2)}{' '}
                  MB
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <CheckCircle
                size={18}
                className="text-emerald-600 dark:text-emerald-400"
              />

              <button
                type="button"
                onClick={handleRemoveFile}
                className="rounded-md p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                aria-label="Remove uploaded file"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={name}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg px-3 py-5 outline-none focus-within:ring-2 focus-within:ring-blue-500"
          >
            <div
              className={`
                flex h-12 w-12 items-center justify-center rounded-full
                ${
                  isDragging
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }
              `}
            >
              <Upload size={22} />
            </div>

            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {isDragging
                ? 'Drop your file here'
                : 'Click to upload or drag and drop'}
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {accept.toUpperCase().replace(/\./g, ' ')}
              {' '}(Max {maxSizeMB}MB)
            </span>
          </label>
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMessage}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

