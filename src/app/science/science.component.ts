import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';


@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrl: './science.component.css'
})
export class ScienceComponent implements OnInit {
  hasQuizStarted = false;
  scienceQuestions: any = {};
  username: string;
  currentQuestionIndex: number = 0;
  score = 0;
  showScore = false;
  scoreTemplate:any;
  currentAnswerCorrect: boolean | null = null;
  answerFeedback: string = '';
  selectedAnswer: string | null = null; 

  constructor(private router: Router) { }

  startQuiz() {
    this.hasQuizStarted = true;
    this.loadQuestions();
  }

  getProgress(): string {
    const progress = ((this.currentQuestionIndex + 1) / this.scienceQuestions.length) * 100;
    return `${progress}%`;
  }
  ngOnInit(): void {
    this.getUserInfo();
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
    onValue(ref(db, '/questions/science'), (snapshot) => {
      const allQuestions = snapshot.val();
      this.scienceQuestions = this.shuffleArray(allQuestions).slice(0, 5);
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
    if (this.currentQuestionIndex < this.scienceQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = '';
    } else {
      this.showScore = true;
    }
  }

  checkAnswer() {
    const currentQuestion = this.scienceQuestions[this.currentQuestionIndex];
    if (this.selectedAnswer !== undefined && currentQuestion.answer !== undefined) {
      if (this.selectedAnswer === currentQuestion.answer) {
        this.score++;
        this.answerFeedback = 'Correct! Well done.';
        this.currentAnswerCorrect = true;
      } else {
        this.answerFeedback = `Incorrect. Try again or move to the next question.`;
        this.currentAnswerCorrect = false;
      }
    }
  }


  tryAgain() {
    this.selectedAnswer = '';
    this.answerFeedback = '';
    this.currentAnswerCorrect = null;
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.scienceQuestions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.showScore = true;
    }
    // Reset for the next question or the end of the quiz
    this.selectedAnswer = '';
    this.answerFeedback = '';
    this.currentAnswerCorrect = null;
  }




}
