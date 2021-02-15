import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 25px 0;
  background: #201e1e;

  @media (max-width: 600px) {
    padding: 30px 0;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 1000px) {
    margin: 0 auto;
    display: flex;
    align-items: center;

    button {
      margin-right: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    p {
      color: #fff;
      font-weight: 300;
    }

    a {
      text-decoration: none;
      color: #b34d4b;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 640px) {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const ProviderList = styled.div`
  @media (min-width: 300px) {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > strong {
      color: #727272;
      font-size: 20px;
      font-weight: 300;
    }

    div {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-radius: 10px;
      margin-top: 24px;
      position: relative;

      /* &::before {
        position: absolute;
        height: 80px;
        width: 3px;
        left: 0;
        top: 5%;
        content: '';
        background: #b34d4b;
      } */

      h1 {
        font-size: 18px;
        font-weight: 500;
        color: #b34d4b;
        margin-right: 10px;
      }

      p {
        font-size: 10px;
        font-weight: 300;
        color: #727272;
        margin-right: 10px;
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }

      button {
        width: 40px;
        height: 50px;
        border-radius: 12px;
        border: none;
        background: #b34d4b;
        color: #fff;

        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#b34d4b')};
        }
      }

      a {
        margin-right: 10px;
      }
    }
  }

  @media (min-width: 640px) {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > strong {
      color: #727272;
      font-size: 20px;
      font-weight: 300;
    }

    div {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 40px 64px;
      border-radius: 10px;
      margin-top: 24px;
      position: relative;

      h1 {
        font-size: 30px;
        font-weight: 500;
        color: #b34d4b;
        margin-right: 20px;
      }

      p {
        font-size: 16px;
        font-weight: 300;
        color: #727272;
        margin-right: 20px;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        margin-right: 20px;
      }
      button {
        width: 80px;
        height: 50px;
        border-radius: 12px;
        border: none;
        background: #b34d4b;
        color: #fff;

        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#b34d4b')};
        }
      }
    }
  }
`;
