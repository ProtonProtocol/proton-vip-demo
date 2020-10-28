import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export const StyledHeader = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const SearchBar = styled.div`
  width: 300px;
  height: 46px;
  margin-left: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: $white-opaq;
  border-radius: $border-radius;
  i, svg {
    font-size: 1.25rem;
    margin: 0 .5rem;
  }
`

export const NavList = styled.ul`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const NavListItem = styled.li`
  float: right;
  color: #fff;
  margin-left: 30px;
  margin-top: 10px;
  cursor: pointer;
`

export const LogoContainer = styled.div`
  width: 200px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  box-shadow: 0 0 1px 1px rgba(255,255,255,.85);
`
