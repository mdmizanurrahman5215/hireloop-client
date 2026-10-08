import * as Yup from "yup";
export const validationSchema = Yup.object({
  jobTitle: Yup.string()
    .trim()
    .required("Job title is required")
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must not exceed 100 characters"),

  category: Yup.object()
    .nullable()
    .required("Job category is required"),

  jobType: Yup.object()
    .nullable()
    .required("Job type is required"),

  salaryMin: Yup.number()
    .typeError("Minimum salary must be a number")
    .required("Minimum salary is required")
    .min(0, "Salary cannot be negative"),

  salaryMax: Yup.number()
    .typeError("Maximum salary must be a number")
    .required("Maximum salary is required")
    .min(0, "Salary cannot be negative")
    .test(
      "greater-than-min",
      "Maximum salary must be greater than or equal to minimum salary",
      function (value) {
        const { salaryMin } = this.parent;

        if (!value || !salaryMin) {
          return true;
        }

        return Number(value) >= Number(salaryMin);
      }
    ),

  currency: Yup.object()
    .nullable()
    .required("Currency is required"),

  city: Yup.string().when("remote", {
    is: false,
    then: (schema) =>
      schema
        .trim()
        .required("City is required")
        .max(100, "City name is too long"),
    otherwise: (schema) => schema.notRequired(),
  }),

  country: Yup.string().when("remote", {
    is: false,
    then: (schema) =>
      schema
        .trim()
        .required("Country is required")
        .max(100, "Country name is too long"),
    otherwise: (schema) => schema.notRequired(),
  }),

  applicationDeadline: Yup.string()
    .required("Application deadline is required")
    .test(
      "future-date",
      "Application deadline must be a future date",
      function (value) {
        if (!value) {
          return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(`${value}T00:00:00`);

        return selectedDate >= today;
      }
    ),

  responsibilities: Yup.string()
    .trim()
    .required("Responsibilities are required")
    .min(20, "Please provide more details about responsibilities"),

  requirements: Yup.string()
    .trim()
    .required("Requirements are required")
    .min(20, "Please provide more details about requirements"),

  benefits: Yup.string().trim().notRequired(),
});