import React, { useCallback, useEffect, useState } from 'react';
import { FiCalendar, FiPower } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
  ProviderList,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  phone: string;
}

const DashboardCustomer: React.FC = () => {
  const { user, signOut } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get(`/appointments-providers`).then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigationCreateAppointment = useCallback(
    (providerId: string) => {
      history.push(`/createAppointment`, { providerId });
    },
    [history],
  );

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
        <ProviderList>
          <h1>Tatuadores</h1>
          {providers.map(provider => (
            <div key={provider.id}>
              <h1>{provider.name}</h1>
              {provider.avatar_url ? (
                <img src={provider.avatar_url} alt={provider.name} />
              ) : (
                <p>Sem Imagem de perfil</p>
              )}
              <a
                href={`https://api.whatsapp.com/send?phone=${provider.phone}`}
                target="blank"
              >
                <IoLogoWhatsapp size={25} color="#64B387" />
              </a>
              <button
                type="button"
                onClick={() => navigationCreateAppointment(provider.id)}
              >
                <FiCalendar size={25} />
              </button>
            </div>
          ))}
        </ProviderList>
      </Content>
    </Container>
  );
};

export default DashboardCustomer;
