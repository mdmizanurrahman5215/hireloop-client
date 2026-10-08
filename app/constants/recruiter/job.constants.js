
 export const categoryOptions = [
  {
    value: "software-development",
    label: "Software Development",
  },
  {
    value: "frontend-development",
    label: "Frontend Development",
  },
  {
    value: "backend-development",
    label: "Backend Development",
  },
  {
    value: "full-stack-development",
    label: "Full Stack Development",
  },
  {
    value: "mobile-development",
    label: "Mobile Development",
  },
  {
    value: "ui-ux-design",
    label: "UI/UX Design",
  },
  {
    value: "product-management",
    label: "Product Management",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "sales",
    label: "Sales",
  },
  {
    value: "finance",
    label: "Finance & Accounting",
  },
  {
    value: "human-resources",
    label: "Human Resources",
  },
  {
    value: "customer-support",
    label: "Customer Support",
  },
];
export const jobTypeOptions = [
  {
    value: "full-time",
    label: "Full-time",
  },
  {
    value: "part-time",
    label: "Part-time",
  },
  {
    value: "remote",
    label: "Remote",
  },
  {
    value: "contract",
    label: "Contract",
  },
  {
    value: "internship",
    label: "Internship",
  },
];

export const currencyOptions = [
  {
    value: "USD",
    label: "USD — US Dollar",
  },
  {
    value: "BDT",
    label: "BDT — Bangladeshi Taka",
  },
  {
    value: "EUR",
    label: "EUR — Euro",
  },
  {
    value: "GBP",
    label: "GBP — British Pound",
  },
  {
    value: "CAD",
    label: "CAD — Canadian Dollar",
  },
];
export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "46px",
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",
    backgroundColor: "#ffffff",
    boxShadow: state.isFocused
      ? "0 0 0 1px #2563eb"
      : "none",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 50,
    borderRadius: "0.75rem",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  }),

  option: (provided, state) => ({
    ...provided,
    color: "#0f172a",
    backgroundColor: state.isSelected
      ? "#dbeafe"
      : state.isFocused
      ? "#f1f5f9"
      : "#ffffff",
    cursor: "pointer",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#0f172a",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#64748b",
  }),

  input: (provided) => ({
    ...provided,
    color: "#0f172a",
  }),
};