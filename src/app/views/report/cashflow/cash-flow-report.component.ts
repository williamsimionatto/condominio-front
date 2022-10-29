import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

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
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      year: this.formBuilder.control(new Date().getFullYear(), [Validators.required]),
    })
  }

  filter() {

  }
}