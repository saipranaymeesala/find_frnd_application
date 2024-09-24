import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { IonContent, IonInfiniteScroll, ScrollDetail } from '@ionic/angular';
import { IonContentCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewChecked {
  onScroll // More bot responses...
    ($event: IonContentCustomEvent<ScrollDetail>) {
    throw new Error('Method not implemented.');
  }

  @ViewChild(IonContent) content!: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  newMessage: string = '';
  messages: { sender: string, text: string }[] = [];
  userData: any;

  private isUserNearBottom: boolean = true;  // Check if the user is near the bottom
  private userScrolls: boolean = false;      // Track whether the user is actively scrolling
  private scrollDirectionUp: boolean = false; // Check if scroll should go up
  private messageBatchSize: number = 10; // Load 10 messages at a time

  constructor() { }
  ngAfterViewChecked(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loadInitialMessages();  // Load initial messages
  }

  // Load initial messages
  loadInitialMessages() {
    this.messages = this.getMessages(0, this.messageBatchSize); // Load first batch
  }

  // Load older messages when the user scrolls to the top
  loadOlderMessages(event: any) {
    const currentLength = this.messages.length;
    const newMessages = this.getMessages(currentLength, this.messageBatchSize);

    // Prepend new messages and keep the scroll position
    setTimeout(() => {
      this.messages = [...newMessages, ...this.messages];
      event.target.complete();  // Stop the infinite scroll loading
    }, 1000);  // Simulate a delay for loading
  }

  // Simulate fetching messages from the backend
  getMessages(offset: number, limit: number): { sender: string, text: string }[] {
    const allMessages: { sender: string; text: string; }[] = [
      // { sender: 'bot', text: 'Hello!' },
      // { sender: 'user', text: 'Hi!' },
      // { sender: 'bot', text: 'How are you?' },
      // { sender: 'user', text: 'Good, and you?' },
      // { sender: 'bot', text: 'I’m doing well, thanks!' },
      // More pre-existing messages...
    ];

    // Simulate fetching messages with pagination
    return allMessages.slice(offset, offset + limit);
  }

  // Send user's message
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        sender: 'user',
        text: this.newMessage
      });

      this.newMessage = '';  // Clear the input field
      this.scrollToBottom(false); // Scroll down after sending a message

      // Simulate bot reply
      setTimeout(() => {
        this.botReply();
      }, 1500); // Delay of 1.5 seconds for bot response
    }
  }

  // Simulate bot reply
  botReply() {
    const botResponses = [
      'Hello! How can I assist you?',
      'I am here to help.',
      // More bot responses...
    ];

    const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];

    this.messages.push({
      sender: 'bot',
      text: randomReply
    });

    this.scrollToBottom(false);  // Scroll to bottom only if near bottom
  }

  // Scroll to the bottom of the chat
  scrollToBottom(animate: boolean = false) {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(animate ? 300 : 0);  // No animation for smooth behavior
      }
    }, 100);  // Delay to ensure DOM is updated
  }
}