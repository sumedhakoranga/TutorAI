import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  badges = [
    { name: 'Bronze', count: 3, image: 'assets/Badges/bronze.png', description: 'Solid foundation, impressive determination.' },
    { name: 'Silver', image: 'assets/Badges/silver.png', description: 'Shine bright! Your dedication is paying off.' },
    { name: 'Gold', image: 'assets/Badges/gold.png', description: 'Excellence is not an act, but a habit. Well done!' },
    { name: 'English Star', image: 'assets/Badges/englishstar.png', description: 'Master of words, crafting the future one sentence at a time.' },
    { name: 'Math Whizz', image: 'assets/Badges/mathwhiz.png', description: 'Numbers bow to you. Keep calculating your path to success!' },
    { name: 'Science Whizz', image: 'assets/Badges/sciencewhiz.png', description: "Curiosity leads to discovery. You're making groundbreaking strides!" },
    { name: 'Literature Lover', image: 'assets/Badges/literaturelover.png', description: "In the world of words, you're an explorer.Keep diving into new adventures!" },
    { name: 'Daily Learner', image: 'assets/Badges/dailylearnerbadge.png', description: 'Every day, you pave the way to greatness. Your dedication shines!' },
    { name: 'Champion', image: 'assets/Badges/champion.png', description: 'Unstoppable force of knowledge. Your thirst for learning inspires all!' },
  ];


  constructor(private router: Router) { }
  username: string = 'Loading...';

  ngOnInit() {
    this.getUserInfo();
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
          } else {
            console.log("User is logged in but not registered.");
          }
        }, {
          onlyOnce: true
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }


}
