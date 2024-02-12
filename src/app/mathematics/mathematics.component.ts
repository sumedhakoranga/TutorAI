import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-mathematics',
  templateUrl: './mathematics.component.html',
  styleUrl: './mathematics.component.css'
})
export class MathematicsComponent implements OnInit {

  mathQuestions: any = [];
  username: string;
  currentQuestionIndex: number = 0;
  score = 0;
  selectedAnswer: string;
  showScore = false;
  alertVisible = false;

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.getUserInfo();
    this.loadQuestions();
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
        }, {
          onlyOnce: true
        });

      } else {
        this.router.navigate(['/home']);
      }
    });

  }

  loadQuestions() {
    const db = getDatabase();
    onValue(ref(db, '/questions/mathematics'), (snapshot) => {
      let questions = Object.values(snapshot.val() || {});
      questions = this.shuffleArray(questions);
      this.mathQuestions = questions.slice(0, 5);
      this.currentQuestionIndex = 0;
      this.showScore = false;
      this.score = 0;
    }, {
      onlyOnce: true
    });
  }


  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  nextQuestion() {
    this.checkAnswer();
    if (this.currentQuestionIndex < this.mathQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = '';
    } else {
      this.showScore = true;
    }
  }

  checkAnswer() {
    const currentQuestion = this.mathQuestions[this.currentQuestionIndex];
    if (this.selectedAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()) {
      this.score++;
    }
  }

  submitAnswer() {
    this.checkAnswer();
    if (this.currentQuestionIndex < Math.min(this.mathQuestions.length, 5) - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = '';
    } else {
      this.showScore = true;
    }
  }



}