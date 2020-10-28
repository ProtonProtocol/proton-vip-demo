import styled from 'styled-components';

export const StyledButton = styled.button`
  width: ${(props) => props.width ? props.width : '296'}px;
  height: 48px;
  opacity: 0.4;
  border-radius: 4px;
  background-color: #e3c782;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 3px;
  text-align: center;
  color: #ffffff;
  transition: 0.2s;

  :hover {
    filter: brightness(.9);
    cursor: pointer;
  }
`
