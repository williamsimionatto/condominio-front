import { Component, OnInit } from "@angular/core";
import { ConfirmationDialogService } from "../../../service/confirmation-dialog/confirmation-dialog";
import { NotificationService } from "../../../service/notification/notification.service";

@Component({
  selector: "app-list-leitura-agua-valores",
  templateUrl: "./list.component.html",
  styleUrls: ["../../../../assets/css/default.scss"]
})
export class ListLeituraAguaValoresComponent implements OnInit {
  condominos = null;

  constructor(
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit() {}
}