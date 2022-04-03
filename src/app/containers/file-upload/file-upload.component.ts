import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { CondominoParams } from "../../model/condomino.model";

@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  @Input()
  requiredFileType: string;
  @Input()
  condomino: CondominoParams
  @Input()
  fileId: number;

  fileName: string = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
    //     const formData = new FormData();
    //     formData.append("thumbnail", file);

    //     const upload$ = this.http.post("/api/thumbnail-upload", formData, {
    //         reportProgress: true,
    //         observe: 'events'
    //     })
    //     .pipe(
    //         finalize(() => this.reset())
    //     );
    }
  }

  downloadFile(fileId: number) {
    console.log('downloadFile', fileId);
  }

  deleteFile(fileId: number) {
    console.log('deleteFile', fileId);
  }
}