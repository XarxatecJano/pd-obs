/*import { Ticket } from "./obs/Ticket.js";
import { TicketStatus } from "./obs/TicketStatus.js";
import { TicketService } from "./obs/TicketService.js";

const ticket = new Ticket(
  "TCK-1042",
  "cliente@empresa.com",
  "Error al generar facturas PDF",
  TicketStatus.IN_PROGRESS
);

const ticketService = new TicketService();
ticketService.resolveTicket(ticket);*/

import { ReportService } from "./ReportService.js";


let reportService: ReportService = new ReportService();

let result: String = reportService.exportReport("Ventas del mes: 12000€", true,true,false,true);

console.log(result);
