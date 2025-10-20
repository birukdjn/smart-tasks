// src/hooks/useOffline.js
import { useState, useEffect } from 'react';

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Process offline queue when coming back online
      if (offlineQueue.length > 0) {
        console.log('Processing offline queue:', offlineQueue);
        // In a real app, you'd sync with the server here
        setOfflineQueue([]);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline queue from localStorage
    const savedQueue = localStorage.getItem('offlineQueue');
    if (savedQueue) {
      setOfflineQueue(JSON.parse(savedQueue));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  const addToOfflineQueue = (action) => {
    const newQueue = [...offlineQueue, { ...action, timestamp: new Date().toISOString() }];
    setOfflineQueue(newQueue);
    localStorage.setItem('offlineQueue', JSON.stringify(newQueue));
  };

  return {
    isOnline,
    offlineQueue,
    addToOfflineQueue
  };
};