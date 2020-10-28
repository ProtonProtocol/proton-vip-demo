import Header from '../Header';
import React from 'react';
import { LayoutContainer } from './index.styled';

const Layout = ({ children }) => (
  <LayoutContainer>
    <Header />
    <main>{children}</main>
  </LayoutContainer>
);

export default Layout;
