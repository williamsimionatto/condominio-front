import { Component, Input, OnInit } from "@angular/core";
import { CondominioParams } from "../../../model/condominio.model";

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
  constructor() {}

  ngOnInit() {}
}