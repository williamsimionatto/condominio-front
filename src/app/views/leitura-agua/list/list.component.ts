import { Component, OnInit } from "@angular/core";
import { LeituraAguaParams } from "../../../model/leitura-agua.model";

@Component({
  selector: 'app-list-leitura-agua',
  templateUrl: './list.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListLeituraAguaComponent implements OnInit {
  leituraAgua = [
    {
      id: 1,
      dataleitura: "01/01/2019",
      datavencimento: "01/01/2019",
      condominio: 'Madre Paulina'
    }
  ]

  constructor(
  ) {}

  ngOnInit() {

  }

  delete(leituraAgua: LeituraAguaParams) {
  
  }
}