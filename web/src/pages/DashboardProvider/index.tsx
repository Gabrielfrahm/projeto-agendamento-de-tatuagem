import React from 'react';
import { FiPower } from 'react-icons/fi';
// import { GiVikingChurch } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import { Container, Content, Header, HeaderContent, Profile } from './styles';

const DashboardProvider: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <p>Bem-Vindo</p>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <h1>ola</h1>
      </Content>
    </Container>
  );
};

export default DashboardProvider;
