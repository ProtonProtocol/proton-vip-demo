import React, { useState } from 'react';
import firebaseService from '../../util/services/firebase.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Column,
  ArtistName,
  ChatContainer,
  InputContainer,
  ChatItem,
} from './index.styled';
import { AMANDA_DATA } from '../../util/constants/amanda-data.constant';

interface Chat {
  date: number;
  avatar: string;
  sender: string;
  msg: string;
}

interface ChatboxProps {
  chats: Chat[];
  sender: string;
  avatar: string;
  chatlist: React.MutableRefObject<HTMLUListElement | null>;
}

const Chatbox = ({ chats, sender, avatar, chatlist }: ChatboxProps) => {
  const { firstName, lastName } = AMANDA_DATA;
  const [input, setInput] = useState('');

  const sendChat = async () => {
    const chat = {
      sender,
      msg: input,
      avatar,
      date: Date.now(),
    };
    setInput('');
    await firebaseService.collection('chats').add(chat);
  };

  return (
    <Column>
      <ArtistName>
        {firstName}
        <span>{lastName}</span>
      </ArtistName>
      <ChatContainer>
        <ul id="chatlist" ref={chatlist}>
          {chats.map(({ date, msg, avatar, sender }) => (
            <ChatItem key={`${date}-${sender}`}>
              <img
                alt={sender}
                src={
                  avatar
                    ? `data:image/jpeg;base64,${avatar}`
                    : './default-avatar.png'
                }
              />
              <p>{msg}</p>
            </ChatItem>
          ))}
        </ul>
      </ChatContainer>
      <InputContainer>
        <input
          type="text"
          value={input}
          placeholder="Type something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            const isValidEnterKeyDown =
              e.key === 'Enter' && e.shiftKey === false && input;
            if (isValidEnterKeyDown) {
              sendChat();
            }
          }}
        />
        <FontAwesomeIcon onClick={sendChat} icon="paper-plane" size="sm" />
      </InputContainer>
    </Column>
  );
};

export default Chatbox;
