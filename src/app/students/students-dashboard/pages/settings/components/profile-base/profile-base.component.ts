import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/login/store/user.selectors';

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss']
})
export class ProfileBaseComponent implements OnInit {
  user$ = this.store.select(selectUser);
  profileForm: FormGroup;  // Quita el tipo `undefined` aquí

  constructor(private store: Store, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      phoneNumber: [''],
      displayName: [''],
    });
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue(user);  // Puedes utilizar patchValue para establecer los valores del usuario
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Realiza acciones con los datos del formulario, por ejemplo, enviar al servidor
      // this.profileForm.value contiene los valores del formulario
      console.log(this.profileForm.value);
    }
  }
}

