import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'leitura-agua-report',
  templateUrl: './leitura-agua-report.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class LeituraAguaReportComponent implements OnInit {
  filterForm: FormGroup

  dataInicial = undefined;
  dataFinal = undefined;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      dataInicial: this.formBuilder.control("", [Validators.required]),
      dataFinal: this.formBuilder.control("", [Validators.required])
    })
  }
}