import React from 'react';
import { StyledButton } from './index.styled';

interface Props {
  onClick: () => {};
  width?: number;
  children: string | React.ReactElement;
}

const Button = ({ onClick, children, width }: Props) => (
  <StyledButton onClick={onClick} width={width}>
    {children}
  </StyledButton>
);

export default Button;
