import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { LeituraAguaValoresParams } from "../../model/leitura-agua-valores.model";
import { LocalStorageService } from "../../service";
import { FileDownloadService } from "../../service/file-download/file-download.service";
import { NotificationService } from "../../service/notification/notification.service";
@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {
  @Input() condomino: LeituraAguaValoresParams

  fileName: string = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(
    private fileService: FileDownloadService,
    private notificationService: NotificationService
  ) {}

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      this.condomino.fileName = '';
      this.condomino.fileId = null;
      formData.append("file", file);
      formData.append("leituraId", this.condomino.leituraagua.toString());
      formData.append("condominoId", this.condomino.condominoId.toString());

      this.fileService.save(formData, this.condomino.leituraagua.toString()).pipe(first()).subscribe(
        (response: any) => {
          this.notificationService.showSuccess(response.message, "Sucesso");
          this.condomino.fileName = file.name;
          this.condomino.fileId = response.fileId;
        }
      );
    }
  }

  downloadFile() {
    this.fileService.getById(this.condomino.leituraagua).pipe(first()).subscribe(
        (response: any) =>{
          console.log(response)
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', this.condomino.fileName);
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    );
  }

  deleteFile() {
    this.fileService.delete(this.condomino.leituraagua.toString()).pipe(first()).subscribe(
      (response: any) => {
        this.notificationService.showSuccess(response.message, "Sucesso");
        this.condomino.fileName = '';
        this.condomino.fileId = null;
      }
    );
  }
}