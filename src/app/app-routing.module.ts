import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/components/default-pages/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  { path: 'admin', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule) },
  { path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
