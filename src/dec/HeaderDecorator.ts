import { ReportExporterDecorator } from "./ReportExporterDecorator.js";

export class HeaderDecorator extends ReportExporterDecorator {
  exportReport(content: String): String {
    const result = super.exportReport(content);
    return "[CABECERA_EMPRESA]\n" + result;
  }
}