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
        consumoAnterior: condominoData.consumoAnterior,
        qtdmudanca: condominoData.qtdmudanca,
        qtdlimpezasalao: condominoData.qtdlimpezasalao,
        qtdusosalao: condominoData.qtdusosalao,
      }

      this.leituraAguaService.save(data).pipe(first()).subscribe(() => {
      })
    })
  }

  public async update(idLeitura: string) {
    this.condominos.map(condominoData => {
      let data = {
        id: condominoData.id,
        leituraagua: idLeitura,
        condominio: this.condominio.id,
        condominoId: condominoData.condominoId,
        consumo: condominoData.consumoAtual,
        condomino: condominoData.condomino,
        consumoAnterior: condominoData.consumoAnterior,
        qtdmudanca: condominoData.qtdmudanca,
        qtdlimpezasalao: condominoData.qtdlimpezasalao,
        qtdusosalao: condominoData.qtdusosalao,
      }

      this.leituraAguaService.updateValores(idLeitura, data).pipe(first()).subscribe(() => {
      })
    })
  }

  public async getValores() {
    this.leituraAguaService.getValores(this.idLeitura, this.dataLeitura).pipe(first()).subscribe(valores => {
      this.condominos = valores
      this.condominos.forEach(condomino => {
        condomino.consumo = parseFloat(condomino.consumo.toString())
        this.atualizaTotal(condomino)
        this.atualizaTotalizadores(condomino)
      })
    })
  }

  public async getValoresCondominos() {
    this.leituraAguaService.getValoresCondominos(this.idLeitura,this.dataLeitura).pipe(first()).subscribe(valores => {
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

  atualizaTotalizadores(condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.consumo += condomino.consumo
    this.totalTalizadores.condominio += condomino.valorcondominio
    this.totalTalizadores.usoSalaoFesta += this.condominio.valorsalaofestas * condomino.qtdusosalao
    this.totalTalizadores.limpezaSalaoFesta += this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao
    this.totalTalizadores.taxaMudanca += this.condominio.valormudanca * condomino.qtdmudanca
    this.totalTalizadores.total += condomino.total
  }

  atualizaTaxaUsoSalaoFestas(condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.usoSalaoFesta -= this.condominio.valorsalaofestas * condomino.qtdusosalao
    this.totalTalizadores.total -= this.condominio.valorsalaofestas * condomino.qtdusosalao

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].qtdusosalao = parseInt((document.getElementById("qtdusosalao_"+condomino.condomino) as HTMLInputElement).value) | 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.usoSalaoFesta += this.condominio.valorsalaofestas * condomino.qtdusosalao
    this.totalTalizadores.total += this.condominio.valorsalaofestas * condomino.qtdusosalao
  }

  atualizaTaxaLimpezaSalaoFestas(condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.limpezaSalaoFesta -= this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao
    this.totalTalizadores.total -= this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].qtdlimpezasalao = parseInt((document.getElementById("qtdlimpezasalao_"+condomino.condomino) as HTMLInputElement).value) | 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.limpezaSalaoFesta += this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao
    this.totalTalizadores.total += this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao
  }

  atualizaTaxaMudanca(condomino: LeituraAguaValoresParams) {
    this.totalTalizadores.taxaMudanca -= this.condominio.valormudanca * condomino.qtdmudanca
    this.totalTalizadores.total -= this.condominio.valormudanca * condomino.qtdmudanca

    let index = this.condominos.indexOf(condomino)
    this.condominos[index].qtdmudanca = parseInt((document.getElementById("qtdmudanca_"+condomino.condomino) as HTMLInputElement).value) | 0
    this.atualizaTotal(condomino)
    this.totalTalizadores.taxaMudanca += this.condominio.valormudanca * condomino.qtdmudanca
    this.totalTalizadores.total += this.condominio.valormudanca * condomino.qtdmudanca
  }

  atualizaTotal(condomino: LeituraAguaValoresParams) {
    let index = this.condominos.indexOf(condomino)
    let condominio = this.condominos[index]

    let total = (parseFloat(condomino.consumo.toString()) * this.condominio.valoragua) +
                parseFloat(this.condominio.taxabasicaagua.toString()) + 
                parseFloat(this.condominio.taxaboleto.toString()) +
                condomino.valorcondominio + 
                (this.condominio.valorsalaofestas * condomino.qtdusosalao) +
                (this.condominio.valorlimpezasalaofestas * condomino.qtdlimpezasalao) +
                (this.condominio.valormudanca * condomino.qtdmudanca)

    condominio.total = parseFloat((Math.round(total * 100) / 100).toFixed(2));
  }
}