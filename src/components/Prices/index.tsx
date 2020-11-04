import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProtonService from '../../util/services/proton.service';
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

type Signup = (dataCost: number, dataId: string) => void;

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
  signup: Signup;
}

interface PricesProps {
  priceLevels: PriceData[];
}

const Prices = ({ priceLevels }: PricesProps) => {
  const history = useHistory();
  const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const { authenticate, updateMember, currentUser, signout } = useAuthContext();

  const signup: Signup = async (dataCost, dataId) => {
    try {
      let user = currentUser;
      if (!user.actor) {
        const result = await authenticate();
        if (!result.success) throw new Error();
        user = result.user;
        await timeout(4000);
      }

      const tx = await ProtonService.sendTransaction(dataCost, dataId);

      await updateMember(user, dataId);

      if (tx.processed.id) {
        history.push('/artist');
      }
    } catch (err) {
      console.warn('Transaction Error', err);
      signout();
    }
  };

  return (
    <PriceContainer>
      {priceLevels.map((level) => (
        <PriceItem signup={signup} key={level.id} data={level} />
      ))}
    </PriceContainer>
  );
};

const PriceItem = ({ data, signup }: PriceItemProps) => {
  const { popular, title, cost, description, list } = data;
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
