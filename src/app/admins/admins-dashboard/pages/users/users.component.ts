import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectUsers } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent{
  users$ = this.store.select(selectUsers);

  tableColumns = [
    { prop: 'displayName', title: 'User' },
    { prop: 'photoUrl', title: 'Img' },
    { prop: 'email', title: 'Email' },
    { prop: 'phoneNumber', title: 'Phone' },
    { prop: 'role', title: 'Introduction' },
   
    
  ];

  constructor(
    private store: Store,
  ) { 
    console.log(this.users$);
  } 

  
}
