import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../util/providers/AuthProvider';
import { Button } from '../Button/index.styled';
import {
  Container,
  LogoContainer,
  SearchBar,
  NavRightContainer,
} from './index.styled';

const Header = () => {
  const { currentUser, signout } = useAuthContext();
  const isAuthenticated = currentUser !== null;
  return (
    <Container>
      <LogoContainer>
        <Link to="/">
          <img src="/proton-logo.png" alt="Proton" />
        </Link>
      </LogoContainer>
      <SearchBar>
        <FontAwesomeIcon icon="search" size="sm" />
        <input type="text" placeholder="Search" />
      </SearchBar>
        { isAuthenticated ? (
          <NavRightContainer>
            <img alt="avatar" src={currentUser.avatar ? `data:image/jpeg;base64,${currentUser.avatar}` : "./default-avatar.png"} />
            <Button onClick={signout} style={{ opacity: 0.9, width: 100 }}>LOGOUT</Button>
          </NavRightContainer>
        ) : (
          <div />
        )}
    </Container>
  );
};

export default Header;
