import styled from 'styled-components';

export const ArtistPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  height: 100%;
  padding-left: 5%;
`
  
export const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10%;
  margin-right: 3%;
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 400px;
  
  .chat-log {
    overflow-y: auto;
  }

  li {
    display: block;
    margin-top: 2rem;
    flex: 1 1 auto;

    .chat-item {
      min-height: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    
    p {
      color: #fff;
      font-size: 14px;
      margin-left: 10px;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: #1f2229;
  margin-top: 50px;
  width: 100%;
  height: 40px;
  border-radius: 100px;
  box-shadow: 0 2px 6px -4px rgba(141, 141, 148, 0.48), 0 0 2px 0 rgba(141, 141, 148, 0.16);
  padding: 20px;

  i, svg {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin: 10px;
  }

  i:hover, svg:hover {
    cursor: pointer;
  }
  
  input {
    background-color: #1f2229;
    outline: none;
    border: none;

    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    color: #8e98a9;
    width: 100%;
  }
`

export const ArtistName = styled.h1`
  margin-top: 5rem;
  width: 456px;
  height: 80px;
  font-family: Charter;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: #ffffff;
  position: relative;
  margin-bottom: 20px;
  
  span {
    display: block;
  }

  :after {
    content: '';
    background: #1f2229;
    width: 100%;
    height: 1px;
    position: absolute;
    margin-top: 20px;
  }
`

export const ArtistImg = styled.img`
  margin-top: 100px;
  border-radius: 20px;
  width: 803px;
  height: 692px;
  object-fit: cover;
  object-position: 90%; /* try 20px 10px */ 
`
