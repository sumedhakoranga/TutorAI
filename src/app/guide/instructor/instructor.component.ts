import { Component } from '@angular/core';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

  constructor(private fb: FormBuilder, private router: Router) { }

  userId: string = '';
  username: string = 'Loading...';
  firstname: string = 'Loading...';
  isLoading = true;
  studentName: string[] = [];
  student = [];
  StudentDataForm!: FormGroup;
  studentId: any;
  studentInfo: any = [];

  ngOnInit() {
    this.loadData();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.getUserInfo(user);
    });
    this.StudentDataForm = this.fb.group({
      studentUsername: ['', Validators.required]
    })
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getUserInfo(user: any) {
    if (user) {
      this.userId = user.uid;
      const db = getDatabase();
      const userRef = ref(db, '/instructors/' + this.userId);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.username = userData.username || 'Anonymous';
          this.firstname = userData.firstname || 'Anonymous';
          this.studentId = userData.student;
          this.studentInfo = [];
          for (let [id, status] of Object.entries(this.studentId)) {
            const learnersRef = ref(db, '/learners/' + id);
            onValue(learnersRef, (snapshot) => {
              if (snapshot.exists()) {
                this.studentInfo.push(snapshot.val());
              } else {
                console.log("User is registered in but not loggedin.");
              }
            }, {
              onlyOnce: true
            });
          }
        } else {
          console.log("User is registered in but not loggedin.");
        }
      }, {
        onlyOnce: true
      });
    } else {
      // User is not logged in
      this.router.navigate(['/guardian/instructor-login']);
    }
  }

  onSubmit() {
    if (this.StudentDataForm) {
      const { studentUsername } = this.StudentDataForm.value;
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase();
        const learnersRef = ref(db, '/learners');
        onValue(learnersRef, (snapshot) => {
          if (snapshot.exists()) {
            const learnersData: { [key: string]: any } = snapshot.val();
            for (const [studentId, data] of Object.entries(learnersData)) {
              if (data.username === studentUsername) {
                let updates: { [key: string]: any } = {};
                updates['/instructors/' + this.userId + '/student/' + studentId] = 'unverified';
                update(ref(db), updates).then(() => {
                  this.getUserInfo(user);
                }).catch(error => {
                  console.error("Error updating courses: ", error);
                });
                break;
              }
            }
          } else {
            console.log("There is an error.");
          }
        }, {
          onlyOnce: true
        });
      }
    } else {
      this.validateALLFormFields(this.StudentDataForm);
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
