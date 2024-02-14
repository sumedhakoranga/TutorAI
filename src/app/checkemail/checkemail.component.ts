import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-checkemail',
  templateUrl: './checkemail.component.html',
  styleUrl: './checkemail.component.css'
})
export class CheckemailComponent {
  constructor(private auth: AngularFireAuth) { }

  resendEmailVerification() {
    this.auth.currentUser.then(user => {
      if (user) {
        user.sendEmailVerification().then(() => {
          console.log('Verification email resent.');
          alert('Verification email resent. Please check your inbox.');
        }).catch(error => {
          console.error('Error resending verification email:', error);
        });
      }
    });
  }
}
