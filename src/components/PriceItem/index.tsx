import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProtonService from '../../util/services/proton.service';
import { useAuthContext } from '../../util/providers/AuthProvider';
import { Button } from '../Button/index.styled';
import {
  PriceBox,
  PriceDescription,
  PriceList,
  PriceListItem,
  PriceItemTitle,
  PriceItemCost,
  PriceHeader,
} from './index.styled';

type PriceData = {
  id: string,
  popular: boolean,
  title: string,
  cost: number,
  description: string,
  list: string[],
}

interface Props {
  data: PriceData;
}

const PriceItem = ({ data }: Props) => {
  const history = useHistory();
  const timeout = ms => new Promise(res => setTimeout(res, ms));
  const { authenticate, updateMember, currentUser, signout } = useAuthContext();
  const { popular, title, cost, description, list } = data;

  const handleClick = async () => {
    try {
      let user = currentUser;
      if (!user) {
        const result = await authenticate();
        if (!result.success) throw new Error();
        user = result.user;
        await timeout(4000);
      }
      const tx = await ProtonService.sendTransaction(data.cost, data.id);
      await updateMember(user, data.id);

      if (tx.processed.id) {
        history.push('/artist');
      }
    } catch (err) {
      console.warn('Transaction Error', err);
      signout();
      history.push('/');
    }
  }

  return (
    <PriceBox className={popular ? 'popular' : ''}>
      <PriceHeader>
        <PriceItemTitle>{title}</PriceItemTitle>
        <PriceItemCost>${cost}</PriceItemCost>
      </PriceHeader>
      <PriceDescription>
        {description}
      </PriceDescription>
      <PriceList>
        {list.map(el =>
          <PriceListItem key={el}>
            <FontAwesomeIcon icon="check" size="sm" />
            {el}
          </PriceListItem>
        )}
      </PriceList>
      <Button onClick={handleClick}>JOIN</Button>
    </PriceBox>
  );
};

export default PriceItem;
