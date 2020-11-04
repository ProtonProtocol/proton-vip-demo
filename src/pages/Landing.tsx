import React from 'react';
import { AMANDA_DATA } from '../util/constants/amanda-data.constant';
import Layout from '../components/Layout';
import Prices from '../components/Prices';
import {
  LandingTitle,
  Occupation,
  Container,
  Background,
} from '../styles/Landing.styled';

export default function Landing() {
  const { firstName, lastName, title, priceLevels } = AMANDA_DATA;

  return (
    <Layout>
      <Background />
      <Container>
        <LandingTitle>
          {firstName}
          <span>{lastName}</span>
        </LandingTitle>
        <Occupation>{title}</Occupation>
        <Prices priceLevels={priceLevels} />
      </Container>
    </Layout>
  );
}
