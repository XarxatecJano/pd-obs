export class TeamNotifier {
  notifyResolution(ticketId: string, title: string): void {
    console.log(`Mensaje enviado al canal interno: Ticket resuelto -> ${ticketId} - ${title}`);
  }
}
