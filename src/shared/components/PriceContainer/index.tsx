import React from 'react'

const PriceContainer = ({ children }) => (
  <div className="columns" style={{ marginTop: '3rem' }}>
    <div className="column is-1"></div>
    {children}
    <div className="column is-1"></div>
  </div>
)

export default PriceContainer
