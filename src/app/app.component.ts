import firebase from 'firebase/compat/app';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'freeLearn';

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
