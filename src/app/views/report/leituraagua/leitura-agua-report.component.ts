import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";

@Component({
  selector: 'leitura-agua-report',
  templateUrl: './leitura-agua-report.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class LeituraAguaReportComponent implements OnInit {
  filterForm: FormGroup
  loading = false
  data = null

  constructor(
    private formBuilder: FormBuilder,
    private leituraService: LeituraAguaService
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      dataInicial: this.formBuilder.control("", [Validators.required]),
      dataFinal: this.formBuilder.control("", [Validators.required])
    })
  }

  filter() {
    this.loading = true
    this.leituraService.report(this.f.dataInicial.value, this.f.dataFinal.value)
      .pipe(first())
      .subscribe(x => {
        this.data = x
      })

    this.loading = false
  }

  public formatDateBr(date: string): string {
    return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
  }

  get f() { return this.filterForm.controls }
}