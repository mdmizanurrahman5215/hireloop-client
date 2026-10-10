import React from 'react';
import { Code, Layout, Cpu, Eye } from 'lucide-react';

const iconMap = {
  Figma: Layout,
  System: Cpu,
  UIUX: Eye,
  Frontend: Code,
};

export default function JobRequirementsList({ skills = [], bulletPoints = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Requirements</h3>

      {/* Skill Tags */}
      {skills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill?.iconKey] || Code;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
              >
                <IconComponent size={14} className="text-slate-500 dark:text-slate-400" />
                <span>{skill?.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Bullet Points */}
      {bulletPoints?.length > 0 && (
        <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bulletPoints.map((point, index) => (
            <li key={index} className="marker:text-slate-400 dark:marker:text-slate-500">
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}