import { useEffect } from 'react';

export const useNotifications = (tasks) => {
  useEffect(() => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      
      const dueSoon = tasks.filter(task => {
        if (task.completed || !task.deadline) return false;
        
        const taskDeadline = new Date(task.deadline);
        const timeDiff = taskDeadline.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        return hoursDiff <= 24 && hoursDiff > 0;
      });

      const overdue = tasks.filter(task => {
        if (task.completed || !task.deadline) return false;
        return new Date(task.deadline) < now;
      });

      if (dueSoon.length > 0 && Notification.permission === 'granted') {
        new Notification('🔔 Tasks Due Soon!', {
          body: `You have ${dueSoon.length} task(s) due within 24 hours`,
        });
      }

      if (overdue.length > 0 && Notification.permission === 'granted') {
        new Notification('⚠️ Overdue Tasks!', {
          body: `You have ${overdue.length} overdue task(s)`,
        });
      }
    };

    checkDueTasks();
    const interval = setInterval(checkDueTasks, 60000);
    
    return () => clearInterval(interval);
  }, [tasks]);
};