import { ReportExporter } from "./ReportExporter.js";

export class ReportExporterDecorator implements ReportExporter {
  
  protected wrapped: ReportExporter;
  
  constructor(wrapped: ReportExporter) {
    this.wrapped = wrapped;
  }

  exportReport(content: String): String {
    return this.wrapped.exportReport(content);
  }
}