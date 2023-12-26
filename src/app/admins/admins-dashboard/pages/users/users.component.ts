import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/login/store/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users$ = this.store.select(selectUser);

  tableColumns = [
    { prop: 'displayName', title: 'Instructor' },
    { prop: 'photoUrl', title: 'Img' },
    { prop: 'email', title: 'Email' },
    { prop: 'phoneNumber', title: 'Phone' },
    { prop: 'role', title: 'Introduction' },
   
    
  ];

  constructor(
    private store: Store,
  ) { } 

  
}
