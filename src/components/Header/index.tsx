import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../util/providers/AuthProvider';
import Button from '../Button';
import {
  Container,
  NavList,
  NavListItem,
  LogoContainer,
  StyledHeader,
  SearchBar,
  Avatar,
} from './index.styled';

const Header = () => {
  const { authenticate, currentUser, signout } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(currentUser !== null);

  const handleLogin = async () => {
    try {
      const result = await authenticate();
      setIsAuthenticated(result.success);
      return result.success;
    } catch (err) {
      console.error('Login error: ', err);
    }
    return false;
  };

  return (
    <Container>
      <StyledHeader>
        <LogoContainer>
          <Link to="/">
            <img src="/proton-logo.png" alt="Proton" />
          </Link>
        </LogoContainer>
        <SearchBar>
          <FontAwesomeIcon icon="search" size="sm" />
          <input type="text" placeholder="Search" />
        </SearchBar>
        <NavList>
          { isAuthenticated ? (
            <NavListItem>
              <Avatar src={`data:image/jpeg;base64,${currentUser.avatar}`} alt="avatar" />
              <p className="signout" onClick={signout}>Logout</p>
            </NavListItem>
          ) : (
            <NavListItem>
              <Button onClick={handleLogin} width={120}>Login</Button>
            </NavListItem>
          )}
        </NavList>
      </StyledHeader>
    </Container>
  );
};

export default Header;
