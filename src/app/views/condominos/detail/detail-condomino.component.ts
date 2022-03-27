import { Component, Input, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { CondominioParams } from "../../../model/condominio.model";
import { CondominoParams } from "../../../model/condomino.model";
import { CondominoService } from "../../../service/condomino/condomino.service";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { ModalDialogService } from "../../../service/modal/modal-dialog.service";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: "app-detail-condomino",
  templateUrl: "./detail-condomino.component.html",
  styleUrls: [
    '../../../../assets/css/default.scss',
    '../../../../assets/css/master-detail.scss',
  ]
})
export class DetailCondominosComponent implements OnInit {
  condominos: CondominoParams[] = []
  condominosSelected: CondominoParams[] = [];
  @Input() readonly: boolean = false;
  @Input() condominioId: number;

  constructor(
    private condominoService: CondominoService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
    if (this.condominioId) {
      this.getCondominos();
    }
  }

  private getCondominos() {
    this.condominoService.getByCondomino(this.condominioId).pipe(first()).subscribe(condominos => {
      this.condominos = condominos;
    })
  }

  async save(condominio: number) {
    this.condominos.forEach((condomino: CondominoParams) => {
      condomino.condominio = condominio;
      this.condominoService.create(condomino).pipe(first()).subscribe(() => {
        error: () => {
          this.notificationService.showError('Erro ao salvar Condômino', 'Erro');
        }
      })
    })
  }

  openEmptyModal() {
    let modal = this.modalDialogService.open('Condôminos')

    modal.componentInstance.condominoEmmiter.subscribe((condomino: CondominoParams) => {
      if (condomino !== null) {
        condomino.id = Math.max.apply(Math, this.condominos.map(function(o) { return o.id; })) + 1;

        this.condominos.push(condomino);
      }
    })
  }

  openModalFor() {
    let condomino = this.condominosSelected[0];
    let modal = this.modalDialogService.open('Condômino', condomino)

    modal.componentInstance.condominoEmmiter.subscribe((condomino: CondominoParams) => {
      if (condomino !== null) {
        this.condominosSelected = [];

        let index = this.condominos.findIndex(x => x.id === condomino.id)
        this.condominos[index] = condomino;
      }
    })
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

  showCountingRegisters() {
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

  removeItem = (array, itemToRemove) =>  array.filter(v => v !== itemToRemove);

  removeCondomino() {
    this.confirmationDialogService.confirm('Remover Condômino(s)', 'Deseja realmente este(s) Condômino(s)? Esta ação não poderá ser desfeita.', 'Remover', 'Cancelar', "lg")
      .then((confirmed) => {
        if (!confirmed) {
          return
        }

        if (this.condominosSelected.length === this.condominos.length) {
          this.condominos = [];
          this.condominosSelected = [];
        } else {
          this.condominosSelected.forEach(condomino => {
            this.condominos = this.removeItem(this.condominos, condomino);
            this.condominosSelected = this.removeItem(this.condominosSelected, condomino);
          })
        }
      }).catch(() => {
      })
  }
}
