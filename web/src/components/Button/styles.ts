import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 35px;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: none;
  background: #b34d4b;
  color: #fff;
  font-size: 24px;
  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#b34d4b')};
  }
`;
