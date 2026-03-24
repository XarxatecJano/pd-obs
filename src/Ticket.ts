import { TicketStatus } from "./TicketStatus.js";

export class Ticket {
  private id: string;
  private readonly customerEmail: string;
  private readonly title: string;
  private status: TicketStatus;

  constructor(id: string, customerEmail: string, title: string, status: TicketStatus) {
    this.id = id;
    this.customerEmail = customerEmail;
    this.title = title;
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getCustomerEmail(): string {
    return this.customerEmail;
  }

  getTitle(): string {
    return this.title;
  }

  getStatus(): TicketStatus {
    return this.status;
  }

  setStatus(status: TicketStatus): void {
    this.status = status;
  }
}
