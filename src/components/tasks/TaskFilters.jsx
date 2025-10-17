import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const CATEGORIES = ['All', 'General', 'Work', 'Personal', 'Study', 'Health', 'Finance'];
const PRIORITIES = ['All', 'High', 'Medium', 'Low'];
const STATUS_OPTIONS = [
  { value: 'all', label: 'All', countKey: 'total' },
  { value: 'incomplete', label: 'Active', countKey: 'active' },
  { value: 'completed', label: 'Completed', countKey: 'completed' },
  { value: 'overdue', label: 'Overdue', countKey: 'overdue' },
];

export const TaskFilters = ({ 
  filters, 
  onFiltersChange, 
  stats,
  onClearFilters 
}) => {
  const { search, category, priority, status } = filters;

  const activeFiltersCount = [
    search.trim() !== '',
    category !== 'All',
    priority !== 'All',
    status !== 'all'
  ].filter(Boolean).length;

  const handleFilterChange = (filterName, value) => {
    onFiltersChange({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              value={search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search tasks or tags..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {PRIORITIES.map(pri => (
              <option key={pri} value={pri}>{pri}</option>
            ))}
          </select>

          {activeFiltersCount > 0 && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="md"
            >
              <X size={16} className="mr-2" />
              Clear Filters ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {STATUS_OPTIONS.map(({ value, label, countKey }) => (
          <Button
            key={value}
            onClick={() => handleFilterChange('status', value)}
            variant={status === value ? 'primary' : 'outline'}
            size="sm"
          >
            {label} ({stats[countKey]})
          </Button>
        ))}
      </div>
    </div>
  );
};