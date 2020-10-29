import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { AMANDA_DATA } from '../util/constants/amanda-data.constant';
import firebaseService from '../util/services/firebase.service';
import Layout from '../components/Layout';
import { useAuthContext } from '../util/providers/AuthProvider';
import {
  ArtistPageContainer,
  Column,
  ChatContainer,
  InputContainer,
  ArtistName,
  ArtistImg,
} from '../styles/Artist.styled';

export default function Artist() {
  const { firstName, lastName } = AMANDA_DATA;
  const history = useHistory();
  const { currentUser } = useAuthContext();
  const [chats, addChats] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    firebaseService.collection('members').where("user", "==", currentUser.actor)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          history.push('/landing');
          return;
        }
    });
  }, [currentUser.actor, history]);

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
        }
      });

    return () => {
      unsubscribe();
    }
  }, []);

  const scrollToBottom = () => {
    const chatList = document.getElementById('chatLog');
    chatList.scrollTop = chatList.scrollHeight;
  };

  const onSendChat = async () => {
    const chat = {
      sender: currentUser.name,
      msg: input,
      avatar: currentUser.avatar,
      date: Date.now(),
    };
    setInput('');
    await firebaseService.collection('chats').add(chat);
  };

  return (
    <Layout>
      <ArtistPageContainer>
          <Column>
            <ArtistName>
              {firstName}
              <span>{lastName}</span>
            </ArtistName>
            <ChatContainer>
              <ul className="chat-log" id="chatLog">
                { chats.map((chat, index) => (
                  <li key={index}>
                    <div className="chat-item">
                      <img alt="avatar" src={chat.avatar ? `data:image/jpeg;base64,${chat.avatar}` : "./default-avatar.png"} />
                      <p>{chat.msg}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ChatContainer>
            <InputContainer>
              <input type="text"
                placeholder="Type something..."
                value={input}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && e.shiftKey === false && input) {
                    await onSendChat();
                  }
                }}
                onChange={(event) => setInput(event.target.value)} />
              <FontAwesomeIcon onClick={async () => await onSendChat()} icon="paper-plane" size="sm" />
            </InputContainer>
          </Column>
          <ArtistImg src="/girl.png" alt="artist" />
        </ArtistPageContainer>
    </Layout>
  );
}
