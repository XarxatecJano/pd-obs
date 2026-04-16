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

/*import { ReportService } from "./ReportService.js";


let reportService: ReportService = new ReportService();

let result: String = reportService.exportReport("Ventas del mes: 12000€", true,true,false,true);

console.log(result);*/

import { AuditDecorator } from "./AuditDecorator.js";
import { BasicReportExporter } from "./BasicReportExporter.js";
import { HeaderDecorator } from "./HeaderDecorator.js";
import { ReportExporter } from "./ReportExporter.js";

type DecoratorType = "HEADER" | "ENCRYPTION" | "COMPRESSION" | "AUDIT";

const decoratorMap: Record<DecoratorType, (exp: ReportExporter) => ReportExporter> = {
  HEADER: (exp) => new HeaderDecorator(exp),
  ENCRYPTION: (exp)=>  new BasicReportExporter(),
  COMPRESSION: (exp) => new BasicReportExporter(),
  AUDIT: (exp) => new AuditDecorator(exp),
};

function buildExporterFromList(types: DecoratorType[]): ReportExporter {
  let exporter: ReportExporter = new BasicReportExporter();

  for (const type of types) {
    exporter = decoratorMap[type](exporter);
  }

  return exporter;
}

const exporter = buildExporterFromList([
  "HEADER",
  "AUDIT"
]);

console.log(exporter.exportReport("Ventas: 12000€"));