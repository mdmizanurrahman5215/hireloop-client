'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';

export default function ModalContainer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'sm',
}) {
  return (
    <Dialog
      open={Boolean(isOpen)}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{
        paper: {
          className:
            'bg-white dark:bg-slate-900 !text-slate-900 dark:!text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden',
        },
        backdrop: {
          className: 'bg-slate-950/50 dark:bg-black/70',
        },
      }}
    >
      {title && (
        <DialogTitle
          className="!flex !items-center !justify-between !p-6 !border-b !border-slate-200 dark:!border-slate-800 !bg-white dark:!bg-slate-900"
        >
          <div className="min-w-0">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          <IconButton
            onClick={onClose}
            aria-label="Close modal"
            className="!ml-3 !shrink-0 !text-slate-500 hover:!bg-slate-100 hover:!text-slate-800 dark:!text-slate-400 dark:hover:!bg-slate-800 dark:hover:!text-white"
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent
        className="!p-6 !bg-white dark:!bg-slate-900 !text-slate-900 dark:!text-slate-100"
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}