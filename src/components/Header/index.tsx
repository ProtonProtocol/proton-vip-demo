import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../util/providers/AuthProvider';
import { Button } from '../Button/index.styled';
import {
  Container,
  LogoContainer,
  SearchBar,
  LogoutButton,
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
          <LogoutButton onClick={signout}>
            <img src={`data:image/jpeg;base64,${currentUser.avatar}`} alt="avatar" />
            <span>Logout</span>
          </LogoutButton>
        ) : (
          <Button onClick={handleLogin} style={{ opacity: 1, width: 120 }}>LOGIN</Button>
        )}
    </Container>
  );
};

export default Header;
