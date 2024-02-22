import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { collection, addDoc, onSnapshot, doc, getFirestore } from 'firebase/firestore';

interface ChatMessage {
  text: string;
  type: 'right' | 'left';
}

interface GenerateDocument {
  prompt: string;
  response?: string;
}

@Component({
  selector: 'app-askai',
  templateUrl: './askai.component.html',
  styleUrl: './askai.component.css'
})
export class AskaiComponent implements OnInit {

  constructor(private router: Router) { }
  @ViewChild('messageInp') messageInput: ElementRef;
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  messages: ChatMessage[] = [];
  isLoadingResponse: boolean = false;


  ngOnInit() {
    const aiGreetingMessage: ChatMessage = {
      text: "Hello! I'm here to help you. How can I assist you today?",
      type: 'left'
    };

    this.messages = [aiGreetingMessage];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
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
    this.simulateAIResponse(messageText);

  }

  async simulateAIResponse(newMessage: string) {
    this.isLoadingResponse = true;
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "generate"), {
        prompt: newMessage,
      });

      onSnapshot(doc(db, "generate", docRef.id), (snap) => {
        const data = snap.data() as GenerateDocument;
        if (data.response) {
          console.log('RESPONSE:' + data.response);
          const aiResponseText = "Thanks for your message! How can I assist you further?";

          const aiMessage: ChatMessage = {
            text: data.response,
            type: 'left'
          };
          setTimeout(() => {
            this.messages.push(aiMessage);
            console.log(this.messages);
          }, 1000);
        } else {
          this.isLoadingResponse = false;
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      this.isLoadingResponse = false;
    }
  }
}
