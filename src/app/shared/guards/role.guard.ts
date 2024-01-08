import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { UserActions } from 'src/app/login/store/user.actions';
import { Store } from '@ngrx/store';

export const RoleGuard: CanActivateFn = (route, state) => {
  

  const usersService = inject(UsersService)
  const store = inject(Store)
  const user = usersService.getUserFromStorage()
  if(user){
    store.dispatch(UserActions.addUser({ user: user }));
  }
  const role = user?.role
  const expectedRole = route.data['expectedRole'];


  if (role === expectedRole) {
    return true;
  } else {
    const router = inject(Router)
    if(role === 'student'){
      router.navigate(['/students']);
    }else if(role === 'admin'){
      router.navigate(['/admin']);
    }else{
      router.navigate(['/login']);
    }
    return false;
  }

};
