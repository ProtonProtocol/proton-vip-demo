import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../../util/providers/AuthProvider';
import { Button } from '../../styles/Button.styled';
import {
  Container,
  LogoContainer,
  SearchBar,
  NavRightContainer,
  NavRightText,
} from './index.styled';

const Header = () => {
  const { currentUser, signout, authenticate } = useAuthContext();
  const isAuthenticated = currentUser.actor !== '';
  return (
    <Container>
      <LogoContainer>
        <img src="/proton-logo.png" alt="Proton" />
      </LogoContainer>
      <SearchBar>
        <FontAwesomeIcon icon="search" size="sm" />
        <input type="text" placeholder="Search" />
      </SearchBar>
      {isAuthenticated ? (
        <NavRightContainer>
          <img
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
          <Button onClick={signout} style={{ opacity: 0.9, width: 100 }}>
            LOGOUT
          </Button>
        </NavRightContainer>
      ) : (
        <NavRightContainer>
          <NavRightText>Already a member?</NavRightText>
          <Button onClick={authenticate} style={{ width: 100 }}>
            LOGIN
          </Button>
        </NavRightContainer>
      )}
    </Container>
  );
};

export default Header;
