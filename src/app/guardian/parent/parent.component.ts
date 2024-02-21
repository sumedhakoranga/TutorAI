import { Component } from '@angular/core';
import { getDatabase, ref, onValue, update, child } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  constructor(private fb: FormBuilder, private router: Router) { }

  userId: string = '';
  username: string = 'Loading...';
  firstname: string = 'Loading...';
  isLoading = true;
  childName: string[] = [];
  children = [];
  childDataForm!: FormGroup;
  childId: any;
  childInfo: any = [];
  xyz: any;

  ngOnInit() {
    this.loadData();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.getUserInfo(user);
    });
    this.childDataForm = this.fb.group({
      childUsername: ['', Validators.required]
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
      const userRef = ref(db, '/parents/' + this.userId );
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.username = userData.username || 'Anonymous';
          this.firstname = userData.firstname || 'Anonymous';
          this.childId = userData.child;
          this.childInfo = [];
          for (let [id, status] of Object.entries(this.childId)){
            const learnersRef = ref(db, '/learners/' + id);
            onValue(learnersRef, (snapshot) => {
              if (snapshot.exists()) {
                this.childInfo.push(snapshot.val());
              } else {
                console.log("User is logged in but not registered.");
              }
            }, {
              onlyOnce: true
            });
          }
        } else {
          console.log("User is logged in but not registered.");
        }
      }, {
        onlyOnce: true
      });
    } else {
      // User is not logged in
      this.router.navigate(['/guardian/parent-login']);
    }
  }

  onSubmit() {
    if (this.childDataForm) {
      const { childUsername } = this.childDataForm.value;
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase();
        const learnersRef = ref(db, '/learners');
        onValue(learnersRef, (snapshot) => {
          if (snapshot.exists()) {
            const learnersData: { [key: string]: any } = snapshot.val();
            for (const [childId, data] of Object.entries(learnersData)) {
              console.log("kuchh bhi");
              if (data.username === childUsername) {
                let updates: { [key: string]: any } = {};
                updates['/parents/' + this.userId + '/child/' + childId] = 'unverified';
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
      this.validateALLFormFields(this.childDataForm);
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
