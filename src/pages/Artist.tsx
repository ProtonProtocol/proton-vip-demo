import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebaseService from '../util/services/firebase.service';
import Layout from '../components/Layout';
import Chatbox from '../components/Chatbox';
import { useAuthContext } from '../util/providers/AuthProvider';
import styled from 'styled-components';

export const ArtistPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  height: 100%;
  padding-left: 5%;
`;

export const ArtistImg = styled.img`
  margin-top: 100px;
  border-radius: 20px;
  width: 803px;
  height: 692px;
  object-fit: cover;
  object-position: 90%;
`;

interface Chat {
  avatar: string;
  date: number;
  msg: string;
  sender: string;
}

export default function Artist() {
  const history = useHistory();
  const { currentUser } = useAuthContext();
  const [chats, addChats] = useState<Chat[]>([]);
  const { actor, name, avatar } = currentUser;
  const chatlist = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    firebaseService
      .collection('members')
      .where('user', '==', actor)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          history.push('/landing');
          return;
        }
      });
  }, [actor, history]);

  useEffect(() => {
    const unsubscribe = firebaseService
      .collection('chats')
      .orderBy('date')
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          const firebaseChats: Chat[] = [];
          snapshot.forEach((doc) => {
            firebaseChats.push(doc.data() as Chat);
          });
          addChats(firebaseChats);
          if (chatlist && chatlist.current) {
            chatlist.current.scrollTop = chatlist.current.scrollHeight;
          }
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <ArtistPageContainer>
        <Chatbox
          chats={chats}
          sender={name}
          avatar={avatar}
          chatlist={chatlist}
        />
        <ArtistImg src="/girl.png" alt="artist" />
      </ArtistPageContainer>
    </Layout>
  );
}
