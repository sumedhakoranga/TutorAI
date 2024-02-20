import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrl: './english.component.css'
})
export class EnglishComponent implements OnInit {
  hasQuizStarted = false;
  englishQuestions: any = {};
  username: string;
  currentQuestionCount: number = 0;
  totalQuestionCount: number = 5;
  score = 0;
  showScore = false;
  scoreTemplate: any;
  userId: string = '';
  currentAnswerCorrect: boolean | null = null;
  answerFeedback: string = '';
  selectedAnswer: number;
  question: any;
  questionFetched = false;
  registeredCourse = false;
  readingQuestion: boolean;
  disableSubmit: boolean = false;


  constructor(private router: Router) { }

  startQuiz() {
    if (this.registeredCourse === false) {
      alert("you are not registered in this course");
    }
    this.hasQuizStarted = true;
    this.loadQuestions();
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
        console.log(this.userId);
        const db = getDatabase();
        const userCoursesRef = ref(db, '/learners/' + this.userId);
        onValue(userCoursesRef, (snapshot) => {
          this.username = snapshot.val().username || 'Anonymous';
          this.registeredCourse = Object.keys(snapshot.val().courses).includes('english');
          console.log(this.registeredCourse);
        }, {
          onlyOnce: true
        });

      } else {
        this.router.navigate(['/']);
      }
    });

  }

  loadQuestions() {
    const data = {
      task: 'get_question',
      learner_id: this.userId,
      course: 'english'
    };

    axios.post('https://us-central1-tutorai00411.cloudfunctions.net/kt_ai', data)
      .then((response: any) => {
        let question_id = response.data.question_id;
        const db = getDatabase();
        onValue(ref(db, '/questions/english/' + question_id), (snapshot) => {
          this.question = snapshot.val();
          this.readingQuestion = Object.keys(this.question).includes('context');
          this.questionFetched = true;
          this.answerFeedback = '';
          console.log(this.question);
        }, {
          onlyOnce: true
        });
        console.log(response.data);
      })
      .catch((error: any) => {
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
      this.selectedAnswer = -1;
      this.disableSubmit = false;
      this.loadQuestions();
    } else {
      this.showScore = true;
    }
  }

  submitAnswer() {
    this.disableSubmit = true;
    this.currentAnswerCorrect = this.selectedAnswer === this.question.answer;
    let data = {
      task: 'update_skill',
      learner_id: this.userId,
      course: 'english',
      skill: this.question.skill,
      result: 0
    };
    if (this.currentAnswerCorrect) {
      this.score++;
      data.result = 1;
      this.answerFeedback = 'Correct! Well done.';
    } else {
      this.answerFeedback = `Incorrect. The correct answer is: ${this.question.choices[this.question.answer]}`;
    }

    axios.post('https://us-central1-tutorai00411.cloudfunctions.net/kt_ai', data)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
