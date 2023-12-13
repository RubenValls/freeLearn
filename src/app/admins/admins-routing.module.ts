import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsDashboardComponent } from './admins-dashboard/admins-dashboard.component';

const routes: Routes = [
    { path: '', component: AdminsDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
