import { Component, Input, OnInit } from "@angular/core";
import { CondominioParams } from "../../../model/condominio.model";
import { LeituraAguaValoresParams } from "../../../model/leitura-agua-valores.model";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: "app-list-leitura-agua-valores",
  templateUrl: "./list.component.html",
  styleUrls: [
    "../../../../assets/css/default.scss",
    '../../../../assets/css/master-detail.scss',
  ]
})
export class ListLeituraAguaValoresComponent implements OnInit {
  @Input() condominioId
  condominos: LeituraAguaValoresParams[] = []
  condominio: CondominioParams

  constructor(
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit() {
    this.condominio = {
      id: this.condominioId,
      name: "",
      cnpj: "",
      condominio2quartos: 101.84,
      condominio3quartos: 125.11,
      condominiosalacomercial: 75.65,
      valoragua: 5.73,
      valorsalaofestas: 25,
      valorlimpezasalaofestas: 25,
      valormudanca: 25,
      taxaboleto: 3.08,
      taxabasicaagua: 28.90,
    }

    this.condominos = [
      {
        id: "1",
        leituraagua: "1",
        condomino: "202",
        consumoAnterior: 1530,
        consumoAtual: 1530,
        consumo: 0,
        valorcondominio: 125.11,
        valoragua: 5.73,
        valorsalaofestas: 0.00,
        valorlimpezasalaofestas: 0.00,
        valormudanca: 0.00,
        taxaboleto: 3.08,
        taxabasicaagua: 28.90,
        total: 0
      }
    ]

    this.condominos.forEach(condomino => {
      this.atualizaTotal(condomino)
    })
  }

  updateConsumo(condomino: LeituraAguaValoresParams) {
    let consumoAtual = parseFloat((document.getElementById("valorconsumoatual") as HTMLInputElement).value)
    let consumo = this.calculaDiferencaConsumo(condomino.consumoAnterior, consumoAtual)

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].consumoAtual = consumoAtual
    this.condominos[index].consumo = consumo

    this.atualizaTotal(condomino)
  }

  calculaDiferencaConsumo(consumoAnterior: number, consumoAtual: number) {
    return consumoAtual - consumoAnterior
  }

  atualizaTaxaUsoSalaoFestas(event, condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valorsalaofestas = event.target.checked ? this.condominio.valorsalaofestas : 0
    this.atualizaTotal(condomino)
  }

  atualizaTaxaLimpezaSalaoFestas(event, condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valorlimpezasalaofestas = event.target.checked ? this.condominio.valorlimpezasalaofestas : 0
    this.atualizaTotal(condomino)
  }

  atualizaTaxaMudanca(event, condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valormudanca = event.target.checked ? this.condominio.valormudanca : 0
    this.atualizaTotal(condomino)
  }

  atualizaTotal(condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    let condominio = this.condominos[index]

    let total = (condomino.consumo * condominio.valoragua) +
                condominio.taxabasicaagua + 
                condominio.taxaboleto +
                condominio.valorcondominio + 
                condominio.valorsalaofestas +
                condominio.valorlimpezasalaofestas +
                condominio.valormudanca

    condominio.total = parseFloat((Math.round(total * 100) / 100).toFixed(2));
  }
}