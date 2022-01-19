import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';

@Component({ templateUrl: '../add/add-edit.component.html' })
export class OverUserViewComponent implements OnInit {
  userForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.nullValidator]),
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
    });

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => { this.userForm.patchValue(x) }
      );
    }
  }

  get f() { return this.userForm.controls; }

  onSubmit() {}
}