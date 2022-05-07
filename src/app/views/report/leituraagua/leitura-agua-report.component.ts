import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Chart } from "angular-highcharts";
import { first } from "rxjs/operators";
import { CondominoParams } from "../../../model/condomino.model";
import { UserParamsAuth } from "../../../model/user.model";
import { LocalStorageService } from "../../../service";
import { CondominoService } from "../../../service/condomino/condomino.service";
import { FileDownloadService } from "../../../service/file-download/file-download.service";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: 'leitura-agua-report',
  templateUrl: './leitura-agua-report.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class LeituraAguaReportComponent implements OnInit {
  filterForm: FormGroup
  loading = false
  data = null
  condominos: CondominoParams[]
  public user: UserParamsAuth;

  constructor(
    private formBuilder: FormBuilder,
    private leituraService: LeituraAguaService,
    private fileService: FileDownloadService,
    private condominoService: CondominoService,
    private localStorageService: LocalStorageService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.localStorageService.getItem('user'));
    this.condominoService.getAll().pipe(first()).subscribe(x => {
      this.condominos = x
      this.condominos.map(x => {
        x.name = x.apartamento + ' - ' + x.name
      })

      if (this.user.perfil.sigla == 'COND') {
        let condomino = this.condominos.filter(x => x.cpf == this.user.cpf)
        if (condomino.length === 1) {
          this.f.condomino.setValue(condomino[0].id);
          this.filterForm.get('condomino').disable();
        } else {
          this.condominos = condomino;
        }
      }
    })

    this.filterForm = this.formBuilder.group({
      dataInicial: this.formBuilder.control("", [Validators.required]),
      dataFinal: this.formBuilder.control("", [Validators.required]),
      condomino: this.formBuilder.control("", (this.user.perfil.sigla === 'COND') ? [Validators.required] : [])
    })
  }

  filter() {
    this.loading = true

    this.leituraService
      .report(this.f.dataInicial.value, this.f.dataFinal.value, this.f.condomino.value)
      .pipe(first())
      .subscribe( (x) => {
        this.data = x  
        this.changeDetector.detectChanges();
      }, (error) => {
        console.log(error)
      })

    this.loading = false
  }

  downloadFile(id: number, name: string) {
    this.fileService.getById(id.toString()).pipe(first()).subscribe(
      (response: any) =>{
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
    },
    (error) => {
      this.notificationService.showError('Erro', 'Erro ao baixar arquivo')
    });
  }

  public formatDateBr(date: string): string {
    return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
  }

  public dateFull(date: string): string {
    const newDate = new Date(date)
    const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${month}/${year}`
  }

  get f() { return this.filterForm.controls }
}