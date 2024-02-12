import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {

  constructor(private router: Router) { }

  courses: any[] = [];
  username: string = 'Loading...';
  courseMapping: any = {};

  ngOnInit() {
    this.getUserInfo();
    this.fetchCourses();
  }

  getUserInfo() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
        const db = getDatabase();
        onValue(ref(db, '/learners/' + userId), (snapshot) => {
          this.username = snapshot.val().username || 'Anonymous';
          this.courses = snapshot.val().courses || [];
          console.log(this.courses);
        }, {
          onlyOnce: true
        });

      } else {
        this.router.navigate(['/home']);
      }
    });

  }

  fetchCourses() {
    const db = getDatabase();
    onValue(ref(db, '/courses'), (snapshot) => {
      this.courseMapping = snapshot.val() || [];
      this.courseMapping = this.courseMapping.map((course: string): string => {
        return course
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      });
      console.log(this.courseMapping);
    }, {
      onlyOnce: true
    });
  }

  //logout

  logout(){
    const auth = getAuth();
    signOut(auth).then(()=>{
      console.log('User signed out');
      this.router.navigate(['/intro-page']);
    }).catch((error)=>{
      console.error("logout error");
    });
  }
 
}


