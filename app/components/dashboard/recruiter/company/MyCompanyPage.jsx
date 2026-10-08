'use client';

import { useState } from 'react';
import { Users, MapPin, Globe } from 'lucide-react';
import EmptyCompanyState from './EmptyCompanyState';
import RegisterCompanyModal from '../../../modals/RegisterCompanyModal';
import CompanyHero from './CompanyHero';
import ActiveRolesCard from './ActiveRolesCard';

export default function MyCompanyPage({ initialCompany }) {
  // Pass initialCompany from Server Component
  const [company, setCompany] = useState(initialCompany);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockRoles = [
    { title: 'Senior Distributed Systems Engineer', type: 'GCP / Remote', salary: '$180k - $210k' },
    { title: 'Product Design Lead', type: 'New York', salary: '$150k - $180k' },
    { title: 'DevOps Architect (Unreal)', type: 'Remote', salary: '$160k+' },
  ];

  const handleRegisterSuccess = (data) => {
    if (data) {
      setCompany(data);
    }
  };

  if (!company) {
    return (
      <>
        <EmptyCompanyState onOpenModal={() => setIsModalOpen(true)} />
        <RegisterCompanyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleRegisterSuccess}
        />
      </>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 transition-colors duration-200">
      {/* Hero Banner */}
      <CompanyHero company={company} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (About + Stats + Gallery) */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors duration-200">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              About {company?.name || 'Company'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {company?.description || 'No description provided for this company.'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm transition-colors duration-200">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              <div className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {company?.employeeCount || company?.employeesCount || 'N/A'}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                EMPLOYEES
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm transition-colors duration-200">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              <div className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {company?.location || 'N/A'}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                HEADQUARTERS
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2 shadow-sm transition-colors duration-200">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              <div className="text-xl font-bold text-slate-900 dark:text-white truncate">
                {company?.category || company?.presenceCount || 'N/A'}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                INDUSTRY
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Life at {company?.name || 'Company'}
              </h3>
              <button
                type="button"
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded"
              >
                View Gallery
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 h-48 rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src={company?.gallery?.[0] || company?.logo || '/images/office-1.jpg'}
                  alt="Office setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3 h-48">
                <div className="rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img
                    src={company?.gallery?.[1] || '/images/office-2.jpg'}
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img
                    src={company?.gallery?.[2] || '/images/office-3.jpg'}
                    alt="Workspace culture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <ActiveRolesCard roles={company?.activeRoles || mockRoles} />

          {/* Hiring Team Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors duration-200">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Hiring Team
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                <img
                  src={company?.hiringLead?.avatar || '/images/avatar.jpg'}
                  alt={company?.hiringLead?.name || 'Recruiter'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {company?.hiringLead?.name || company?.userEmail || 'Recruiter'}
                </h5>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
                  {company?.hiringLead?.role || 'Talent Acquisition'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Message Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}