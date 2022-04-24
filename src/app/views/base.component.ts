import { UserParamsAuth } from "../model/user.model";
import { LocalStorageService } from "../service";
import { PermissionsService } from "../service/permissions/permissions.service";

export class BaseComponent {
  protected user: UserParamsAuth
  protected permissionSigla: string
  private localStorageService: LocalStorageService
  private permissionService: PermissionsService
  protected permissions = null

  constructor(permissionSigla: string) {
    this.localStorageService = new LocalStorageService()
    this.permissionService = new PermissionsService(this.localStorageService)
    this.user = JSON.parse(this.localStorageService.getItem('user'));
    this.permissionSigla = permissionSigla
    this.permissions = this.permissionService.getPermissionsbySigla(this.permissionSigla)
  }
}