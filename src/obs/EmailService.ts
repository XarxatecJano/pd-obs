export class EmailService {
  sendResolutionEmail(email: string, ticketId: string): void {
    console.log(`Email enviado a ${email} para informar que el ticket ${ticketId} ha sido resuelto.`);
  }
}
