import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CondominoParams } from "../../../model/condomino.model";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-condominos.component.html',
})
export class ModalCondominosComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  @Output() condominoEmmiter = new EventEmitter<CondominoParams>();

  condominoForm: FormGroup
  id: string
  isAddMode: boolean
  loading = false
  submitted = false
  condomino: CondominoParams = null

  sindicoOptions = [
    { value: '', name: 'Selecione:' },
    { value: 'S', name: 'Sim' },
    { value: 'N', name: 'Não' },
  ]

  tipoOptions = [
    { value: '', name: 'Selecione:' },
    { value: 'A', name: 'Apartamento' },
    { value: 'S', name: 'Sala Comercial' },
  ]

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.condominoForm = this.formBuilder.group({
      id: this.formBuilder.control(""),
      apartamento: this.formBuilder.control("", [Validators.required]),
      condominio: this.formBuilder.control(""),
      name: this.formBuilder.control("", [Validators.required, Validators.minLength(5)]),
      cpf: this.formBuilder.control("", [Validators.required, Validators.minLength(14)]),
      sindico: this.formBuilder.control("", [Validators.required]),
      tipo: this.formBuilder.control("", [Validators.required]),
      numeroquartos: this.formBuilder.control("", [Validators.required]),
    })

    if (!this.isAddMode) {
      // this.condominoForm.patchValue(this.condomino)
    }
  }

  onSubmit(form: NgForm) {
    this.condomino = form.value
    this.condominoEmmiter.emit(this.condomino)

    this.activeModal.close(true);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  get f() { return this.condominoForm.controls; }
}