import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { HistoricoValoresParams } from "../../../model/historicovalores.model";
import { LeituraAguaParams } from "../../../model/leitura-agua.model";
import { CondominioService } from "../../../service/condominio/condominio.service";
import { HistoricoValoresService } from "../../../service/historicovalores/historicovalores.service";
import { LeituraAguaService } from "../../../service/leitura-agua/leitura-agua.service";
import { NotificationService } from "../../../service/notification/notification.service";
import { PeriodService } from "../../../service/period/period.service";
import { BaseComponent } from "../../base.component";
import { ListLeituraAguaValoresComponent } from "../../leitura-agua-valores/list/list.component";

@Component({
  templateUrl: "./add.component.html",
  styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditLeituraAguaComponent extends BaseComponent implements OnInit {
  leituraAguaForm: UntypedFormGroup
  id: string
  isAddMode: boolean
  readonly = false;
  loading = false
  submitted = false
  datePattern = /^(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[012])[-/.](19|20)\d\d$/i
  showCondominos = false;

  condominioOptions = [
    { value: "", label: "Selecione:" },
  ]

  periodOptions = [
    { value: "", label: "Selecione:" },
  ]

  historicoValores: HistoricoValoresParams

  @ViewChild(ListLeituraAguaValoresComponent) condominos

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private leituraAguaService: LeituraAguaService,
    private notificationService: NotificationService,
    private condiminioService: CondominioService,
    private periodService: PeriodService,
    private historicoValoresService: HistoricoValoresService
  ) {
    super('TAR_LEITURAAGUA')
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.isAddMode = !this.id

    if ((!this.isAddMode && !this.canEdit()) || (this.isAddMode && !this.canAdd())) {
      this.router.navigate(["/not-found"]);
    }

    this.leituraAguaForm = this.formBuilder.group({
      id: this.formBuilder.control(this.id),
      condominio: this.formBuilder.control("", Validators.required),
      dataleitura: this.formBuilder.control("", [Validators.required]),
      datavencimento: this.formBuilder.control("", [Validators.required]),
      period_id: this.formBuilder.control("", [Validators.required]),
    })

    this.getCondominios()
    this.getPeriods()
    this.getHistoricoValores()

    if (!this.isAddMode) {
      this.leituraAguaService
        .getById(this.id)
        .pipe(first())
        .subscribe((x: any) => {
          this.leituraAguaForm.patchValue(x)
          this.showCondominos = true
        })
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.leituraAguaForm.invalid) {
      return this.notificationService.showError("Preencha os campos obrigatórios", "Erro");
    }

    this.loading = true
    this.leituraAguaForm.value.condominio = this.leituraAguaForm.value.condominio
    this.isAddMode ? this.create() : this.update();
  }

  private create() {
    this.leituraAguaService
      .create(this.leituraAguaForm.value)
      .pipe(first())
      .subscribe({
        next: (ret: LeituraAguaParams) => {
          this.condominos.submit(ret.id).then(() => {
            this.notificationService.showSuccess("Leitura cadastrada com sucesso", "Sucesso");
            this.router.navigate(["/leituraagua"]);
          })
        },
        error: error => {
          this.notificationService.showError(error.error.message, "Erro");
          this.loading = false;
        }
      });
  }

  private async update() {
    this.leituraAguaService
      .update(this.leituraAguaForm.value)
      .pipe(first())
      .subscribe({
        next: async (ret: LeituraAguaParams) => {
          await this.condominos.update(ret.id).then(() => {
            this.notificationService.showSuccess("Leitura atualizada com sucesso", "Sucesso");
          })

          this.router.navigate(["/leituraagua"]);
        },
        error: error => {
          this.notificationService.showError(error.error.message, "Erro");
          this.loading = false
        }
      });
  }

  public async findCondominos() {
    if (new Date(this.leituraAguaForm.value.datavencimento) < new Date(this.leituraAguaForm.value.dataleitura)) { 
      return this.notificationService.showError("Data de vencimento deve ser maior que a data de leitura", "Erro");
    }

    await this.isUniqueDataLeitura()
  }

  private getCondominios() {
    this.condiminioService.getAll().pipe(first()).subscribe(
      data => {
        let options = data.map(x => {
          return { value: x.id, label: x.name }
        })

        this.condominioOptions = this.condominioOptions.concat(options)
      }
    )
  }

  private getPeriods() {
    this.periodService.getAll().pipe(first()).subscribe(
      data => {
        let options = data.map(x => {
          return { value: x.id, label: x.name }
        })

        this.periodOptions = this.periodOptions.concat(options)
      }
    )
  }

  getHistoricoValores() {
    if (!this.id) {
     return
    }

    this.historicoValoresService.getByLeitura(Number(this.id)).pipe(first()).subscribe(
      data => {
        this.historicoValores = data
      }
    )
  }

  getCondominio() {
    return this.leituraAguaForm.value.condominio
  }

  isValidForm() {
    return this.leituraAguaForm.valid;
  }

  getDataLeitura() {
    return this.leituraAguaForm.value.dataleitura
  }

  getDataVencimento() {
    return this.leituraAguaForm.value.datavencimento
  }

  getHistoricoValoresCondominio() {
    return this.historicoValores
  }

  isEnabledEdit() {
    return !this.isAddMode && (new Date(this.leituraAguaForm.value.datavencimento) < new Date());
  }

  public formatDateBr(date: string): string {
    return date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
  }

  private async isUniqueDataLeitura() {
    return this.leituraAguaService.isUniqueDataLeitura(this.leituraAguaForm.value.condominio, this.leituraAguaForm.value.dataleitura).pipe(first()).subscribe(
      (data : any) => {
        if (!data.unique) {
          this.notificationService.showWarning("Já existe uma leitura cadastrada para o mês-ano informado!", "Atenção");
          this.loading = false;
        } else {
          this.showCondominos = true;
        }
      },
    );
  }

  setShowCondominos(val: boolean) {
    this.showCondominos = val;
  }

  get f() { return this.leituraAguaForm.controls }
}