// src/contexts/CollaborationContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const CollaborationContext = createContext();

// Mock WebSocket service (replace with actual WebSocket in production)
const createMockWebSocket = (onMessage) => {
  return {
    send: (data) => {
      console.log('WebSocket send:', data);
      // Simulate receiving messages after a delay
      setTimeout(() => {
        if (data.type === 'task_update') {
          onMessage({
            type: 'task_updated',
            task: data.task,
            user: 'Other User'
          });
        } else if (data.type === 'comment_added') {
          onMessage({
            type: 'comment_added',
            comment: data.comment,
            user: 'Other User'
          });
        }
      }, 1000);
    },
    close: () => console.log('WebSocket closed')
  };
};

export const CollaborationProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeTasks, setActiveTasks] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const mockSocket = createMockWebSocket(handleWebSocketMessage);
    setSocket(mockSocket);

    // Simulate online users
    setOnlineUsers([
      { id: 1, name: 'Sarah Chen', avatar: 'SC', lastActive: 'now' },
      { id: 2, name: 'Mike Johnson', avatar: 'MJ', lastActive: '2 min ago' },
      { id: 3, name: 'Emily Davis', avatar: 'ED', lastActive: '5 min ago' }
    ]);

    return () => {
      mockSocket.close();
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'user_joined':
        setOnlineUsers(prev => [...prev, message.user]);
        break;
      case 'user_left':
        setOnlineUsers(prev => prev.filter(u => u.id !== message.userId));
        break;
      case 'task_updated':
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now(),
            type: 'info',
            message: `${message.user} updated a task`,
            timestamp: new Date()
          }
        ]);
        break;
      case 'comment_added':
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now(),
            type: 'info',
            message: `${message.user} commented on a task`,
            timestamp: new Date()
          }
        ]);
        break;
      default:
        break;
    }
  };

  const updateTask = (task) => {
    if (socket) {
      socket.send({
        type: 'task_update',
        task
      });
    }
  };

  const addComment = (comment) => {
    if (socket) {
      socket.send({
        type: 'comment_added',
        comment
      });
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <CollaborationContext.Provider value={{
      onlineUsers,
      activeTasks,
      notifications,
      updateTask,
      addComment,
      removeNotification
    }}>
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};