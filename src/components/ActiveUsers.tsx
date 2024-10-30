import React from 'react';
import { useStore } from '../store';

export function ActiveUsers() {
  const { activeUsers } = useStore();

  if (activeUsers.length === 0) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {activeUsers.map((user) => (
        <img
          key={user.id}
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src={user.avatar}
          alt={user.name}
          title={`${user.name} (Active)`}
        />
      ))}
      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
        {activeUsers.length}
      </span>
    </div>
  );
}