import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SectionGrid({ sections, extinguishers }) {
  const navigate = useNavigate();

  const counts = (name) => {
    const list = extinguishers.filter(e => e.section === name);
    const unchecked = list.filter(e => e.status === 'pending').length;
    const checked = list.length - unchecked;
    return { total: list.length, checked, unchecked };
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {sections.map((name) => {
        const { total, checked, unchecked } = counts(name);
        return (
          <button
            key={name}
            onClick={() => navigate(`section/${encodeURIComponent(name)}`)}
            className="p-4 rounded-xl border bg-white shadow hover:shadow-md text-left"
          >
            <div className="font-semibold text-lg">{name}</div>
            <div className="mt-2 text-sm text-gray-600">Total: {total}</div>
            <div className="text-sm text-green-600">Checked: {checked}</div>
            <div className="text-sm text-amber-600">Unchecked: {unchecked}</div>
          </button>
        );
      })}
    </div>
  );
}

