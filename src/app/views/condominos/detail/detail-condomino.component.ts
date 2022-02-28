import { Component, OnInit } from "@angular/core";
import { CondominoParams } from "../../../model/condomino.model";

@Component({
  selector: "app-detail-condomino",
  templateUrl: "./detail-condomino.component.html",
  styleUrls: [
    '../../../../assets/css/default.scss',
    '../../../../assets/css/master-detail.scss',
  ]
})
export class DetailCondominosComponent implements OnInit {
  condominos: CondominoParams[] = [
    {
      id: 4,
      apartamento: 101,
      condominio: 4,
      nome: "João da Silva",
      cpf: "123.456.789-00",
      sindico: true,
      tipo: "Apartamento",
      numeroquartos: 2,
    },
    {
      id: 14,
      apartamento: 201,
      condominio: 4,
      nome: "Maria da Silva",
      cpf: "987.654.321-00",
      sindico: false,
      tipo: "Apartamento",
      numeroquartos: 3,
    }
  ]

  condominosSelected: CondominoParams[] = [];

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    console.log('submit detail')  
  }

  hasCondominoSelected() {
    return this.condominosSelected.length > 0;
  }

  enableCountLabel() {
    return this.condominosSelected.length > 1;
  }

  enableAddButton() {
    return this.condominosSelected.length >= 0;
  }

  countRegistros() {
    return `${this.condominosSelected.length} registros`;
  }

  selectCondomino(condomino: CondominoParams) {
    if (this.condominosSelected.find(c => c.id === condomino.id)) {
      this.condominosSelected.splice(this.condominosSelected.indexOf(condomino), 1);
    } else {
      this.condominosSelected.push(condomino);
    }
  }

  isCondominoSelected(condomino: CondominoParams) {
    return this.condominosSelected.find(c => c.id === condomino.id);
  }

  removeCondomino() {
    this.condominosSelected.forEach(condomino => {
      this.condominos.splice(this.condominos.indexOf(condomino), 1);
      this.condominosSelected.splice(this.condominosSelected.indexOf(condomino), 1);
    });
  }
}
