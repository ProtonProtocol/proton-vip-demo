import React from 'react';
import { useAuthContext } from '../../util/providers/AuthProvider';

import {
  Container,
  LogoContainer,
  NavRightContainer,
  NavRightText,
  NavButton,
  NavProfile
} from './index.styled';

const Header = () => {
  const { currentUser, signout, authenticate } = useAuthContext();
  const isAuthenticated = currentUser.actor !== '';
  return (
    <Container>
      <LogoContainer>
        <img src="/proton-logo.png" alt="Proton" />
      </LogoContainer>
      {isAuthenticated ? (
        <NavRightContainer>
          <NavProfile
            alt={
              currentUser.avatar
                ? `avatar-${currentUser.actor}`
                : 'avatar-default'
            }
            src={
              currentUser.avatar
                ? `data:image/jpeg;base64,${currentUser.avatar}`
                : './default-avatar.png'
            }
          />
          <NavButton onClick={signout} style={{ opacity: 0.9 }}>
            LOGOUT
          </NavButton>
        </NavRightContainer>
      ) : (
        <NavRightContainer>
          <NavRightText>Already a member?</NavRightText>
          <NavButton onClick={authenticate}>
            LOGIN
          </NavButton>
        </NavRightContainer>
      )}
    </Container>
  );
};

export default Header;
