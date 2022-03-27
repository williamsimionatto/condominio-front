import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-card-header",
  templateUrl: "./card-header.component.html",
})
export class CardHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isAdd: boolean;
  @Input() addUrl: string = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }
}
