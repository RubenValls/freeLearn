import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RoleGuard } from '../shared/guards/role.guard';

const routes: Routes = [
    { path: '', component: LoginPageComponent, canActivate:[RoleGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }