import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const CATEGORIES = ['General', 'Work', 'Personal', 'Study', 'Health', 'Finance'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export const TaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    priority: 'Low',
    deadline: '',
    tags: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    onSubmit({
      title: formData.title.trim(),
      category: formData.category,
      priority: formData.priority,
      deadline: formData.deadline || null,
      tags: tagsArray,
    });

    setFormData({
      title: '',
      category: 'General',
      priority: 'Low',
      deadline: '',
      tags: '',
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>
        {onCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Input
            label="Task Title *"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {PRIORITIES.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        <div>
          <Input
            label="Deadline"
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Tags"
            type="text"
            value={formData.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
            placeholder="work, urgent, project (comma separated)"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-1 flex items-end">
          <Button 
            type="submit" 
            variant="success"
            className="w-full"
          >
            <Plus size={20} className="mr-2" />
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};