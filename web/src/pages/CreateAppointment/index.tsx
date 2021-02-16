import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiArrowLeft, FiPower } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  ProviderListContainer,
  ProviderList,
  ProviderContainer,
  ProviderName,
  Calender,
  Schedule,
  Section,
  SectionContent,
  Hour,
  HourText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user, signOut } = useAuth();
  const route = useLocation();
  const history = useHistory();
  const params = route.state as RouteParams;

  const { addToast } = useToast();

  const [providers, setProviders] = useState<Provider[]>([]);

  const [selectedProvider, setSelectedProvider] = useState(params.providerId);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedHour, setSelectedHour] = useState(0);

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  useEffect(() => {
    api.get('/appointments-providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/appointments-providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        setMonthAvailability(response.data);
      });
  }, [setSelectedDate, selectedProvider, selectedDate]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifies: DayModifiers) => {
    if (modifies.available && !modifies.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
          available,
        };
      });
  }, [availability]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post(`/appointments`, {
        provider_id: selectedProvider,
        date,
      });

      addToast({
        type: `success`,
        title: 'agendamento realizado com sucesso',
      });

      history.goBack();
    } catch (err) {
      addToast({
        type: `error`,
        title: 'erro ao cria um agendamento',
        description:
          'Ocorreu um erro ao tentar criar um agendamento, tente novamente',
      });
    }
  }, [selectedDate, selectedHour, selectedProvider, addToast, history]);
  return (
    <>
      <Container>
        <Link to="/dashboardCustomer">
          <FiArrowLeft color="#fff" size={35} />
        </Link>
        <Header>
          <HeaderContent>
            <Profile>
              <img src={user.avatar_url} alt={user.name} />
              <div>
                <p>Bem-Vindo</p>
                <Link to="/customers/profile">
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
          <ProviderListContainer>
            <ProviderList>
              {providers.map(provider => (
                <ProviderContainer
                  key={provider.id}
                  type="button"
                  onClick={() => handleSelectProvider(provider.id)}
                  selected={provider.id === selectedProvider}
                >
                  <img src={provider.avatar_url} alt={provider.name} />
                  <ProviderName selected={provider.id === selectedProvider}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              ))}
            </ProviderList>
          </ProviderListContainer>
          <Calender>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [] }, ...disabledDays]}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              onDayClick={handleDateChange}
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
          <Schedule>
            <Section>
              <SectionContent>
                <p>Manha</p>
                {morningAvailability.map(
                  ({ hourFormatted, available, hour }) => (
                    <Hour
                      // enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onClick={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
              <SectionContent>
                <p>Tarde</p>
                {afternoonAvailability.map(
                  ({ hourFormatted, available, hour }) => (
                    <Hour
                      // enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                      onClick={() => handleSelectHour(hour)}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>
          <Button type="submit" onClick={handleCreateAppointment}>
            Agendar
          </Button>
        </Content>
      </Container>
    </>
  );
};

export default CreateAppointment;
