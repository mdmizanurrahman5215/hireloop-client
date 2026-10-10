
'use client';

import React from 'react';
import {
  User,
  Mail,
  Phone,
  Link as LinkIcon,
} from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';

import ModalContainer from '../modalContainer/ModalContainer';
import FormikForm from '../common/Formik/FormikForm';
import InputField from '../common/Formik/InputField';
import SelectField from '../common/Formik/SelectField';
import FileUploadField from '../common/Formik/FileUploadField';

const experienceOptions = [
  { value: '0-1', label: '0 - 1 Years' },
  { value: '1-3', label: '1 - 3 Years' },
  { value: '3-5', label: '3 - 5 Years' },
  { value: '5+', label: '5+ Years' },
];

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobData,
  onSubmit,
}) {
  const validate = (values) => {
    const errors = {};

    if (!values?.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!values?.email?.trim()) {
      errors.email = 'Email address is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        values?.email
      )
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values?.experience) {
      errors.experience = 'Experience level is required';
    }

    if (!values?.resume) {
      errors.resume = 'Resume is required';
    }

    return errors;
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for ${jobData?.title || 'Position'}`}
      subtitle={jobData?.company || 'CloudScale AI'}
    >
      <FormikForm
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          experience: null,
          portfolio: '',
          resume: null,
          coverLetter: '',
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (typeof onSubmit === 'function') {
              await onSubmit(values);
            }

            resetForm();
            onClose?.();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <div className="space-y-5 text-slate-900 dark:text-slate-100">
            <InputField
              label="Full Name"
              name="fullName"
              required
              icon={User}
              placeholder="John Doe"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              required
              icon={Mail}
              placeholder="john@example.com"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Phone"
                name="phone"
                icon={Phone}
                placeholder="+1 (555) 000-0000"
              />

              <SelectField
                label="Experience"
                name="experience"
                options={experienceOptions}
                required
              />
            </div>

            <InputField
              label="Portfolio URL"
              name="portfolio"
              icon={LinkIcon}
              placeholder="https://..."
            />

            <FileUploadField
              label="Resume"
              name="resume"
              required
            />

            <InputField
              label="Cover Letter"
              name="coverLetter"
              isTextArea
              rows={3}
              placeholder="Brief note..."
            />

            <div className="flex justify-end gap-3 pt-5 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  'Submit Application'
                )}
              </motion.button>
            </div>
          </div>
        )}
      </FormikForm>
    </ModalContainer>
  );
}

