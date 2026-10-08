"use client";

import Select from "react-select";

export default function SelectField({
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  touched,
  required = false,
}) {
  const selectId = name || "select-field";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={`${selectId}-input`}
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {label}

          {required && (
            <span className="ml-1 text-rose-500">*</span>
          )}
        </label>
      )}

      <Select
        instanceId={selectId}
        inputId={`${selectId}-input`}
        name={selectId}
        value={value || null}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isSearchable
        classNamePrefix="hireloop-select"
        styles={selectStyles}
      />

      {error && touched && (
        <p className="mt-1.5 text-xs font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
}

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "46px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",
    backgroundColor: "#ffffff",
    boxShadow: state.isFocused
      ? "0 0 0 1px #2563eb"
      : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),

  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: "0.75rem",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  }),

  menuList: (base) => ({
    ...base,
    padding: "6px",
  }),

  option: (base, state) => ({
    ...base,
    color: "#0f172a",
    backgroundColor: state.isSelected
      ? "#dbeafe"
      : state.isFocused
      ? "#f1f5f9"
      : "#ffffff",
    cursor: "pointer",
    borderRadius: "0.5rem",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#0f172a",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#64748b",
  }),

  input: (base) => ({
    ...base,
    color: "#0f172a",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "2px 12px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#64748b",
  }),
};