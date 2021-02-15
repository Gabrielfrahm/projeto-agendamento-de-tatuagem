import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format, isAfter, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
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

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;

  customer: {
    name: string;
    avatar_url: string;
  };
}

const DashboardProvider: React.FC = () => {
  const { user, signOut } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifies: DayModifiers) => {
    if (modifies.available && !modifies.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/appointments-providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

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

  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        // formata a data para mostrar apenas a hora e os minutos
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        // para mostrar os agendamentos em horário corretos
        appointmentsFormatted.sort((a, b) =>
          a.hourFormatted < b.hourFormatted ? -1 : 1,
        );

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  // formata o dia é o mes selecionado no calendário
  const selectedDateText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointment = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointment = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <p>Bem-Vindo</p>
              <Link to="/providers/profile">
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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Cliente a seguir</strong>
              <div>
                <img
                  src={nextAppointment?.customer.avatar_url}
                  alt={nextAppointment.customer.name}
                />
                <strong>{nextAppointment.customer.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointment.length === 0 && (
              <p>Nenhum agendamento nesse período</p>
            )}

            {morningAppointment.map(appointment => (
              <Appointment>
                <div>
                  <img
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />

                  <strong>{appointment.customer.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>

            {afternoonAppointment.length === 0 && (
              <p>Nenhum agendamento nesse período</p>
            )}

            {afternoonAppointment.map(appointment => (
              <Appointment>
                <div>
                  <img
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />

                  <strong>{appointment.customer.name}</strong>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
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
      </Content>
    </Container>
  );
};

export default DashboardProvider;
