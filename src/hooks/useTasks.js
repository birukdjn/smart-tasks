import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNotifications } from './useNotifications';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  
  useNotifications(tasks);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const updateTask = useCallback((taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  }, [setTasks]);

  const toggleTask = useCallback((taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, [setTasks]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  const reorderTasks = useCallback((result) => {
    if (!result.destination) return;

    const updated = Array.from(tasks);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    
    setTasks(updated);
  }, [tasks, setTasks]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => 
      !task.completed && task.deadline && new Date(task.deadline) < new Date()
    ).length,
  }), [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearAllTasks,
    reorderTasks,
    stats,
  };
};