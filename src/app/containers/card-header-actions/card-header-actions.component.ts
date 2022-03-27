import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-card-header-actions",
  templateUrl: "./card-header-actions.component.html",
})
export class CardHeaderActionsComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }
}
