import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #201e1e;
  @media (max-width: 600px) {
    padding: 20px 0;
    background: #201e1e;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    span {
      display: none;
    }

    button {
      margin-right: 20px;
    }
  }

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
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
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

export const Content = styled.div``;
