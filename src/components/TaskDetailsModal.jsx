// src/components/TaskDetailsModal.jsx
import { useState } from 'react';
import { 
  X, Calendar, User, Flag, Tag, Clock, MessageSquare, 
  Paperclip, Edit, Trash2, CheckCircle 
} from 'lucide-react';
import Comments from './Comments';
import FileAttachments from './FileAttachements';

const TaskDetailsModal = ({ isOpen, onClose, task, onSave, onDelete }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  if (!isOpen || !task) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-100';
      case 'inProgress': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSave = () => {
    onSave({ ...task, ...editData });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'details', name: 'Details', icon: Clock },
    { id: 'comments', name: 'Comments', icon: MessageSquare },
    { id: 'attachments', name: 'Attachments', icon: Paperclip }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title || task.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="text-lg font-semibold border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              )}
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                {isEditing ? (
                  <textarea
                    value={editData.description || task.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Assignee
                    </h3>
                    {isEditing ? (
                      <select
                        value={editData.assignee || task.assignee}
                        onChange={(e) => setEditData({ ...editData, assignee: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="You">You</option>
                        <option value="Sarah">Sarah</option>
                        <option value="Mike">Mike</option>
                        <option value="Emily">Emily</option>
                      </select>
                    ) : (
                      <p className="text-gray-600">{task.assignee}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Due Date
                    </h3>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dueDate || task.dueDate}
                        onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Flag className="w-4 h-4 mr-2" />
                      Priority
                    </h3>
                    {isEditing ? (
                      <select
                        value={editData.priority || task.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Tags
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.tags ? editData.tags.join(', ') : (task.tags ? task.tags.join(', ') : '')}
                        onChange={(e) => setEditData({ ...editData, tags: e.target.value.split(',').map(t => t.trim()) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter tags separated by commas"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {task.tags && task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <Comments taskId={task.id} />
          )}

          {activeTab === 'attachments' && (
            <FileAttachments taskId={task.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;