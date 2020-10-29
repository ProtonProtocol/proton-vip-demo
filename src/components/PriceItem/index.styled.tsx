import styled from 'styled-components';

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0.5rem;
  
  padding: 32px 32px 34px 32px;
  opacity: .8;
  transition: all .2s ease-in-out;

  width: 345px;
  height: 450px;
  box-shadow: 0 2px 6px -4px rgba(141, 141, 148, 0.48), 0 0 2px 0 rgba(141, 141, 148, 0.16);
  background-color: #191c21;
  box-sizing: border-box;

  &.popular {
    opacity: 1;
    border: 2px solid #E3C681;
    position: relative;
    opacity: 1;

    &:before {
      content: 'Most Popular';
      text-align: center;
      color: #fff;
      background: #E3C681;
      position: absolute;
      width: calc(100% + 4px);
      top: 0; left: -2px;
      margin-top: -20px;
      height: 30px;
      line-height: 30px;
    }

    button {
      opacity: 1;
    }
  }

  &:hover {
    opacity: 1;

    button {
      opacity: 1;
    }
  }
`

export const PriceDescription = styled.p`
  font-size: .9rem;
  color: #8e98a9;
  padding-bottom: 1.5em;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.1);
  font-family: Avenir;
`

export const PriceList = styled.ul`
  width: 100%;
  margin-bottom: 50px;
`

export const PriceListItem = styled.li`
  width: 100%;
  color: #ffffff;
  font-weight: bold;
  font-size: .9rem;
  font-family: Avenir;
  margin: 10px;

  svg {
    color: #E3C681;
    margin-right: 5px;
  }
`

export const PriceHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`

export const PriceItemTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: auto;
  color: #ffffff;
  font-family: Charter;
`

export const PriceItemCost = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #E3C681;
`
