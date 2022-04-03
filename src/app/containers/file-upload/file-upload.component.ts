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

  fileName: string = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(file)
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
      
    //     this.uploadSub = upload$.subscribe(event => {
    //       if (event.type == HttpEventType.UploadProgress) {
    //         this.uploadProgress = Math.round(100 * (event.loaded / event.total));
    //       }
    //     })
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}