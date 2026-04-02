export class AnalyticsService {
  registerResolvedTicket(ticketId: string): void {
    console.log(`Evento registrado en analítica para ticket resuelto: ${ticketId}`);
  }
}
