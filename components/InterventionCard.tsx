
import React from 'react';
import { Intervention } from '../types';

interface Props {
  intervention: Intervention;
}

const InterventionCard: React.FC<Props> = ({ intervention }) => {
  const getColors = () => {
    switch (intervention.gradingType) {
      case 'DOWNGRADE': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'TARGET': return 'bg-green-50 border-green-200 text-green-800';
      case 'UPGRADE': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (intervention.gradingType) {
      case 'DOWNGRADE': return 'fa-arrow-down-long';
      case 'TARGET': return 'fa-bullseye';
      case 'UPGRADE': return 'fa-arrow-up-long';
    }
  };

  return (
    <div className={`border-l-4 p-6 rounded-r-xl shadow-sm border transition-all hover:shadow-md ${getColors()}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <i className={`fa-solid ${getIcon()} text-lg`}></i>
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest uppercase opacity-70">
            {intervention.gradingType}
          </span>
          <h3 className="text-xl font-bold leading-tight">{intervention.title}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed font-medium">
          {intervention.description}
        </p>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
            <i className="fa-solid fa-toolbox text-gray-400"></i> Materials
          </h4>
          <ul className="flex flex-wrap gap-2">
            {intervention.materials.map((m, i) => (
              <li key={i} className="bg-white/60 px-3 py-1 rounded-full text-sm border border-black/5 font-medium">
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/40 p-4 rounded-lg border border-black/5 italic text-sm">
          <span className="font-bold block not-italic mb-1 uppercase text-xs tracking-tighter text-gray-500">
            Clinical Rationale:
          </span>
          "{intervention.clinicalRationale}"
        </div>
      </div>
    </div>
  );
};

export default InterventionCard;
