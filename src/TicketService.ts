import { Ticket } from "./Ticket.js";
import { TicketStatus } from "./TicketStatus.js";
import { EmailService } from "./EmailService.js";
import { TeamNotifier } from "./TeamNotifier.js";
import { AnalyticsService } from "./AnalyticsService.js";
import { DashboardService } from "./DashboardService.js";

export class TicketService {
  private readonly emailService = new EmailService();
  private readonly teamNotifier = new TeamNotifier();
  private readonly analyticsService = new AnalyticsService();
  private readonly dashboardService = new DashboardService();

  resolveTicket(ticket: Ticket): void {
    if (ticket.getStatus() === TicketStatus.RESOLVED) {
      throw new Error("El ticket ya está resuelto");
    }

    ticket.setStatus(TicketStatus.RESOLVED);
    console.log(`Ticket ${ticket.getId()} marcado como RESUELTO`);

    this.emailService.sendResolutionEmail(ticket.getCustomerEmail(), ticket.getId());
    this.teamNotifier.notifyResolution(ticket.getId(), ticket.getTitle());
    this.analyticsService.registerResolvedTicket(ticket.getId());
    this.dashboardService.refreshResolvedTicketsWidget();
  }
}
