import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AMANDA_DATA } from '../util/constants/amanda-data.constant';
import { useAuthContext } from '../util/providers/AuthProvider';
import Layout from '../components/Layout';
import PriceContainer from '../components/PriceContainer';
import PriceItem from '../components/PriceItem';

const LandingTitle = styled.h1`
  font-size: 59px;
  font-size: 3rem;
  letter-spacing: 8.43px;
  font-family: Charter-Roman;
  color: #ffffff;
  text-align: center;
  line-height: 3rem;
  margin-top: 5rem;
  position: relative;
  padding-bottom: 1.5rem;
  span {
    display: block;
  }
  :after {
    content: '';
    background: #E3C681;
    width: 100px;
    height: 3px;
    position: absolute;
    left: 0; right: 0; bottom: 0;
    margin: auto;
  }
`

const Occupation = styled.h3`
  font-size: 1rem;
  color: #fff;
  text-align: center;
  display: block;
  margin: 1.5rem 0;
`

export default function Landing() {
  const { firstName, lastName, title, priceLevels } = AMANDA_DATA;
  const { currentUser } = useAuthContext();
  const history = useHistory();

  if (currentUser && currentUser.isMember) {
    history.push('/artist');
  }

  const prices = priceLevels.map((level, index) =>
    <PriceItem key={index} data={level}></PriceItem>
  );

  return (
    <Layout>
      <div className="full-bg"></div>
      <div className="container">
        <LandingTitle>
          {firstName}
          <span>{lastName}</span>
        </LandingTitle>
        <Occupation>{title}</Occupation>
        <PriceContainer>
          {prices}
        </PriceContainer>
      </div>
    </Layout>
  );
}
