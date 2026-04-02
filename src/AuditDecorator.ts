import { ReportExporterDecorator } from "./ReportExporterDecorator.js";

export class AuditDecorator extends ReportExporterDecorator {
  exportReport(content: String): String {
    const result = super.exportReport(content);
    return result + "\n[AUDIT]";
  }
}