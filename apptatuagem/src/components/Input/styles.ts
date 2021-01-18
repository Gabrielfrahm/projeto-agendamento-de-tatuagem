import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #504642;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px ;
  border-color: #504642;

  flex-direction: row;
  align-items: center;


  ${props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-color: #fff;
  `}


`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 20px;
  font-family: 'BigShouldersStencilText-Regular'
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
