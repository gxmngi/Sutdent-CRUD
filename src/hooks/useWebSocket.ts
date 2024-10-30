import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store';

const WS_URL = 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self';

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const { addNotification, setActiveUsers } = useStore();
  
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'user_joined' || data.type === 'user_left') {
        setActiveUsers(data.activeUsers || []);
        addNotification(
          `${data.user.name} ${data.type === 'user_joined' ? 'joined' : 'left'} the session`,
          'info'
        );
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }, [addNotification, setActiveUsers]);

  const handleError = useCallback(() => {
    addNotification('Connection error occurred', 'error');
  }, [addNotification]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    const userId = crypto.randomUUID();
    const userName = `User_${userId.slice(0, 4)}`;
    const userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'user_joined',
        user: { id: userId, name: userName, avatar: userAvatar }
      }));
    };

    ws.onmessage = handleMessage;
    ws.onerror = handleError;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'user_left',
          user: { id: userId, name: userName, avatar: userAvatar }
        }));
        ws.close();
      }
    };
  }, [handleMessage, handleError]);

  return wsRef.current;
}