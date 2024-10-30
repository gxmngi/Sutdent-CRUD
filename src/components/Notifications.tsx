import React from 'react';
import { useStore } from '../store';
import { X } from 'lucide-react';

export function Notifications() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm flex items-center justify-between ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800'
              : notification.type === 'error'
              ? 'bg-red-50 text-red-800'
              : 'bg-blue-50 text-blue-800'
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}