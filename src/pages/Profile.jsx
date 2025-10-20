// src/pages/Profile.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Settings, ArrowLeft, Camera, Save } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Project Manager',
    department: 'Engineering',
    joinDate: '2024-01-15',
    bio: 'Passionate about productivity and team collaboration. Love building amazing products with great people.'
  });

  const stats = [
    { label: 'Tasks Completed', value: '156' },
    { label: 'Projects', value: '12' },
    { label: 'Team Members', value: '8' },
    { label: 'Productivity', value: '87%' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Settings className="mr-2 h-4 w-4" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full text-2xl font-bold border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                      />
                      <input
                        type="text"
                        value={userData.position}
                        onChange={(e) => setUserData({ ...userData, position: e.target.value })}
                        className="w-full text-gray-600 border-b border-gray-300 focus:border-blue-500 focus:outline-none pb-1"
                      />
                      <textarea
                        value={userData.bio}
                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        rows={3}
                        className="w-full text-gray-600 border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                      <p className="text-gray-600 mt-1">{userData.position}</p>
                      <p className="text-gray-500 mt-3">{userData.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <span className="text-gray-600">{userData.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    Joined {new Date(userData.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                {['Sarah Chen', 'Mike Johnson', 'Emily Davis', 'David Wilson'].map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  'Completed task "Design Review"',
                  'Commented on "API Integration"',
                  'Created project "Mobile App"',
                  'Updated profile information'
                ].map((activity, index) => (
                  <div key={index} className="text-sm text-gray-600 border-l-2 border-blue-500 pl-3 py-1">
                    {activity}
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button for Edit Mode */}
            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;