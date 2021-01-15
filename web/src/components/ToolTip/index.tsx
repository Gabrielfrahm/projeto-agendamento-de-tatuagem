import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  // class name nesse caso e para poder herdar a estilização do erro que esta dentro do input
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
