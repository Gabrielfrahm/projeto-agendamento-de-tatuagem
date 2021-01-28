import { inject, injectable } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import path from 'path';
import AppError from '@shared/error/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  customer_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute({
    provider_id,
    customer_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a  past date");
    }

    if (customer_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError('You can only create appointment between 8am and 6pm');
    }

    const providerExists = await this.providerRepository.findById(provider_id);

    if (!providerExists) {
      throw new AppError('Providers is not existing');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      customer_id,
      date: appointmentDate,
    });

    // o caminho do template do email
    const createAppointmentTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'create_appointment.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: providerExists.name,
        email: providerExists.email,
      },
      subject: '[Equipe Tattoo] you are a new appointment',
      templateData: {
        file: createAppointmentTemplate,
        variables: {
          name: providerExists.name,
          date: format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h' "),
        },
      },
    });

    return appointment;
  }
}

export default CreateAppointmentService;
