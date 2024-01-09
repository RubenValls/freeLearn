import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/login/store/user.actions';
import { selectUser } from 'src/app/login/store/user.selectors';
import { User } from 'src/app/login/types/user';
import { UpdateModalComponent } from 'src/app/shared/components/modals/update-modal/update-modal.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss'],
})
export class ProfileBaseComponent implements OnInit {
  user$ = this.store.select(selectUser);
  user: User | undefined;
  profileForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UsersService,
    private alertMessage: AlertsService
  ) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      phoneNumber: [''],
      displayName: [''],
      photoURL: [''],
    });
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
        this.profileForm.patchValue(user);
      }
    });
  }

  editUser() {
      const userUpdated = {
        ...this.user,
        ...this.profileForm.value,
      };
      this.userService
        .updateUser(userUpdated.id, userUpdated)
        .then(() => {
          this.alertMessage.successMessage('User update successfully');
          this.store.dispatch(UserActions.updateUser({ user: userUpdated }));
          this.userService.saveUserInStorage(
            userUpdated.rememberMe,
            userUpdated
          );
        })
        .catch((error) => console.log(error));
  }

  onSubmit() {
      this.dialog.open(UpdateModalComponent, {
        data: {
          data: this.profileForm.value,
          onEdit: this.editUser
        },
      });
    }
  
}
