import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  // constructor(private fb: FormBuilder) { }
  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }


  ngOnInit(): void {
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

  // onSignUp() {
  //   if (this.signUpForm.valid) {
  //     console.log(this.signUpForm.value)
  //   } else {
  //     this.validateALLFormFields(this.signUpForm);
  //     alert("Your form is invalid")
  //   }
  // }



  onSignUp() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          // Handle successful signup
          this.router.navigate(['/courses']);
        })
        .catch(error => {
          // Handle errors
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

