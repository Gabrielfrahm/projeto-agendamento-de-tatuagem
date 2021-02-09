import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/forgotPassword.webp';

interface ButtonProviderProps {
  isClickedProvider: boolean;
}

interface ButtonCustomerProps {
  isClickedCustomer: boolean;
}

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
  max-width: 700px;
  margin-bottom: 50px;
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

    text-align: center;

    a {
      color: #b34d4b;
      font-size: 18px;
      display: block;
      font-weight: 500;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2;

      &:hover {
        color: ${shade(0.2, '#b34d4b')};
      }
    }
  }
  > a {
    color: #fff;
    display: block;
    text-decoration: none;
    transition: color 0.2;
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-top: 10px;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#fff')};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 18px;
`;

export const ButtonProvider = styled.button<ButtonProviderProps>`
  background: transparent;
  font-weight: 400;
  height: 20px;
  border: none;
  font-size: 18px;
  color: #fff;

  ${props =>
    props.isClickedProvider &&
    css`
      color: #c53030;
    `}

  &:hover {
    color: ${shade(0.2, '#fff')};
  }
`;

export const ButtonCustomer = styled.button<ButtonCustomerProps>`
  margin-left: 55px;
  background: transparent;
  font-weight: 400;
  height: 20px;
  border: none;
  font-size: 18px;
  color: #fff;

  ${props =>
    props.isClickedCustomer &&
    css`
      color: #c53030;
    `}

  &:hover {
    color: ${shade(0.2, '#fff')};
  }
`;

export const BackgroundIMG = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
