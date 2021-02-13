import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import {
  Container,
  Content,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  NextAppointment,
  Calender,
  Section,
  Appointment,
} from './styles';

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
        <Schedule>
          <h1>Atendimentos</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 13</span>
            <span>Domingo</span>
          </p>
          <NextAppointment>
            <strong>Cliente a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />
              <strong>{user.name} Marques</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  09:00
                </span>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  09:00
                </span>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calender>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calender>
      </Content>
    </Container>
  );
};

export default DashboardProvider;
