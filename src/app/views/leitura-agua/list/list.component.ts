import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './list.component.html',
  styleUrls: ['../../../../assets/css/default.scss']
})
export class ListLeituraAguaComponent implements OnInit {
  leituraAgua = null

  constructor(
  ) {}

  ngOnInit() {
  }
}