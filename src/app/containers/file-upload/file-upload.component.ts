import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { LeituraAguaValoresParams } from "../../model/leitura-agua-valores.model";
@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  @Input() requiredFileType: string;
  @Input() condomino: LeituraAguaValoresParams
  @Input() fileId: number;
  @Input() leituraId: number;

  fileName: string = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("leituraId", this.leituraId.toString());
      formData.append("condominoId", this.condomino.condominoId.toString());
    }
  }

  downloadFile(fileId: number) {
    console.log('downloadFile', fileId);
  }

  deleteFile(fileId: number) {
    console.log('deleteFile', fileId);
  }
}