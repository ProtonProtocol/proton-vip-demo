import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../../util/providers/AuthProvider';
import { Button } from '../../styles/Button.styled';
import {
  PriceContainer,
  PriceBox,
  PriceDescription,
  PriceList,
  PriceListItem,
  PriceItemTitle,
  PriceItemCost,
  PriceHeader,
} from './index.styled';

type PriceData = {
  id: string;
  popular: boolean;
  title: string;
  cost: number;
  description: string;
  list: string[];
};

interface PriceItemProps {
  data: PriceData;
}

interface PricesProps {
  priceLevels: PriceData[];
}

const Prices = ({ priceLevels }: PricesProps) => (
  <PriceContainer>
    {priceLevels.map((level) => (
      <PriceItem key={level.id} data={level} />
    ))}
  </PriceContainer>
);

const PriceItem = ({ data }: PriceItemProps) => {
  const { popular, title, cost, description, list } = data;
  const { signup } = useAuthContext();
  const handleClick = async () => await signup(data.cost, data.id);

  return (
    <PriceBox isPopular={popular}>
      <PriceHeader>
        <PriceItemTitle>{title}</PriceItemTitle>
        <PriceItemCost>${cost}</PriceItemCost>
      </PriceHeader>
      <PriceDescription>{description}</PriceDescription>
      <PriceList>
        {list.map((el) => (
          <PriceListItem key={el}>
            <FontAwesomeIcon icon="check" size="sm" />
            {el}
          </PriceListItem>
        ))}
      </PriceList>
      <Button onClick={handleClick}>JOIN</Button>
    </PriceBox>
  );
};

export default Prices;
