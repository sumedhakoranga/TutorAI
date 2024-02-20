import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  isLoading = false;
  feedbackMessage = '';

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }


  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.router.navigate(['/courses']);
      }
    });
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      const { firstname, lastname, email, password, username } = this.signUpForm.value;
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Handle successful signup
          const user = userCredential.user;
          if (user) {
            user.sendEmailVerification()
              .then(() => {
                const uid = user.uid;
                const db = getDatabase();
                set(ref(db, 'users/' + uid), {
                  type: 'learners'
                });
                set(ref(db, 'learners/' + uid), {
                  username: username,
                  email: email, 
                  firstname: firstname,
                  lastname: lastname
                });
                this.router.navigate(['/checkemail']);
              })
              .catch(error => {
                console.error('Error sending verification email', error);
              });
          } else {
            this.router.navigate(['/']);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.validateALLFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }



  private validateALLFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateALLFormFields(control)
      }
    })
  }

}

