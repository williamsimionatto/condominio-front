import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { CashFlowService } from "../../../service/cash-flow/cash-flow.service";

@Component({
  selector: 'cash-flow-report',
  templateUrl: './cash-flow-report.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class CashFlowReportComponent implements OnInit {
  filterForm: UntypedFormGroup
  data = null
  loading = false

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cashFlowService: CashFlowService
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      startDate: this.formBuilder.control(this.getStartDate(new Date()), [Validators.required]),
      endDate: this.formBuilder.control(this.getEndDate(new Date()), [Validators.required])
    })
  }

  filter() {
    this.loading = true
    this.cashFlowService.getAll(this.filterForm.value)
    .pipe(first())
    .subscribe((response: any) => {
      this.data = response.map((d: any) => {
        return {
          ...d,
          balance: Number(d.balance),
          total_expense: Number(d.total_expense), 
          total_income: Number(d.total_income)
        }
      })
    })

    this.loading = false
  }

  private getStartDate(currentDate: Date) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1)
  }

  private getEndDate(currentDate: Date) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  }
}