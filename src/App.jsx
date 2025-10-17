import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      {/* Your app routes and layout */}
      <DashboardTasks />
    </TaskProvider>
  );
}