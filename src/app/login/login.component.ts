import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from "firebase/auth";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }


  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }


  //facebook login
  isLoggingIn: boolean = false;
  loginWithFacebook() {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true; // Disable the login button
    this.afAuth.signInWithPopup(new FacebookAuthProvider()).then((result) => {
      this.router.navigate(['/main']);
    }).catch((error) => {
      // Handle error
      console.log(error);
    }).finally(() => {
      this.isLoggingIn = false; // Re-enable the login button after popup is handled
    });
  }

  loginWithGoogle() {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true; // Disable the login button
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      this.router.navigate(['/main']);
    }).catch((error) => {
      // Handle error
      console.log(error);
    }).finally(() => {
      this.isLoggingIn = false; // Re-enable the login button after popup is handled
    });
  }

  loginWithGithub() {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true; // Disable the login button
    this.afAuth.signInWithPopup(new GithubAuthProvider()).then((result) => {
      this.router.navigate(['/main']);
    }).catch((error) => {
      // Handle error
      console.log(error);
    }).finally(() => {
      this.isLoggingIn = false; // Re-enable the login button after popup is handled
    });
  }

  // login
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Assuming username is actually the user's email
      this.afAuth.signInWithEmailAndPassword(username, password)
        .then(result => {
          // Handle successful login, e.g., redirect or update UI
          console.log('Login successful', result);
          this.router.navigate(['/courses']);
        })
        .catch(error => {
          // Handle login error
          console.error('Login error', error);
          alert(error.message);
        });
    } else {
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }

  //forgot password 

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        // Success message
        alert('Password reset email sent. Check your inbox.');
      })
      .catch((error) => {
        // Error handling
        console.error('Error sending password reset email:', error);
        alert(error.message);
      });
  }

  promptResetPassword() {
    const email = prompt('Please enter your email address to reset your password:');
    if (email) { // Check if email is not null
      this.resetPassword(email);
    } else {
      alert('Email address is required.');
    }
  }



}


