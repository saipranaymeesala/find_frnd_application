// import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
// import { IonContent, IonInfiniteScroll, ScrollDetail } from '@ionic/angular';
// import { IonContentCustomEvent } from '@ionic/core';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.page.html',
//   styleUrls: ['./chat.page.scss'],
// })
// export class ChatPage implements OnInit, AfterViewChecked {
//   onScroll // More bot responses...
//     ($event: IonContentCustomEvent<ScrollDetail>) {
//     throw new Error('Method not implemented.');
//   }

//   @ViewChild(IonContent) content!: IonContent;
//   @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

//   newMessage: string = '';
//   messages: { sender: string, text: string }[] = [];
//   userData: any;

//   private isUserNearBottom: boolean = true;  // Check if the user is near the bottom
//   private userScrolls: boolean = false;      // Track whether the user is actively scrolling
//   private scrollDirectionUp: boolean = false; // Check if scroll should go up
//   private messageBatchSize: number = 10; // Load 10 messages at a time

//   constructor() { }
//   ngAfterViewChecked(): void {
//     throw new Error('Method not implemented.');
//   }

//   ngOnInit() {
//     this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
//     this.loadInitialMessages();  // Load initial messages
//   }

//   // Load initial messages
//   loadInitialMessages() {
//     this.messages = this.getMessages(0, this.messageBatchSize); // Load first batch
//   }

//   // Load older messages when the user scrolls to the top
//   loadOlderMessages(event: any) {
//     const currentLength = this.messages.length;
//     const newMessages = this.getMessages(currentLength, this.messageBatchSize);

//     // Prepend new messages and keep the scroll position
//     setTimeout(() => {
//       this.messages = [...newMessages, ...this.messages];
//       event.target.complete();  // Stop the infinite scroll loading
//     }, 1000);  // Simulate a delay for loading
//   }

//   // Simulate fetching messages from the backend
//   getMessages(offset: number, limit: number): { sender: string, text: string }[] {
//     const allMessages: { sender: string; text: string; }[] = [
//       // { sender: 'bot', text: 'Hello!' },
//       // { sender: 'user', text: 'Hi!' },
//       // { sender: 'bot', text: 'How are you?' },
//       // { sender: 'user', text: 'Good, and you?' },
//       // { sender: 'bot', text: 'I’m doing well, thanks!' },
//       // More pre-existing messages...
//     ];

//     // Simulate fetching messages with pagination
//     return allMessages.slice(offset, offset + limit);
//   }

//   // Send user's message
//   sendMessage() {
//     if (this.newMessage.trim() !== '') {
//       this.messages.push({
//         sender: 'user',
//         text: this.newMessage
//       });

//       this.newMessage = '';  // Clear the input field
//       this.scrollToBottom(false); // Scroll down after sending a message

//       // Simulate bot reply
//       setTimeout(() => {
//         this.botReply();
//       }, 1500); // Delay of 1.5 seconds for bot response
//     }
//   }

//   // Simulate bot reply
//   botReply() {
//     const botResponses = [
//       'Hello! How can I assist you?',
//       'I am here to help.',
//       // More bot responses...
//     ];

//     const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];

//     this.messages.push({
//       sender: 'bot',
//       text: randomReply
//     });

//     this.scrollToBottom(false);  // Scroll to bottom only if near bottom
//   }

//   // Scroll to the bottom of the chat
//   scrollToBottom(animate: boolean = false) {
//     setTimeout(() => {
//       if (this.content) {
//         this.content.scrollToBottom(animate ? 300 : 0);  // No animation for smooth behavior
//       }
//     }, 100);  // Delay to ensure DOM is updated
//   }
// }

















// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { SocketService } from 'src/app/socket.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.page.html',
//   styleUrls: ['./chat.page.scss'],
// })
// export class ChatComponent implements OnInit {
//   roomId: string = '';
//   friendName: string = '';
//   chatMessage: string = '';
//   chatMessages: any[] = [];
//   localStream: any;
//   peerConnection: RTCPeerConnection | null = null;
//   isVideoCallVisible: boolean = false;
//   isAudioCallVisible: boolean = false;

//   @ViewChild('localVideo', { static: false }) localVideo: any;
//   @ViewChild('remoteVideo', { static: false }) remoteVideo: any;

//   private config = {
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   };

//   constructor(private route: ActivatedRoute, private socketService: SocketService) {}

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.roomId = params['roomId'];
//       this.friendName = params['friendName'];
//     });

//     // Listen for incoming chat messages
//     this.socketService.onChatMessage().subscribe(data => {
//       this.chatMessages.push(data);
//     });

//     // Listen for video/audio call offers and answers
//     this.socketService.onOffer().subscribe(offer => this.handleOffer(offer));
//     this.socketService.onAnswer().subscribe(answer => this.handleAnswer(answer));
//     this.socketService.onIceCandidate().subscribe(candidate => this.handleIceCandidate(candidate));
//   }

//   sendMessage() {
//     if (this.chatMessage.trim()) {
//       const messageData = { user: this.friendName, message: this.chatMessage };
//       this.socketService.sendMessage(this.roomId, messageData);
//       this.chatMessages.push(messageData); // Add to local messages
//       this.chatMessage = ''; // Clear input
//     }
//   }

//   startVideoCall() {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         this.localStream = stream;
//         if (this.localVideo && this.localVideo.nativeElement) {
//           this.localVideo.nativeElement.srcObject = stream;
//         }

//         this.peerConnection = new RTCPeerConnection(this.config);
//         this.localStream.getTracks().forEach((track:any) => this.peerConnection!.addTrack(track, this.localStream));

//         this.peerConnection.onicecandidate = event => {
//           if (event.candidate) {
//             this.socketService.sendIceCandidate(this.roomId, event.candidate);
//           }
//         };

//         this.peerConnection.ontrack = event => {
//           if (this.remoteVideo && this.remoteVideo.nativeElement) {
//             this.remoteVideo.nativeElement.srcObject = event.streams[0];
//           }
//         };

//         return this.peerConnection.createOffer();
//       })
//       .then(offer => {
//         return this.peerConnection!.setLocalDescription(offer);
//       })
//       .then(() => {
//         this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
//         this.isVideoCallVisible = true; // Show video call
//       })
//       .catch(error => {
//         console.error('Error accessing media devices:', error);
//         alert('Could not access camera/microphone. Please check your permissions.');
//       });
//   }

//   startAudioCall() {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         this.localStream = stream;

//         this.peerConnection = new RTCPeerConnection(this.config);
//         this.localStream.getTracks().forEach((track:any) => this.peerConnection!.addTrack(track, this.localStream));

//         this.peerConnection.onicecandidate = event => {
//           if (event.candidate) {
//             this.socketService.sendIceCandidate(this.roomId, event.candidate);
//           }
//         };

//         this.peerConnection.ontrack = event => {
//           const remoteAudio = new Audio();
//           remoteAudio.srcObject = event.streams[0];
//           remoteAudio.play().catch(error => {
//             console.error('Error playing remote audio:', error);
//           });
//         };

//         return this.peerConnection.createOffer();
//       })
//       .then(offer => {
//         return this.peerConnection!.setLocalDescription(offer);
//       })
//       .then(() => {
//         this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
//         this.isAudioCallVisible = true; // Show audio call
//       })
//       .catch(error => {
//         console.error('Error accessing audio devices:', error);
//         alert('Could not access microphone. Please check your permissions.');
//       });
//   }

//   endVideoCall() {
//     if (this.peerConnection) {
//       this.peerConnection.close();
//       this.peerConnection = null;
//     }
//     if (this.localStream) {
//       this.localStream.getTracks().forEach((track:any) => track.stop());
//     }
//     if (this.localVideo && this.localVideo.nativeElement) {
//       this.localVideo.nativeElement.srcObject = null;
//     }
//     this.isVideoCallVisible = false;
//   }

//   endAudioCall() {
//     if (this.peerConnection) {
//       this.peerConnection.close();
//       this.peerConnection = null;
//     }
//     if (this.localStream) {
//       this.localStream.getTracks().forEach((track:any) => track.stop());
//     }
//     this.isAudioCallVisible = false;
//   }

//   private handleOffer(offer: any) {
//     if (!this.peerConnection) {
//       this.peerConnection = new RTCPeerConnection(this.config);
//       this.peerConnection.onicecandidate = event => {
//         if (event.candidate) {
//           this.socketService.sendIceCandidate(this.roomId, event.candidate);
//         }
//       };
//       this.peerConnection.ontrack = event => {
//         if (this.remoteVideo && this.remoteVideo.nativeElement) {
//           this.remoteVideo.nativeElement.srcObject = event.streams[0];
//         }
//       };
//     }
//     this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
//       .then(() => this.peerConnection!.createAnswer())
//       .then(answer => this.peerConnection!.setLocalDescription(answer))
//       .then(() => {
//         this.socketService.sendAnswer(this.roomId, this.peerConnection!.localDescription);
//       });
//   }

//   private handleAnswer(answer: any) {
//     if (this.peerConnection) {
//       this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     }
//   }

//   private handleIceCandidate(candidate: any) {
//     if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
//       this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
//         .catch(error => {
//           console.error('Error adding ICE candidate:', error);
//         });
//     }
//   }
// }




















import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  roomId: string = '';
  friendName: string = '';
  chatMessage: string = '';
  chatMessages: any[] = [];
  localStream: any;
  peerConnection: RTCPeerConnection | null = null;
  isVideoCallVisible: boolean = false;
  isAudioCallVisible: boolean = false;

  @ViewChild('localVideo', { static: false }) localVideo: any;
  @ViewChild('remoteVideo', { static: false }) remoteVideo: any;

  private config = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  constructor(private route: ActivatedRoute, private socketService: SocketService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'];
      this.friendName = params['friendName'];
    });

    this.socketService.onChatMessage().subscribe(data => {
      this.chatMessages.push(data);
    });

    this.socketService.onOffer().subscribe(offer => this.handleOffer(offer));
    this.socketService.onAnswer().subscribe(answer => this.handleAnswer(answer));
    this.socketService.onIceCandidate().subscribe(candidate => this.handleIceCandidate(candidate));
  }

  sendMessage() {
    if (this.chatMessage.trim()) {
      const messageData = { user: this.friendName, message: this.chatMessage };
      this.socketService.sendMessage(this.roomId, messageData);
      this.chatMessages.push(messageData);
      this.chatMessage = '';
    }
  }

  startVideoCall() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.localStream = stream;
        if (this.localVideo && this.localVideo.nativeElement) {
          this.localVideo.nativeElement.srcObject = stream;
        }

        this.peerConnection = new RTCPeerConnection(this.config);
        this.localStream.getTracks().forEach((track: any) => this.peerConnection!.addTrack(track, this.localStream));

        this.peerConnection.onicecandidate = event => {
          if (event.candidate) {
            this.socketService.sendIceCandidate(this.roomId, event.candidate);
          }
        };

        this.peerConnection.ontrack = event => {
          console.log('Remote track received');
          if (this.remoteVideo && this.remoteVideo.nativeElement) {
            const [remoteStream] = event.streams;
            this.remoteVideo.nativeElement.srcObject = remoteStream;
          }
        };

        return this.peerConnection.createOffer();
      })
      .then(offer => {
        return this.peerConnection!.setLocalDescription(offer);
      })
      .then(() => {
        this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
        this.isVideoCallVisible = true;
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera/microphone. Please check your permissions.');
      });
  }

  startAudioCall() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.localStream = stream;

        this.peerConnection = new RTCPeerConnection(this.config);
        this.localStream.getTracks().forEach((track: any) => this.peerConnection!.addTrack(track, this.localStream));

        this.peerConnection.onicecandidate = event => {
          if (event.candidate) {
            this.socketService.sendIceCandidate(this.roomId, event.candidate);
          }
        };

        this.peerConnection.ontrack = event => {
          const remoteAudio = new Audio();
          remoteAudio.srcObject = event.streams[0];
          remoteAudio.play().catch(error => {
            console.error('Error playing remote audio:', error);
          });
        };

        return this.peerConnection.createOffer();
      })
      .then(offer => {
        return this.peerConnection!.setLocalDescription(offer);
      })
      .then(() => {
        this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
        this.isAudioCallVisible = true;
      })
      .catch(error => {
        console.error('Error accessing audio devices:', error);
        alert('Could not access microphone. Please check your permissions.');
      });
  }

  endVideoCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track: any) => track.stop());
    }
    if (this.localVideo && this.localVideo.nativeElement) {
      this.localVideo.nativeElement.srcObject = null;
    }
    this.isVideoCallVisible = false;
  }

  endAudioCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach((track: any) => track.stop());
    }
    this.isAudioCallVisible = false;
  }

  private handleOffer(offer: any) {
    console.log('Received offer:', offer);
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection(this.config);
      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socketService.sendIceCandidate(this.roomId, event.candidate);
        }
      };
      this.peerConnection.ontrack = event => {
        console.log('Remote track received');
        if (this.remoteVideo && this.remoteVideo.nativeElement) {
          const [remoteStream] = event.streams;
          this.remoteVideo.nativeElement.srcObject = remoteStream;
        }
      };
    }
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => this.peerConnection!.createAnswer())
      .then(answer => this.peerConnection!.setLocalDescription(answer))
      .then(() => {
        this.socketService.sendAnswer(this.roomId, this.peerConnection!.localDescription);
      });
  }

  private handleAnswer(answer: any) {
    console.log('Received answer:', answer);
    if (this.peerConnection) {
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  private handleIceCandidate(candidate: any) {
    console.log('Received ICE candidate:', candidate);
    if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error => {
          console.error('Error adding ICE candidate:', error);
        });
    }
  }
}

