import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service';

@Component({
   templateUrl: 'add-edit.component.html',
   styleUrls: ['../../../../assets/css/default.scss']
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  readonly = false;
  numberPattern = `/^[0-9]*$/`;
  emailPattern = `/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control('', [Validators.nullValidator]),
      name: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      passwordConfirmation: this.formBuilder.control('', [Validators.required])
    });

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe(x => { this.userForm.patchValue(x[0]) }
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return 'Invalid Form';
    }

    this.loading = true;
    this.isAddMode ? this.create() :  this.update();
  }

  private create() {
    this.userService
      .create(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: ret => {
          this.loading = false;
        }
    });
  }

  private update() {
    this.userForm.value.id = this.id;

    this.userService.update(this.userForm.value).pipe(first()).subscribe(
      {
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
        }
      }
    );
  }
}
