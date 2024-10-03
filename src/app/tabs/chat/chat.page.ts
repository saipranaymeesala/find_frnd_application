
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { SocketService } from 'src/app/socket.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.page.html',
//   styleUrls: ['./chat.page.scss'],
// })
// export class ChatPage implements OnInit {
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
//       this.localStream.getTracks().forEach((track:any)=> track.stop());
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
        this.localStream.getTracks().forEach((track:any) => this.peerConnection!.addTrack(track, this.localStream));

        this.peerConnection.onicecandidate = event => {
          if (event.candidate) {
            this.socketService.sendIceCandidate(this.roomId, event.candidate);
          }
        };

        this.peerConnection.ontrack = event => {
          if (this.remoteVideo && this.remoteVideo.nativeElement) {
            this.remoteVideo.nativeElement.srcObject = event.streams[0];
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
        this.localStream.getTracks().forEach((track:any) => this.peerConnection!.addTrack(track, this.localStream));

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
      this.localStream.getTracks().forEach((track:any)=> track.stop());
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
      this.localStream.getTracks().forEach((track:any) => track.stop());
    }
    this.isAudioCallVisible = false;
  }

  private handleOffer(offer: any) {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection(this.config);
      this.peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socketService.sendIceCandidate(this.roomId, event.candidate);
        }
      };
      this.peerConnection.ontrack = event => {
        if (this.remoteVideo && this.remoteVideo.nativeElement) {
          this.remoteVideo.nativeElement.srcObject = event.streams[0];
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
    if (this.peerConnection) {
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  private handleIceCandidate(candidate: any) {
    if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error => {
          console.error('Error adding ICE candidate:', error);
        });
    }
  }

}
















































  
















