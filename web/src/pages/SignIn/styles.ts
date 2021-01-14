import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/signIn.webp';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 50%;

  h1 {
    font-weight: 500;
    font-family: 'Big Shoulders Stencil Display', cursive, ' serif';
    font-size: 48px;
    line-height: 50px;
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
