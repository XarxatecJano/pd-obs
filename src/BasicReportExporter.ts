import { ReportExporter } from "./ReportExporter.js";

class BasicReportExporter implements ReportExporter {

    exportReport(content:String) {
        return content;
    }
}