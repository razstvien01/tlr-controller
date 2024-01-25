import { io } from "socket.io-client"
import { useState, useEffect } from "react"

const socket = io('http://127.0.0.1:5000/')

const SocketTest = () => {
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    socket.on('response_to_client', data => {
      console.log('Received response', data)
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  
  // const sendMessage = () => {
  //   socket.emit('message_from_client', { message });
  // };
  
  return (
    <div>
      <h1>Socket.IO Test Component</h1>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => {
        socket.emit('message_from_client', { message });
      }}>Send Message</button>
    </div>
  )
}

export default SocketTest