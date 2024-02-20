import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {

  courseSelections: { [key: string]: boolean } = {};
  isLoggedIn = false;
  isLoading = true;

  constructor(private router: Router) { }

  courses: any[] = [];
  username: string = 'Loading...';
  firstname: string = 'Loading...';
  availableCourses: any[] = [];
  courseName: any[] = [];
  availableCourseName: any[] = [];

  ngOnInit() {
    this.loadData();
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      this.getUserInfo(user);
      this.fetchCourses();
    });
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getUserInfo(user:any) {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
        const userRef = ref(db, '/learners/' + userId);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            this.username = userData.username || 'Anonymous';
            this.firstname = userData.firstname || 'Anonymous';
            if(Object.keys(userData).includes('courses')){
              this.courses = Object.keys(userData.courses);
              this.courseName = this.courses.map((course: string): string => {
                return course
                  .split("_")
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              });
            }
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
            console.log("User is logged in but not registered.");
          }
        }, {
          onlyOnce: true
        });
      } else {
        // User is not logged in
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
  }

  fetchCourses() {
    const db = getDatabase();
    onValue(ref(db, '/courses'), (snapshot) => {
      this.availableCourses = Object.keys(snapshot.val()) || [];
      this.availableCourseName = this.availableCourses.map((course: string): string => {
        return course
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      });
      console.log(this.availableCourses);
      console.log(this.courseName);

      this.availableCourses.forEach((course: string) => {
        this.courseSelections[course] = this.courses.includes(course);
      });
      console.log(this.courseSelections);

    }, {
      onlyOnce: true
    });
  }

  // fetchCourses() {
  //   const db = getDatabase();
  //   onValue(ref(db, '/courses'), (snapshot) => {
  //     if (snapshot.exists()) {
  //       const coursesData = snapshot.val();
  //       console.log(coursesData);
  //       this.courses = Object.keys(coursesData);
  //       console.log(this.courses);
  //     } else {
  //       console.log("eerror");
  //     }
  //   }, {
  //     onlyOnce: true
  //   });
  // }

  // fetchCourses() {
  //   const db = getDatabase();
  //   onValue(ref(db, '/courses'), (snapshot) => {
  //     const coursesData = snapshot.val() || {};
  //     this.availableCourses = {};
  //     Object.keys(coursesData).forEach((key) => {
  //       this.availableCourses[key] = coursesData[key];
  //     });
  //     this.availableCourses = Object.keys(this.availableCourses);
  //   }, {
  //     onlyOnce: true
  //   });
  // }



  saveCourseSelections() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      // Filter selected courses
      const selectedCourses = Object.keys(this.courseSelections).filter(key => this.courseSelections[key]);
      const updates: { [key: string]: any } = {};
      console.log(selectedCourses);
      // updates['/learners/' + user.uid + '/courses'] = selectedCourses;
      // update(ref(db), updates).then(() => {
      //   this.courses = selectedCourses;
      // }).catch(error => {
      //   console.error("Error updating courses: ", error);
      // });
    }
  }



}


