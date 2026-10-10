import React from 'react';
import { Formik, Form } from 'formik';

export default function FormikForm({
  initialValues = {},
  validationSchema,
  validate,
  onSubmit,
  children,
  className = 'space-y-4',
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={async (values, helpers) => {
        try {
          if (typeof onSubmit === 'function') {
            await onSubmit(values, helpers);
          }
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }}
    >
      {(formikProps) => (
        <Form className={className} noValidate>
          {typeof children === 'function' ? children(formikProps) : children}
        </Form>
      )}
    </Formik>
  );
}