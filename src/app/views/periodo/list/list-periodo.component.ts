import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { UserParamsAuth } from "../../../model/user.model";
import { PeriodService } from "../../../service/period/period.service";
import { BaseComponent } from "../../base.component";

@Component({
  selector: 'app-list-periodo',
  templateUrl: './list-periodo.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListPeriodoComponent extends BaseComponent implements OnInit {
  periodos = null
  user: UserParamsAuth

  constructor(
    private periodoService: PeriodService,
    private router: Router,
  ) {
    super('CAD_PERIODO');
  }

  ngOnInit() {
    if (!this.canOverview()) {
      this.router.navigate(["/not-found"])
    }

    this.periodoService.getAll().pipe(first()).subscribe(periodos => {
      this.periodos = periodos
    })
  }

  hasPermission(tipo: string): boolean {
    return this.permissions[tipo] === 'S'
  }
}