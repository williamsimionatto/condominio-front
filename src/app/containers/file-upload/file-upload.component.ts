import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { LeituraAguaValoresParams } from "../../model/leitura-agua-valores.model";
import { LocalStorageService } from "../../service";
import { FileDownloadService } from "../../service/file-download/file-download.service";
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

  constructor(private fileService: FileDownloadService) {
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.condomino.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("leituraId", this.condomino.leituraagua.toString());
      formData.append("condominoId", this.condomino.condominoId.toString());
    }
  }

  downloadFile() {
    this.fileService.getById(this.condomino.leituraagua).pipe(first()).subscribe(
        (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', 'boleto.pdf');
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    );
  }

  deleteFile() {
  }
}