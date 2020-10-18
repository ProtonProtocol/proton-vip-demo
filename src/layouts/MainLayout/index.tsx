import Header from './Header'
import React from 'react'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: black;
`

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header />
    <main style={{ flexGrow: 1 }}>
      {children}
    </main>
  </LayoutContainer>
)

export default Layout
