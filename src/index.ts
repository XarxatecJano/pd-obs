import { Ticket } from "./Ticket.js";
import { TicketStatus } from "./TicketStatus.js";
import { TicketService } from "./TicketService.js";

const ticket = new Ticket(
  "TCK-1042",
  "cliente@empresa.com",
  "Error al generar facturas PDF",
  TicketStatus.IN_PROGRESS
);

const ticketService = new TicketService();
ticketService.resolveTicket(ticket);
