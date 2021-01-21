import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    // usando injeção de dependências
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      customer_id: user_id,
      date: parseISO(date),
    });

    return response.json(classToClass(appointment));
  }
}
