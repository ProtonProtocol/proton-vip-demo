import React, { useContext, useEffect, useState } from 'react'

import { AMANDA_DATA } from '../constants/amanda-data.constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../layouts/MainLayout'
import { authContext } from '../shared/providers/AuthProvider'
import firebaseService from '../shared/services/firebase.service';
import { useHistory } from 'react-router-dom'

export default function Artist() {

  const history = useHistory();
  const data = AMANDA_DATA;
  const { currentUser } = useContext(authContext)

  firebaseService.collection('members').where("user", "==", currentUser.actor)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        history.push('/landing');
        return;
      }
  });

  const [chats, addChats] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const unsubscribe = firebaseService.collection('chats').orderBy('date')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          const chats = [];
          snapshot.forEach(function(doc) {
            chats.push(doc.data());
          });
          addChats(chats);
          scrollToBottom();
        } else {
          // it's empty
        }
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const scrollToBottom = () => {
    var chatList = document.getElementById('chatLog')
    chatList.scrollTop = chatList.scrollHeight
  }

  const onSendChat = async () => {
    const chat = {
      sender: currentUser.name,
      msg: input,
      avatar: currentUser.avatar,
      date: Date.now(),
    }
    setInput('');
    await firebaseService.collection('chats').add(chat);
  }

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
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && e.shiftKey === false && input) {
                    await onSendChat()
                  }
                }}
                onChange={(event) => setInput(event.target.value)} />
              <button className="button" onClick={async () => {await onSendChat()} }>
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
