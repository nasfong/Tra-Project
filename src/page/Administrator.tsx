import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

function Administrator() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // 1️⃣ Connect to Socket.IO server
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // force WebSocket
    });

    setSocket(newSocket);

    // 2️⃣ Listen for 'notification' events
    newSocket.on('notification', (msg: string) => {
      setNotifications((prev) => [...prev, msg]);
    });

    // 3️⃣ Optional: log connection status
    newSocket.on('connect', () => console.log('Connected to Socket.IO'));
    newSocket.on('disconnect', () => console.log('Disconnected'));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 4️⃣ Optional: send a test message to server
  const sendMessage = () => {
    socket?.emit('clientMessage', 'Hello from React!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Socket.IO React Example</h1>

      <button onClick={sendMessage}>Send Test Message</button>

      <h2>Notifications:</h2>
      <ul>
        {notifications.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Administrator;
