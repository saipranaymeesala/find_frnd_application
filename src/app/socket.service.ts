// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // constructor() { }
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3000/');
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', roomId);
  }

  sendMessage(roomId: string, message: any) {
    this.socket.emit('chat-message', roomId, message);
  }

  sendOffer(roomId: string, offer: any) {
    this.socket.emit('offer', roomId, offer);
  }

  sendAnswer(roomId: string, answer: any) {
    this.socket.emit('answer', roomId, answer);
  }

  sendIceCandidate(roomId: string, candidate: any) {
    this.socket.emit('ice-candidate', roomId, candidate);
  }

  onChatMessage() {
    const subject = new Subject<any>();
    this.socket.on('chat-message', (message: any) => subject.next(message));
    return subject.asObservable();
  }

  onOffer() {
    const subject = new Subject<any>();
    this.socket.on('offer', (offer: any) => subject.next(offer));
    return subject.asObservable();
  }

  onAnswer() {
    const subject = new Subject<any>();
    this.socket.on('answer', (answer: any) => subject.next(answer));
    return subject.asObservable();
  }

  onIceCandidate() {
    const subject = new Subject<any>();
    this.socket.on('ice-candidate', (candidate: any) => subject.next(candidate));
    return subject.asObservable();
  }
}