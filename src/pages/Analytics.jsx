// src/pages/Analytics.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle, Calendar, Activity } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  const productivityData = {
    week: [65, 75, 60, 80, 75, 90, 85],
    month: [70, 65, 80, 75, 85, 90, 88, 82, 78, 85, 90, 92],
    year: [75, 80, 78, 85, 82, 88, 90, 92, 89, 87, 91, 94]
  };

  const taskStats = {
    total: 156,
    completed: 124,
    overdue: 8,
    inProgress: 24
  };

  const teamPerformance = [
    { name: 'Sarah Chen', completed: 45, efficiency: 92 },
    { name: 'Mike Johnson', completed: 38, efficiency: 88 },
    { name: 'Emily Davis', completed: 28, efficiency: 85 },
    { name: 'David Wilson', completed: 32, efficiency: 90 }
  ];

  const recentActivity = [
    { action: 'Completed task', user: 'Sarah Chen', task: 'Design Review', time: '2 hours ago' },
    { action: 'Created task', user: 'Mike Johnson', task: 'API Integration', time: '4 hours ago' },
    { action: 'Updated task', user: 'Emily Davis', task: 'User Testing', time: '6 hours ago' },
    { action: 'Commented on', user: 'David Wilson', task: 'Project Planning', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Tasks Completed</dt>
                    <dd className="text-lg font-semibold text-gray-900">{taskStats.completed}</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <span className="text-green-600 font-medium">+12%</span> from last period
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Productivity</dt>
                    <dd className="text-lg font-semibold text-gray-900">87%</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <span className="text-green-600 font-medium">+5%</span> from last week
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg. Completion</dt>
                    <dd className="text-lg font-semibold text-gray-900">2.3 days</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <span className="text-green-600 font-medium">-0.5 days</span> improvement
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Team Active</dt>
                    <dd className="text-lg font-semibold text-gray-900">4/5</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <span className="text-green-600 font-medium">80%</span> active members
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Productivity Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Productivity Trend</h3>
            <div className="h-64 flex items-end space-x-2">
              {productivityData[timeRange].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">
                    {timeRange === 'week' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] : index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h3>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.completed} tasks completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{member.efficiency}%</p>
                    <p className="text-xs text-gray-500">Efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">"{activity.task}"</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;