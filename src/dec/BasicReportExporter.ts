import { ReportExporter } from "./ReportExporter.js";

export class BasicReportExporter implements ReportExporter {

    exportReport(content:String):String {
        return content;
    }
}