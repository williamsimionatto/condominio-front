import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { LeituraAguaValoresParams } from "../../model/leitura-agua-valores.model";
import { LocalStorageService } from "../../service";
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
  private localStorageService: LocalStorageService =  new LocalStorageService()
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
    this.http.get(`http://127.0.0.1:8000/api/leituraagua/condominos/${this.condomino.leituraagua}/boleto`, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getItem('token')
      },
      responseType: 'blob'
    }).pipe(first()).subscribe(
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

  deleteFile(fileId: number) {
    console.log('deleteFile', fileId);
  }
}