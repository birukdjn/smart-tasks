export const filterTasks = (tasks, filters) => {
  const { search, category, priority, status } = filters;
  
  return tasks
    .filter(task => {
      if (status === 'completed') return task.completed;
      if (status === 'incomplete') return !task.completed;
      if (status === 'overdue') {
        return !task.completed && task.deadline && new Date(task.deadline) < new Date();
      }
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(task => 
      category === 'All' ? true : task.category === category
    )
    .filter(task =>
      priority === 'All' ? true : task.priority === priority
    );
};

export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => {
    const aDeadline = a.deadline ? new Date(a.deadline) : null;
    const bDeadline = b.deadline ? new Date(b.deadline) : null;
    const now = new Date();

    // Overdue tasks first
    if (aDeadline && aDeadline < now && !bDeadline) return -1;
    if (bDeadline && bDeadline < now && !aDeadline) return 1;
    if (aDeadline && aDeadline < now && bDeadline && bDeadline < now) {
      return aDeadline - bDeadline;
    }

    // Then tasks with deadlines
    if (aDeadline && !bDeadline) return -1;
    if (!aDeadline && bDeadline) return 1;
    if (aDeadline && bDeadline) return aDeadline - bDeadline;

    // Then by priority
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};