import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AMANDA_DATA } from '../util/constants/amanda-data.constant';
import { useAuthContext } from '../util/providers/AuthProvider';
import Layout from '../components/Layout';
import PriceItem from '../components/PriceItem';
import { PriceContainer, LandingTitle, Occupation, Container, Background } from './landing.styled';

export default function Landing() {
  const { firstName, lastName, title, priceLevels } = AMANDA_DATA;
  const { currentUser } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (currentUser && currentUser.isMember) {
      history.push('/artist');
    }
  }, [currentUser, history]);

  return (
    <Layout>
      <Background />
      <Container>
        <LandingTitle>
          {firstName}
          <span>{lastName}</span>
        </LandingTitle>
        <Occupation>{title}</Occupation>
        <PriceContainer>
          {priceLevels.map((level) =>
            <PriceItem key={level.id} data={level}></PriceItem>
          )}
        </PriceContainer>
      </Container>
    </Layout>
  );
}
