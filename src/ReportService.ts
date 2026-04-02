import { ReportExporter } from "./ReportExporter.js";

export class ReportService {

     exportReport(content:String, addHeader:Boolean, encrypt:Boolean,compress:Boolean, addAuditInfo:Boolean) {

        let result:String  = content;

        if (addHeader) {
            result = this.addCorporateHeader(result);
        }

        if (encrypt) {
            result = this.encrypt(result);
        }

        if (compress) {
            result = this.compress(result);
        }

        if (addAuditInfo) {
            result = this.addAuditInfo(result);
        }

        return result;
    }

   addCorporateHeader(content:String):String {
        return "[CABECERA_EMPRESA]\n" + content;
    }

    encrypt(content:String):String {
        return "ENCRYPTED(" + content + ")";
    }

    private compress(content:String):String {
        return "COMPRESSED(" + content + ")";
    }

    private addAuditInfo(content:String):String {
        return content + "\n[AUDIT: exportado por sistema]";
    }
}