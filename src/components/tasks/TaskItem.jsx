import React, { useState } from 'react';
import { GripVertical, Trash2, Check, X, Edit, Calendar, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatDeadline, isOverdue } from '../utils/dateUtils';

const PriorityBadge = ({ priority }) => {
  const priorityStyles = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityStyles[priority]}`}
    >
      {priority}
    </span>
  );
};

const DeadlineBadge = ({ deadline, completed }) => {
  if (!deadline) return null;

  const overdue = isOverdue(deadline, completed);
  
  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
        overdue
          ? 'bg-red-100 text-red-700'
          : completed
          ? 'bg-green-100 text-green-700'
          : 'bg-blue-100 text-blue-700'
      }`}
    >
      <Clock size={12} />
      {formatDeadline(deadline)}
    </span>
  );
};

export const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit, 
  onPriorityChange,
  dragHandleProps 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline || '');

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    
    const updates = { title: editedTitle.trim() };
    if (editedDeadline !== task.deadline) {
      updates.deadline = editedDeadline || null;
    }
    
    onEdit(task.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDeadline(task.deadline || '');
    setIsEditing(false);
  };

  const overdue = isOverdue(task.deadline, task.completed);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 border-2 rounded-xl transition-all duration-200 ${
        task.completed
          ? "bg-green-50 border-green-200"
          : overdue
          ? "bg-red-50 border-red-200"
          : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-200"
      }`}
    >
      {/* Left: Drag handle + Checkbox + Info */}
      <div className="flex items-start sm:items-center gap-3 flex-1">
        {dragHandleProps && (
          <div {...dragHandleProps} className="cursor-grab text-gray-400 hover:text-gray-600 active:text-blue-600 transition-colors">
            <GripVertical size={20} />
          </div>
        )}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-blue-600 mt-1 sm:mt-0 cursor-pointer hover:scale-110 transition-transform"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
                <Button 
                  onClick={handleSave} 
                  variant="success"
                  size="sm"
                >
                  <Check size={16} />
                </Button>
                <Button 
                  onClick={handleCancel} 
                  variant="danger"
                  size="sm"
                >
                  <X size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <input
                  type="datetime-local"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-300 outline-none"
                />
              </div>
            </div>
          ) : (
            <>
              <p
                className={`text-lg font-semibold break-words cursor-pointer transition-colors ${
                  task.completed ? "line-through text-gray-500" : "text-gray-800 hover:text-blue-700"
                }`}
                onDoubleClick={() => setIsEditing(true)}
                title="Double-click to edit"
              >
                {task.title}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg font-medium">
                  {task.category}
                </span>
                
                <PriorityBadge priority={task.priority} />
                <DeadlineBadge deadline={task.deadline} completed={task.completed} />
              </div>

              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {task.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 mt-3 sm:mt-0 sm:pl-4">
        <select
          value={task.priority}
          onChange={(e) => onPriorityChange(task.id, e.target.value)}
          className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="flex items-center gap-1">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
          
          <Button
            onClick={() => onDelete(task.id)}
            variant="danger"
            size="sm"
          >
            <Trash2 size={16} className="mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};