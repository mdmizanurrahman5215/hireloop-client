'use client';

import React, { useState } from 'react';
import { useField } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, X, AlertCircle, FileText } from 'lucide-react';

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

  const hasError = Boolean(meta?.touched && (meta?.error || fileError));
  const errorMessage = fileError || meta?.error;

  const validateAndSetFile = (file) => {
    if (!file) return;
    setFileError('');

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
    event.currentTarget.value = '';
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    helpers?.setValue(null);
    helpers?.setTouched(false);
    setFileError('');
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); validateAndSetFile(e.dataTransfer?.files?.[0]); }}
        className={`relative flex items-center justify-between rounded-lg border px-3.5 py-3 transition-colors ${
          hasError
            ? 'border-red-400 bg-red-50/50 dark:border-red-500/50 dark:bg-red-950/20'
            : isDragging
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
        }`}
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
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <FileText size={16} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-medium text-slate-900 dark:text-slate-100">
                  {field.value.name}
                </span>
                <span className="text-[11px] text-slate-400">
                  {(field.value.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500" />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                aria-label="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={name}
            className="flex w-full cursor-pointer items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Upload size={16} />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                {isDragging ? 'Drop file here' : 'Choose a file or drag & drop'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {accept.toUpperCase().replace(/\./g, ' ')} ({maxSizeMB}MB max)
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
            className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle size={12} className="shrink-0" />
            <span>{errorMessage}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}