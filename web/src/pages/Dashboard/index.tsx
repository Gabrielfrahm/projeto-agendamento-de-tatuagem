import React from 'react';
import './styles';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return <h1>{user.email}</h1>;
};

export default Dashboard;
