import { Component, Input, OnInit } from "@angular/core";
import { CondominioParams } from "../../../model/condominio.model";
import { HistoricoValoresParams } from "../../../model/historicovalores.model";

@Component({
  selector: "app-legenda-valores",
  templateUrl: "./legenda-valores.component.html",
  styleUrls: [
    "../../../../assets/css/default.scss",
    "./legenda-valores.css"
  ]
})
export class LegendaValoresComponent implements OnInit {
  @Input() condominio: CondominioParams
  @Input() historicoValores: HistoricoValoresParams

  valores: any
  constructor() {}

  ngOnInit() {
    this.setValores()
  }

  private setValores() {
    this.valores = this.historicoValores ? this.historicoValores : this.condominio
  }
}
