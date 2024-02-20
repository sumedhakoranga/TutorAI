// declare var require: any
import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-mathematics',
  templateUrl: './mathematics.component.html',
  styleUrl: './mathematics.component.css'
})
export class MathematicsComponent implements OnInit {
  hasQuizStarted = false;
  mathQuestions: any = [];
  username: string;
  currentQuestionCount: number = 0;
  totalQuestionCount: number = 5;
  score = 0;
  selectedAnswer: string;
  showScore = false;
  alertVisible = false;
  currentAnswerCorrect: boolean | null = null;
  answerFeedback: string = '';
  userId : string = '';
  question : any;
  questionFetched = false;
  disableSubmit: boolean = false;


  constructor(private router: Router) { }


  startQuiz() {
    this.hasQuizStarted = true;
    this.loadQuestion();
    this.score = 0;
    this.currentQuestionCount = 0;
    this.showScore = false;
  }

  getProgress(): string {
    const progress = ((this.currentQuestionCount + 1) / this.totalQuestionCount) * 100;
    return `${progress}%`;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userId = user.uid;
        const db = getDatabase();
        onValue(ref(db, '/learners/' + this.userId), (snapshot) => {
          this.username = snapshot.val().username || 'Anonymous';
        }, {
          onlyOnce: true
        });

      } else {
        this.router.navigate(['/']);
      }
    });

  }

  loadQuestion() {
    const data = {
      task: 'get_question',
      learner_id: this.userId,
      course: 'mathematics'
    };

    // Making the POST request
    axios.post('https://us-central1-tutorai00411.cloudfunctions.net/kt_ai', data)
      .then((response:any) => {
        let question_id = response.data.question_id;
        // let skill = response.data.skill;
        const db = getDatabase();
        onValue(ref(db, '/questions/mathematics/'+question_id), (snapshot) => {
          this.question = snapshot.val();
          this.questionFetched = true;
          this.answerFeedback = '';
          console.log(this.question);
        }, {
          onlyOnce: true
        });
        console.log(response.data);
      })
      .catch((error:any) => {
        console.error(error);
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
    this.questionFetched = false;
    if (this.currentQuestionCount < this.totalQuestionCount - 1) {
      this.currentQuestionCount++;
      this.selectedAnswer = '';
      this.disableSubmit = false;
      this.loadQuestion();
    } else {
      this.showScore = true;
    }
  }

  // checkAnswer() {
  //   let result = this.selectedAnswer.trim().toLowerCase() === this.question.answer.trim().toLowerCase();
  //   if (result) {
  //     this.score++;
  //   }
  //   const data = {
  //     task: 'update_skill',
  //     learner_id: this.userId,
  //     course: 'mathematics',
  //     skill: this.question.skill,
  //     result: result
  //   };
  //   axios.post('https://us-central1-tutorai00411.cloudfunctions.net/kt_ai', data)
  //     .then((response: any) => {
  //       console.log(response.data);
  //     })
  //     .catch((error: any) => {
  //       console.error(error);
  //     });
  // }

  submitAnswer() {
    this.disableSubmit = true;
    this.currentAnswerCorrect = this.selectedAnswer.trim().toLowerCase() === this.question.answer.trim().toLowerCase();
    // this.checkAnswer();
    let data = {
      task: 'update_skill',
      learner_id: this.userId,
      course: 'mathematics',
      skill: this.question.skill,
      result: 0
    };
    if (this.currentAnswerCorrect) {
      this.score++;
      data.result = 1;
      this.answerFeedback = 'Correct! Well done.';
    } else {
      this.answerFeedback = `Incorrect. The correct answer is: ${this.question.answer}`;
    }

    axios.post('https://us-central1-tutorai00411.cloudfunctions.net/kt_ai', data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  // tryAgain() {
  //   // Reset for trying the same question again
  //   this.selectedAnswer = '';
  //   this.currentAnswerCorrect = null;
  //   this.answerFeedback = '';
  // }

  // moveToNextQuestion() {
  //   if (this.currentQuestionIndex < this.mathQuestions.length - 1) {
  //     this.currentQuestionIndex++;
  //     this.selectedAnswer = '';
  //     this.currentAnswerCorrect = null;
  //     this.answerFeedback = '';
  //   } else {
  //     this.showScore = true;
  //   }
  // }

}