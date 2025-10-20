// src/components/CalendarView.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarView = ({ tasks, onTaskCreate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthDays = getDaysInMonth(prevMonth);
    for (let i = prevMonthDays - firstDay + 1; i <= prevMonthDays; i++) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    for (let i = 1; days.length < totalCells; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const days = renderCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday = day.date.toDateString() === new Date().toDateString();
            const dayTasks = getTasksForDate(day.date);
            
            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border rounded-lg ${
                  day.isCurrentMonth
                    ? isToday
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-100 text-gray-400'
                } hover:bg-gray-50 transition-colors cursor-pointer`}
                onClick={() => setSelectedDate(day.date)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-medium ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.date.getDate()}
                  </span>
                  {day.isCurrentMonth && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskCreate(day.date);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                {/* Tasks for the day */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)} truncate`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                Tasks for {selectedDate.toLocaleDateString()}
              </h3>
            </div>
            <div className="p-6">
              {getTasksForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tasks for this date</p>
              ) : (
                <div className="space-y-2">
                  {getTasksForDate(selectedDate).map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.priority} priority</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;