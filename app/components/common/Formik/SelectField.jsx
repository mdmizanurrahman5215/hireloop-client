
'use client';

import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

export default function SelectField({
  label,
  name,
  options = [],
  placeholder = 'Select an option...',
  required = false,
  isMulti = false,
  className = '',
}) {
  const [field, meta, helpers] = useField(name);

  const hasError = Boolean(meta?.touched && meta?.error);
  const errorId = `${name}-error`;

  const customSelectStyles = {
    container: (base) => ({
      ...base,
      width: '100%',
    }),

    control: (base, state) => ({
      ...base,
      minHeight: '44px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0.5rem',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': {
        border: 'none',
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: '2px 12px',
      gap: '4px',
    }),

    indicatorsContainer: (base) => ({
      ...base,
      paddingRight: '6px',
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--select-placeholder)',
      '&:hover': {
        color: 'var(--select-text)',
      },
    }),

    clearIndicator: (base) => ({
      ...base,
      color: 'var(--select-placeholder)',
      '&:hover': {
        color: '#ef4444',
      },
    }),

    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: 'var(--select-menu-border)',
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--select-menu-bg)',
      border: '1px solid var(--select-menu-border)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
      zIndex: 50,
    }),

    menuList: (base) => ({
      ...base,
      padding: '4px',
      maxHeight: '220px',
    }),

    option: (base, state) => ({
      ...base,
      borderRadius: '0.375rem',
      marginBottom: '2px',
      padding: '10px 12px',
      fontSize: '0.875rem',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: state.isSelected
        ? '#2563eb'
        : state.isFocused
        ? 'var(--select-option-hover)'
        : 'transparent',
      color: state.isSelected
        ? '#ffffff'
        : 'var(--select-text)',
      '&:active': {
        backgroundColor: state.isSelected
          ? '#2563eb'
          : 'var(--select-option-active)',
      },
    }),

    singleValue: (base) => ({
      ...base,
      color: 'var(--select-text)',
      fontSize: '0.875rem',
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--select-option-hover)',
      borderRadius: '0.375rem',
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--select-text)',
      fontSize: '0.8125rem',
      padding: '4px 6px',
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--select-placeholder)',
      borderRadius: '0 0.375rem 0.375rem 0',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: '#ffffff',
      },
    }),

    placeholder: (base) => ({
      ...base,
      color: 'var(--select-placeholder)',
      fontSize: '0.875rem',
    }),

    input: (base) => ({
      ...base,
      color: 'var(--select-text)',
      fontSize: '0.875rem',
    }),

    noOptionsMessage: (base) => ({
      ...base,
      color: 'var(--select-placeholder)',
      fontSize: '0.875rem',
    }),
  };

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

      <div
        className={`
          min-w-0 rounded-lg border
          bg-white dark:bg-slate-950
          transition-colors duration-200
          ${
            hasError
              ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
          }
          [--select-menu-bg:#ffffff]
          [--select-menu-border:#e2e8f0]
          [--select-option-hover:#f1f5f9]
          [--select-option-active:#e2e8f0]
          [--select-text:#0f172a]
          [--select-placeholder:#64748b]
          dark:[--select-menu-bg:#0f172a]
          dark:[--select-menu-border:#334155]
          dark:[--select-option-hover:#1e293b]
          dark:[--select-option-active:#334155]
          dark:[--select-text:#f1f5f9]
          dark:[--select-placeholder:#94a3b8]
        `}
      >
        <Select
          inputId={name}
          instanceId={name}
          name={field.name}
          options={options}
          isMulti={isMulti}
          value={field.value ?? (isMulti ? [] : null)}
          onChange={(option) => helpers.setValue(option)}
          onBlur={() => helpers.setTouched(true)}
          placeholder={placeholder}
          styles={customSelectStyles}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          classNamePrefix="application-select"
          noOptionsMessage={() => 'No options available'}
        />
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-0.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            {meta.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

