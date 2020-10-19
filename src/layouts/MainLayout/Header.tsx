import React, { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { authContext } from '../../shared/providers/AuthProvider'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export default function Header() {

  const { authenticate, currentUser, signout } = useContext(authContext)

  let showAuthHeader = currentUser !== null;

  const handleLogin = async () => {
    try {
      const result = await authenticate()
      showAuthHeader = result.success;
      return result.success
    } catch (err) {
      console.error('Login error: ', err)
    }
    return false
  }

  return (
    <Container>
      <div className="container">
        <div className="header">
          <div className="logo">
            <Link to="/">
              <img src="/proton-logo.png" alt="Proton" />
            </Link>
          </div>
          <div className="search-input">
            <FontAwesomeIcon icon="search" size="sm" />
            <input type="text" className="input" placeholder="Search" />
          </div>
          <ul className="nav-list">
            { !showAuthHeader && (
              <li>
                <button className="button is-primary" onClick={handleLogin}>Login</button>
              </li>)}
            { showAuthHeader && (
              <li>
                <img className="avatar" src={`data:image/jpeg;base64,${currentUser.avatar}`} alt="avatar" />
                <p className="signout" onClick={signout}>Logout</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  )
}
