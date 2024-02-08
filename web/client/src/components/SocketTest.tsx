import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://tlr-contoller.onrender.com/");

const SocketTest: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        socket.on('response_to_client', (data: any) => {
            console.log('Received response:', data.data);
        });

        return () => {
            // console.log("DISCONNECTED");
            // socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message_from_client', { message });
    };

    return (
        <div>
            <h1>Socket.IO Test Component</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default SocketTest;
