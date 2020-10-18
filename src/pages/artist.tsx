import React, { useContext, useEffect, useState } from 'react'

import { AMANDA_DATA } from '../constants/amanda-data.constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../layouts/MainLayout'
import { authContext } from '../shared/providers/AuthProvider'

export default function Artist() {
  const data = AMANDA_DATA;
  const { currentUser } = useContext(authContext)
  const [chats, addChat] = useState([])
  const [input, setInput] = useState('')

  const scrollToBottom = () => {
    var chatList = document.getElementById('chatLog')
    chatList.scrollTop = chatList.scrollHeight
  }

  const onSendChat = () => {
    const chat = {
      sender: currentUser.name,
      msg: input,
      avatar: currentUser.avatar
    }
    addChat([...chats, chat]);
    setInput('');
  }

  useEffect(() => {
    if (chats) scrollToBottom()
  }, [chats])

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-5">
            <h1 className="artist-name">
              {data.firstName}
              <span>{data.lastName}</span>
            </h1>
            <div className="chat-container">
              <ul className="chat-log" id="chatLog">
                { chats.map((chat, index) => (
                  <li key={index}>
                    <div className="chat-item">
                      <img className="avatar" src={`data:image/jpeg;base64,${currentUser.avatar}`} alt="avatar" />
                      <p>{chat.msg}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="input-container">
              <input type="text"
                placeholder="Type something..."
                value={input}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey === false && input) {
                    onSendChat()
                  }
                }}
                onChange={(event) => setInput(event.target.value)} />
              <button className="button" onClick={onSendChat}>
                <FontAwesomeIcon icon="paper-plane" size="sm" />
              </button>
            </div>
          </div>
          <div className="column is-7">
            <div className="artist-img">
              <img src="/girl.png" alt="artist" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
