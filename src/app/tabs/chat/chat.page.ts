import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  newMessage: string = '';
  messages: { sender: string, text: string }[] = [];
  userData: any;
  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
    console.log(this.userData);
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Add user's message
      this.messages.push({
        sender: 'user',
        text: this.newMessage


      });

      this.newMessage = '';  // Clear the input field

      // Simulate a bot response after a short delay
      setTimeout(() => {
        this.botReply();
      }, 1000);
    }
  }

  botReply() {
    const botResponses = [
      'Hello! How can I assist you?',
      'I am here to help.',
      'What would you like to know?',
      'Have a great day!',
      'How can I make your day better?',
      'How are you?',
      'That sounds interesting!',
      'Tell me more!',
      'I agree with you.',
      'Let’s meet up sometime.',
      'What do you think about that?',
      'I’m glad to hear that!',
      'Do you have any plans this weekend?',
      'That’s cool!',
      'I like your style!'
    ];

    const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];

    this.messages.push({
      sender: 'bot',
      text: randomReply
    });
  }


}
