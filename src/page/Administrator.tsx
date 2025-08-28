import CheckoutButton from '@/components/custom/CheckoutButton';
import { Constant } from '@/lib/constant';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = Constant.API_URL;
const USER_ID = '68a94ef12b709d0c5087eca5'; // Replace with logged-in user's ID

function Administrator() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // 1️⃣ Connect to Socket.IO server
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // force WebSocket
    });

    setSocket(newSocket);

    // 2️⃣ Register userId for private messages
    newSocket.emit('identifyUser', USER_ID);

    // 3️⃣ Listen for public notifications
    newSocket.on('publicNotification', (msg: string) => {
      setNotifications((prev) => [...prev, `Public: ${msg}`]);
    });

    // 4️⃣ Listen for private notifications
    newSocket.on('privateNotification', (msg: string) => {
      setNotifications((prev) => [...prev, `Private: ${msg}`]);
    });

    // 5️⃣ Optional: log connection status
    newSocket.on('connect', () => console.log('Connected to Socket.IO'));
    newSocket.on('disconnect', () => console.log('Disconnected'));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 6️⃣ Optional: send a test message to server
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
      <CheckoutButton />
    </div>
  );
}

export default Administrator;
