import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/login/types/user';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

import { selectUsers } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent{
  users$ = this.store.select(selectUsers);
  modalWith: string = '800px';
  modalHeight: string = '500px';
  modalTitle: string = 'User';


  tableColumns = [
    { prop: 'displayName', title: 'User' },
    { prop: 'photoURL', title: 'Img' },
    { prop: 'email', title: 'Email' },
    { prop: 'phoneNumber', title: 'Phone' },
    { prop: 'role', title: 'Role' },  
    
  ];
  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'User', prop: 'displayName' },
    { label: 'Img', prop: 'photoURL' },
    { label: 'Email', prop: 'email' },
    { label: 'Phone', prop: 'phoneNumber' },
    { label: 'role', prop: 'role' },
  ];

  constructor(
    private store: Store,
    private alertMessages: AlertsService,
    private userService: UsersService
  ) {} 

  onEdit(element: User) {
    this.userService.updateUser(element.id!, element).then((data) => {
      this.alertMessages.successMessage('User update successfully');
    }).catch((error) => {
      this.alertMessages.errorMessage('Error updating user', error.message);
    })
  }  
  
}
