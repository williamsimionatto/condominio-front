import { Component, Input, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { CondominioParams } from "../../../model/condominio.model";
import { LeituraAguaValoresParams } from "../../../model/leitura-agua-valores.model";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";
import { NotificationService } from "../../../service/notification/notification.service";

type Totalizadores = {
  consumo: number;
  condominio: number;
  usoSalaoFesta: number;
  limpezaSalaoFesta: number;
  taxaMudanca: number;
  total: number;
}

@Component({
  selector: "app-list-leitura-agua-valores",
  templateUrl: "./list.component.html",
  styleUrls: [
    "../../../../assets/css/default.scss",
    '../../../../assets/css/master-detail.scss',
  ]
})
export class ListLeituraAguaValoresComponent implements OnInit {
  @Input() condominioId: string
  @Input() dataLeitura: string
  @Input() idLeitura: string

  condominos: LeituraAguaValoresParams[] = []
  condominio: CondominioParams = null
  totalTalizadores: Totalizadores = {
    consumo: 0,
    condominio: 0,
    usoSalaoFesta: 0,
    limpezaSalaoFesta: 0,
    taxaMudanca: 0,
    total: 0
  }

  constructor(
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private condominioService: CondominioService,
    private leituraAguaService: LeituraAguaService
  ) {}

  ngOnInit() {
    this.getCondominio(this.condominioId)

    if (this.idLeitura == undefined) {
      this.getValores()
    } else {
      this.getValoresCondominos()
    }
  }

  public async submit(idLeitura: string) {
    this.condominos.map(condominoData => {
      let data = {
        id: condominoData.id,
        leituraagua: idLeitura,
        condominio: this.condominio.id,
        condominoId: condominoData.condominoId,
        consumo: condominoData.consumoAtual,
        condomino: condominoData.condomino,
        valorsalaofestas: condominoData.valorsalaofestas,
        valorlimpezasalaofestas: condominoData.valorlimpezasalaofestas,
        valormudanca: condominoData.valormudanca
      }

      this.leituraAguaService.save(data).pipe(first()).subscribe(() => {
        console.log('salvo')
      })
    })
  }

  public async update() {
    console.log('entrou update')
  }

  private formatDate(date: string): string {
    let d = date.split("/")
    return d[2] + "-" + d[1] + "-" + d[0]
  }

  public async getValores() {
    this.leituraAguaService.getValores(this.idLeitura, this.formatDate(this.dataLeitura)).pipe(first()).subscribe(valores => {
      this.condominos = valores
      this.condominos.forEach(condomino => {
        condomino.consumo = parseFloat(condomino.consumo.toString())
        this.atualizaTotal(condomino)
        this.atualizaTotalizadores(condomino)
      })
    })
  }

  public async getValoresCondominos() {
    this.leituraAguaService.getValoresCondominos(this.idLeitura, this.formatDate(this.dataLeitura)).pipe(first()).subscribe(valores => {
      this.condominos = valores

      this.condominos.forEach(condomino => {
        condomino.consumo = parseFloat(condomino.consumo.toString())
        this.atualizaTotal(condomino)
        this.atualizaTotalizadores(condomino)
      })
    })
  }

  async getCondominio(id: string) {
    this.condominioService.getById(id).pipe(first()).subscribe(condominio => {
      this.condominio = condominio
    })
  }

  // 08/03/2022
  updateConsumo(condomino: LeituraAguaValoresParams) {
    let consumoAtual = parseFloat((document.getElementById("valorconsumoatual_"+condomino.condomino) as HTMLInputElement).value) | 0
    let consumo = this.calculaDiferencaConsumo(condomino.consumoAnterior, consumoAtual)

    this.totalTalizadores.consumo = 0
    this.totalTalizadores.total = 0

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].consumoAtual = consumoAtual
    this.condominos[index].consumo = consumo

    this.atualizaTotal(condomino)
    this.condominos.forEach(condomino => {
      this.totalTalizadores.consumo += parseFloat(condomino.consumo.toString())
      this.totalTalizadores.total += condomino.total

    })
  }

  calculaDiferencaConsumo(consumoAnterior: number, consumoAtual: number) {
    return consumoAtual - consumoAnterior
  }

  isChecked(valor) {
    return  valor > 0
  }

  atualizaTotalizadores(condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.consumo += condomino.consumo
    this.totalTalizadores.condominio += condomino.valorcondominio
    this.totalTalizadores.usoSalaoFesta += condomino.valorsalaofestas
    this.totalTalizadores.limpezaSalaoFesta += condomino.valorlimpezasalaofestas
    this.totalTalizadores.taxaMudanca += condomino.valormudanca
    this.totalTalizadores.total += condomino.total
  }

  atualizaTaxaUsoSalaoFestas(event, condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.usoSalaoFesta -= condomino.valorsalaofestas
    this.totalTalizadores.total -= condomino.valorsalaofestas

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valorsalaofestas = event.target.checked ? this.condominio.valorsalaofestas : 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.usoSalaoFesta += condomino.valorsalaofestas
    this.totalTalizadores.total += condomino.valorsalaofestas
  }

  atualizaTaxaLimpezaSalaoFestas(event, condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.limpezaSalaoFesta -= condomino.valorlimpezasalaofestas
    this.totalTalizadores.total -= condomino.valorlimpezasalaofestas

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valorlimpezasalaofestas = event.target.checked ? this.condominio.valorlimpezasalaofestas : 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.limpezaSalaoFesta += condomino.valorlimpezasalaofestas
    this.totalTalizadores.total += condomino.valorlimpezasalaofestas
  }

  atualizaTaxaMudanca(event, condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.taxaMudanca -= condomino.valormudanca
    this.totalTalizadores.total -= condomino.valormudanca

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].valormudanca = event.target.checked ? this.condominio.valormudanca : 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.taxaMudanca += condomino.valormudanca
    this.totalTalizadores.total += condomino.valormudanca
  }

  atualizaTotal(condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    let condominio = this.condominos[index]

    let total = (parseFloat(condomino.consumo.toString()) * condominio.valoragua) +
                parseFloat(condominio.taxabasicaagua.toString()) + 
                parseFloat(condominio.taxaboleto.toString()) +
                condominio.valorcondominio + 
                condominio.valorsalaofestas +
                condominio.valorlimpezasalaofestas +
                condominio.valormudanca

    condominio.total = parseFloat((Math.round(total * 100) / 100).toFixed(2));
  }
}