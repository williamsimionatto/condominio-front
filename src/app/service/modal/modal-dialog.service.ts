import { Injectable } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CondominoParams } from "../../model/condomino.model";
import { ModalCondominosComponent } from "../../views/condominos/add/modal-condominos.component";

@Injectable()
export class ModalDialogService {
  constructor(
    private modalService: NgbModal
  ) {}

  condomino: CondominoParams = null;

  public open(title: string): NgbModalRef {
    const modalRef = this.modalService.open(ModalCondominosComponent, { size: 'lg' });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = '';
    modalRef.componentInstance.btnOkText = 'Incluir';
    modalRef.componentInstance.btnCancelText = 'Cancelar';

    modalRef.componentInstance.condominoEmmiter.subscribe((result: CondominoParams) => {
      this.condomino = result;
    })

    return modalRef;
  }

  public getCondomino(): CondominoParams {
    return this.condomino
  }

  public confirm(title: string, message: string, btnOkText: string = 'Sim', 
                 btnCancelText: string = 'Cancelar', dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ModalCondominosComponent, { size: dialogSize });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    modalRef.componentInstance.condominoEmmiter.subscribe((result: CondominoParams) => {
      this.condomino = result;
    })

    return modalRef.result;
  }
}
