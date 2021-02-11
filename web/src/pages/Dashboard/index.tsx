import React from 'react';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <img src={user.avatar_url} alt="dale" />
    </>
  );
};

export default Dashboard;
