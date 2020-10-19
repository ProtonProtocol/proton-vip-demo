import React, { useContext } from 'react'

import { AMANDA_DATA } from '../constants/amanda-data.constant';
import Layout from '../layouts/MainLayout'
import PriceContainer from '../shared/components/PriceContainer';
import PriceItem from '../shared/components/PriceItem';
import { authContext } from '../shared/providers/AuthProvider'
import { useHistory } from 'react-router-dom'

export default function Landing() {
  const { currentUser } = useContext(authContext)
  const history = useHistory();
  if (currentUser && currentUser.isMember) {
    history.push('/artist');
  }
  const data = AMANDA_DATA;
  const priceLevels = data.priceLevels.map((level, index) =>
    <PriceItem key={index} data={level}></PriceItem>
  );

  return (
    <Layout>
      <div className="full-bg"></div>
      <div className="container">
        <h1 className="landing-title">
          {data.firstName}
          <span>{data.lastName}</span>
        </h1>
        <h3 className="occupation">{data.title}</h3>
        <PriceContainer>
          {priceLevels}
        </PriceContainer>
      </div>
    </Layout>
  )
}
