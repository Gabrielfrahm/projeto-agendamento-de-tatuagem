import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/signIn.webp';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-75px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  h1 {
    font-weight: 500;
    font-family: 'Big Shoulders Stencil Display', cursive, ' serif';
    font-size: 48px;
    line-height: 50px;
  }

  form {
    margin: 14px 0;
    width: 320px;
    height: 35px;
    text-align: center;

    button {
      margin-top: 35px;
      width: 320px;
      height: 50px;
      border-radius: 12px;
      border: none;
      background: #b34d4b;
      color: #fff;
      font-size: 24px;
      font-weight: 500;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 18px;
`;

export const ButtonProvider = styled.button`
  background: transparent;
  font-weight: 400;
  height: 20px;
  border: none;
  font-size: 18px;
  color: #fff;

  &:hover {
    color: ${shade(0.2, '#fff')};
  }
`;

export const ButtonCustomer = styled.button`
  margin-left: 55px;
  background: transparent;
  font-weight: 400;
  height: 20px;
  border: none;
  font-size: 18px;
  color: #fff;

  &:hover {
    color: ${shade(0.2, '#fff')};
  }
`;

export const BackgroundIMG = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
