import { Component, Input, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { CondominioParams } from "../../../model/condominio.model";
import { LeituraAguaValoresParams } from "../../../model/leitura-agua-valores.model";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";
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
  @Input() dataLeitura
  @Input() idLeitura

  condominos: LeituraAguaValoresParams[] = []
  condominio: CondominioParams = null

  constructor(
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private condominioService: CondominioService,
    private leituraAguaService: LeituraAguaService
  ) {}

  ngOnInit() {
    this.getCondominio(this.condominioId)
    this.getValores()
  }

  private formatDate(date: string): string {
    let d = date.split("/")
    return d[2] + "-" + d[1] + "-" + d[0]
  }

  public async getValores() {
    this.leituraAguaService.getValores(this.idLeitura, this.formatDate(this.dataLeitura)).pipe(first()).subscribe(valores => {
      this.condominos = valores
      this.condominos.forEach(condomino => {
        this.atualizaTotal(condomino)
      })
    })
  }

  async getCondominio(id: string) {
    this.condominioService.getById(id).pipe(first()).subscribe(condominio => {
      this.condominio = condominio
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

  isChecked(valor) {
    return  valor > 0
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
                parseFloat(condominio.taxabasicaagua.toString()) + 
                parseFloat(condominio.taxaboleto.toString()) +
                condominio.valorcondominio + 
                condominio.valorsalaofestas +
                condominio.valorlimpezasalaofestas +
                condominio.valormudanca

    condominio.total = parseFloat((Math.round(total * 100) / 100).toFixed(2));
  }
}