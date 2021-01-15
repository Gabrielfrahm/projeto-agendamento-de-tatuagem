import styled, { css } from 'styled-components';
import Tooltip from '../ToolTip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #504642;
  border-radius: 12px;
  padding: 8px;
  width: 100%;

  border: 2px solid #504642;
  color: #fff;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 20px;
  }
  // cor da borda em vermelho sempre que da erro
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  // focus no input mudando da cor do ícone quanto a cor do input
  ${props =>
    props.isFocused &&
    css`
      color: #fff;
      border-color: #fff;
    `}

  // caso tenha texto no input ele mantém o ícone com uma cor branca
  ${props =>
    props.isFilled &&
    css`
      color: #b34d4b;
    `}

  input {
    flex: 1;
    border: 0;
    background-color: transparent;
    color: #fff;
    outline: none;
    font-size: 18px;

    &::placeholder {
      color: #fff;
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
