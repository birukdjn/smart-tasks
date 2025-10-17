import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex relative min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 fixed bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-6">SmartTask Hub</h2>
        <nav className="space-y-3">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-500">🏠 Dashboard</Link>
          <Link to="/dashboard/tasks" className="block text-gray-700 hover:text-blue-500">🗂️ Tasks</Link>
          <Link to="/dashboard/profile" className="block text-gray-700 hover:text-blue-500">👤 Profile</Link>
          <Link to="/dashboard/settings" className="block text-gray-700 hover:text-blue-500">⚙️ Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 p-8">
        <Outlet />
      </main>
    </div>
  );
}