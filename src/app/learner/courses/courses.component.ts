import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';

interface ChatMessage {
text: string;
type: 'right' | 'left';
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {
  constructor(private router: Router) { }
  @ViewChild('messageInp') messageInput: ElementRef;
  messages: ChatMessage[] = [];


  courseSelections: { [key: string]: boolean } = {};
  isLoggedIn = false;
  isLoading = true;
  courses: any[] = [];
  userId: string = '';
  username: string = 'Loading...';
  firstname: string = 'Loading...';
  allCourses: any[] = [];
  courseName: any[] = [];
  allCourseName: any[] = [];
  unenrolledCourses: any[] = [];
  unenrolledCourseName: any[] = [];


 


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
        this.userId = user.uid;
        const db = getDatabase();
        const userRef = ref(db, '/learners/' + this.userId);
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
      this.allCourses = Object.keys(snapshot.val()) || [];
      this.allCourseName = this.allCourses.map((course: string): string => {
        return course
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      });
   
      this.allCourses.forEach((course: string) => {
        this.courseSelections[course] = this.courses.includes(course);
      });
      this.unenrolledCourses = this.allCourses.filter(course => !this.courses.includes(course));
      this.unenrolledCourseName = this.unenrolledCourses.map((course: string): string => {
        return course
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      });
    }, {
      onlyOnce: true
    });
  }

  enrollCourse() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const selectedCourses = Object.keys(this.courseSelections).filter(key => this.courseSelections[key] && !this.courses.includes(key));
      let addCourses: { [key: string]: { skills: { newUser: number } } } = {};
      for (let course of selectedCourses) {
        addCourses[course] = { skills: { newUser: 0 } };
      }
      let updates: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(addCourses)){
        updates['/learners/' + this.userId + '/courses/' + key] = value;
        update(ref(db), updates).then(() => {
          this.getUserInfo(user);
          this.fetchCourses();
        }).catch(error => {
          console.error("Error updating courses: ", error);
        });
      }
    }
  }

  unenrollCourse(course: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      remove(ref(db, '/learners/' + this.userId + '/courses/' + course)).then(() => {
        this.getUserInfo(user);
        this.fetchCourses();
      }).catch(error => {
        console.error("Error updating courses: ", error);
      });
    }
  }

  onSend() {
    const messageText = this.messageInput.nativeElement.value;
    if (messageText.trim().length === 0) return; // Prevent sending empty messages
    console.log(messageText);
    const newMessage: ChatMessage = {
      text: messageText,
      type: 'right'
    };

    this.messages.push(newMessage);
    console.log(this.messages);
    this.messageInput.nativeElement.value = ''; // Clear input field
    }

}
