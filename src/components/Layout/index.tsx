import Header from '../Header';
import React from 'react';
import { LayoutContainer } from './index.styled';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => (
  <LayoutContainer>
    <Header />
    <main>{children}</main>
  </LayoutContainer>
);

export default Layout;
