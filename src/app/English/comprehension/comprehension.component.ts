import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprehension',
  templateUrl: './comprehension.component.html',
  styleUrl: './comprehension.component.css'
})
export class ComprehensionComponent implements OnInit {

  comprehensionQuestions: any = {};
  question: string = 'Wait..';
  answer: string;
  username: string;
  currentQuestionIndex: number = 0;
  score = 0;
  selectedAnswer: string;
  showScore = false;

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
    onValue(ref(db, '/questions/english/other'), (snapshot) => {
      const allQuestions = snapshot.val();
      this.comprehensionQuestions = this.shuffleArray(allQuestions).slice(0, 5);
      this.currentQuestionIndex = 0;
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
    if (this.currentQuestionIndex < this.comprehensionQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = '';
    } else {
      console.log("End of questions");
    }
  }

  checkAnswer() {
    const currentQuestion = this.comprehensionQuestions[this.currentQuestionIndex];
    console.log(this.selectedAnswer);
    console.log(currentQuestion.answer);
    if (this.selectedAnswer === currentQuestion.answer) {
      console.log("Correct answer!");
      this.score++;
    } else {
      console.log("Incorrect answer!");
    }
    if (this.currentQuestionIndex < this.comprehensionQuestions.length - 1) {
      this.nextQuestion();
    } else {
      this.showScore = true;
    }
  }


}

