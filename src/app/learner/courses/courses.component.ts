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

  availableCourses: string[] = ['mathematics', 'science', 'english', 'socialScience'];
  courseSelections: { [key: string]: boolean } = {};
  isLoggedIn = false;
  isLoading = true;

  constructor(private router: Router) { }

  courses: any[] = [];
  username: string = 'Loading...';
  courseMapping: any = {};

  ngOnInit() {
    this.availableCourses.forEach(course => {
      this.courseSelections[course] = false;
    });
    this.loadData();
    this.getUserInfo();
    this.fetchCourses();
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  getUserInfo() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
        const userRef = ref(db, '/learners/' + userId);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            this.username = userData.username || 'Anonymous';
            this.courses = userData.courses || [];
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
    });

  }

  // fetchCourses() {
  //   const db = getDatabase();
  //   onValue(ref(db, '/courses'), (snapshot) => {
  //     this.courseMapping = snapshot.val() || [];
  //     this.courseMapping = this.courseMapping.map((course: string): string => {
  //       return course
  //         .split("_")
  //         .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
  //         .join(" ");
  //     });
  //   }, {
  //     onlyOnce: true
  //   });
  // }

  fetchCourses() {
    const db = getDatabase();
    onValue(ref(db, '/courses'), (snapshot) => {
      const coursesData = snapshot.val() || {};
      this.courseMapping = {};
      Object.keys(coursesData).forEach((key) => {
        this.courseMapping[key] = coursesData[key];
      });
      this.availableCourses = Object.keys(this.courseMapping);
    }, {
      onlyOnce: true
    });
  }


  saveCourseSelections() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      // Filter selected courses
      const selectedCourses = Object.keys(this.courseSelections).filter(key => this.courseSelections[key]);
      const updates: { [key: string]: any } = {};
      updates['/learners/' + user.uid + '/courses'] = selectedCourses;
      update(ref(db), updates).then(() => {
        this.courses = selectedCourses;
      }).catch(error => {
        console.error("Error updating courses: ", error);
      });
    }
  }



}


