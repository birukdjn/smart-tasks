// src/components/MobileTaskView.jsx
import { useState } from 'react';
import { Swipeable } from 'react-swipeable';
import { CheckCircle, Clock, Flag, User, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

const MobileTaskView = ({ tasks, onStatusChange, onEditTask, onDeleteTask }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState('list'); // 'list' or 'board'

  const filteredTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    review: tasks.filter(task => task.status === 'review'),
    done: tasks.filter(task => task.status === 'done')
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSwipe = (dir) => {
    if (dir === 'Left' && currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dir === 'Right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextStatus = (currentStatus) => {
    const statusFlow = ['todo', 'inProgress', 'review', 'done'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return statusFlow[(currentIndex + 1) % statusFlow.length];
  };

  if (view === 'board') {
    return (
      <div className="p-4 space-y-4">
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My Tasks</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                view === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView('board')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                view === 'board' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              Board
            </button>
          </div>
        </div>

        {/* Mobile Board View */}
        <div className="space-y-6">
          {Object.entries(filteredTasks).map(([status, statusTasks]) => (
            <div key={status} className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 capitalize">
                  {status.replace(/([A-Z])/g, ' $1')} ({statusTasks.length})
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {statusTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm flex-1">{task.title}</h4>
                      <button className="text-gray-400 hover:text-gray-600 ml-2">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                      {task.description}
                    </p>

                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => onStatusChange(task.id, nextStatus(task.status))}
                        className="p-1 bg-blue-600 text-white rounded-full"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="p-4">
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Tasks</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView('board')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              view === 'board' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Board
          </button>
        </div>
      </div>

      {/* Swipeable Task List */}
      <Swipeable
        onSwipedLeft={() => handleSwipe('Left')}
        onSwipedRight={() => handleSwipe('Right')}
        className="relative"
      >
        <div className="bg-white rounded-lg shadow-sm border p-4">
          {/* Task Progress */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {tasks.length}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="p-1 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentIndex(Math.min(tasks.length - 1, currentIndex + 1))}
                disabled={currentIndex === tasks.length - 1}
                className="p-1 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {tasks[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {tasks[currentIndex].description}
                  </p>

                  {tasks[currentIndex].tags && tasks[currentIndex].tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tasks[currentIndex].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Flag className={`h-4 w-4 mr-1 ${
                        tasks[currentIndex].priority === 'high' ? 'text-red-500' :
                        tasks[currentIndex].priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      {tasks[currentIndex].priority}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(tasks[currentIndex].dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {tasks[currentIndex].assignee}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-between space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onStatusChange(tasks[currentIndex].id, 'todo')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                    tasks[currentIndex].status === 'todo' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  To Do
                </button>
                <button
                  onClick={() => onStatusChange(tasks[currentIndex].id, 'inProgress')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                    tasks[currentIndex].status === 'inProgress' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => onStatusChange(tasks[currentIndex].id, 'done')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                    tasks[currentIndex].status === 'done' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </Swipeable>

      {/* Swipe Hint */}
      <div className="text-center text-xs text-gray-500 mt-4">
        Swipe left/right to navigate tasks
      </div>
    </div>
  );
};

export default MobileTaskView;