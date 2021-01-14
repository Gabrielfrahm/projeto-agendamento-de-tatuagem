import styled from 'styled-components';

export const Container = styled.div`
  background: #504642;
  border-radius: 12px;
  padding: 5px;
  width: 100%;

  border: 2px solid #504642;
  color: #504642;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 20px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #fff;

    &::placeholder {
      color: #666360;
    }
  }
`;
