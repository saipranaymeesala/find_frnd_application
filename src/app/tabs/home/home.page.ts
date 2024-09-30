// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { LoginService } from '../../apis/login.service';
// import { RequsetService } from '../../apis/requset-service';
// import { Router } from '@angular/router';
// import { SocketService } from 'src/app/socket.service';
// import { ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   public notificationCount: number = 15;
//   userData: any;
//   // constructor(private router: Router) { }

//   constructor(private http: HttpClient, private socketService: SocketService,private router:Router) {
//     this.socketService.onChatMessage().subscribe(data => {
//       const chatMessages = document.getElementById('chatMessages');
//       chatMessages!.innerHTML += `<div><b>${data.user}:</b> ${data.message}</div>`;
//     });

//     this.socketService.onOffer().subscribe(offer => this.handleOffer(offer));
//     this.socketService.onAnswer().subscribe(answer => this.handleAnswer(answer));
//     this.socketService.onIceCandidate().subscribe(candidate => this.handleIceCandidate(candidate));
//   }
//   public notification(): void {
//     this.notificationCount++;
//   }

//   public profileDetails() {

//     this.router.navigate(['/profiledetails']);
//   }
//   profilePicture: any;
//   currentUser: any;
//   otherUsers: any[] = [];
//   chatMessage: string = '';
//   isChatVisible: boolean = false;
//   isVideoCallVisible: boolean = false;
//   isAudioCallVisible: boolean = false; 
//   roomId: string = '';
//   localStream: MediaStream | null = null;
//   peerConnection: RTCPeerConnection | null = null;

//   @ViewChild('localVideo', { static: false }) localVideo: any;
//   @ViewChild('remoteVideo', { static: false }) remoteVideo: any;

//   private config = {
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   };

//   ngOnInit() {
//     this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
//     console.log(this.userData);
//     const email= JSON.parse(JSON.stringify(localStorage.getItem('userEmail')))
//     console.log(email)

//     this.http.post('http://localhost:3000/signin', { email:email }).subscribe(
//       (response: any) => {
//         alert('Sign in successful');
//         this.currentUser = response;
//         console.log(response)
//         this.loadUsers();
//       },
//       error => alert(error.error.error)
//     );
//   }


//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files!.length > 0) {
//       this.profilePicture = input.files![0];
//     }
//   }

//   loadUsers() {
//     this.http.get(`http://localhost:3000/users/${this.currentUser.email}`).subscribe((users: any) => {
//       this.otherUsers = users;
//       console.log(users)
//     });
//   }

//   logout() {
//     this.currentUser = null;
//     this.isChatVisible = false;
//     this.isVideoCallVisible = false;
//     this.isAudioCallVisible = false; 
//   }
//   startChatOrCall(friendName: string) {
//     const sortedNames = [this.currentUser.nickname, friendName].sort();
//     console.log(this.currentUser.name)
//     this.roomId = sortedNames.join('-');
//     this.socketService.joinRoom(this.roomId);
//     this.isChatVisible = true;
//   }
//   sendMessage() {
//     this.socketService.sendMessage(this.roomId, { user: this.currentUser.nickname, message: this.chatMessage });
//     const chatMessages = document.getElementById('chatMessages');
//     chatMessages!.innerHTML += `<div><b>${this.currentUser.nickname}:</b> ${this.chatMessage}</div>`;
//     this.chatMessage = '';
//   }

//   startVideoCall() {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         this.localStream = stream;
//         if (this.localVideo && this.localVideo.nativeElement) {
//           this.localVideo.nativeElement.srcObject = stream;
//         }

//         this.peerConnection = new RTCPeerConnection(this.config);
//         this.localStream.getTracks().forEach(track => {
//           this.peerConnection!.addTrack(track, this.localStream!);
//         });

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
//         this.isChatVisible = false;
//         this.isVideoCallVisible = true;
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
//         this.localStream.getTracks().forEach(track => {
//           this.peerConnection!.addTrack(track, this.localStream!);
//         });

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
//           console.log('Remote audio track received');
//         };

//         return this.peerConnection.createOffer();
//       })
//       .then(offer => {
//         return this.peerConnection!.setLocalDescription(offer);
//       })
//       .then(() => {
//         this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
//         this.isChatVisible = false;
//         this.isAudioCallVisible = true; 
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
//       this.localStream.getTracks().forEach(track => track.stop());
//     }
//     if (this.localVideo && this.localVideo.nativeElement) {
//       this.localVideo.nativeElement.srcObject = null;
//     }
//     if (this.remoteVideo && this.remoteVideo.nativeElement) {
//       this.remoteVideo.nativeElement.srcObject = null;
//     }
//     this.isVideoCallVisible = false;
//     this.isChatVisible = true;
//   }

//   endAudioCall() {
//     if (this.peerConnection) {
//       this.peerConnection.close();
//       this.peerConnection = null; 
//     }
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => track.stop());
//     }
//     this.isAudioCallVisible = false;
//     this.isChatVisible = true; // Return to chat
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
//         const remoteAudio = new Audio();
//         remoteAudio.srcObject = event.streams[0];
//         remoteAudio.play().catch(error => {
//           console.error('Error playing remote audio:', error);
//         });
//         console.log('Remote audio track received');
//       };
//     }
//     this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
//       .then(() => {
//         return this.peerConnection!.createAnswer();
//       })
//       .then(answer => {
//         return this.peerConnection!.setLocalDescription(answer);
//       })
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
//     console.log('Received ICE candidate:', candidate); // Log candidate
//     if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
//       this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
//         .catch(error => {
//           console.error('Error adding ICE candidate:', error);
//         });
//     } else {
//       console.warn('PeerConnection is closed, unable to add ICE candidate.');
//     }
//   }





// }













// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { LoginService } from '../../apis/login.service';
// import { RequsetService } from '../../apis/requset-service';
// import { Router } from '@angular/router';
// import { SocketService } from 'src/app/socket.service';
// import { ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   public notificationCount: number = 15;
//   userData: any;
//   // constructor(private router: Router) { }

//   constructor(private http: HttpClient, private socketService: SocketService,private router:Router) {
//     this.socketService.onChatMessage().subscribe(data => {
//       const chatMessages = document.getElementById('chatMessages');
//       chatMessages!.innerHTML += `<div><b>${data.user}:</b> ${data.message}</div>`;
//     });

//     this.socketService.onOffer().subscribe(offer => this.handleOffer(offer));
//     this.socketService.onAnswer().subscribe(answer => this.handleAnswer(answer));
//     this.socketService.onIceCandidate().subscribe(candidate => this.handleIceCandidate(candidate));
//   }
//   public notification(): void {
//     this.notificationCount++;
//   }

//   public profileDetails() {

//     this.router.navigate(['/profiledetails']);
//   }
//   profilePicture: any;
//   currentUser: any;
//   otherUsers: any[] = [];
//   chatMessage: string = '';
//   isChatVisible: boolean = false;
//   isVideoCallVisible: boolean = false;
//   isAudioCallVisible: boolean = false; 
//   roomId: string = '';
//   localStream: MediaStream | null = null;
//   peerConnection: RTCPeerConnection | null = null;

//   @ViewChild('localVideo', { static: false }) localVideo: any;
//   @ViewChild('remoteVideo', { static: false }) remoteVideo: any;

//   private config = {
//     iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//   };

//   ngOnInit() {
//     this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
//     console.log(this.userData);
//     const email= JSON.parse(JSON.stringify(localStorage.getItem('userEmail')))
//     console.log(email)

//     this.http.post('http://localhost:3000/signin', { email:email }).subscribe(
//       (response: any) => {
//         alert('Sign in successful');
//         this.currentUser = response;
//         console.log(response)
//         this.loadUsers();
//       },
//       error => alert(error.error.error)
//     );
//   }


//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files!.length > 0) {
//       this.profilePicture = input.files![0];
//     }
//   }

//   loadUsers() {
//     this.http.get(`http://localhost:3000/users/${this.currentUser.email}`).subscribe((users: any) => {
//       this.otherUsers = users;
//       console.log(users)
//     });
//   }

//   logout() {
//     this.currentUser = null;
//     this.isChatVisible = false;
//     this.isVideoCallVisible = false;
//     this.isAudioCallVisible = false; 
//   }
//   startChatOrCall(friendName: string) {
//     const sortedNames = [this.currentUser.nickname, friendName].sort();
//     console.log(this.currentUser.name)
//     this.roomId = sortedNames.join('-');
//     this.socketService.joinRoom(this.roomId);
//     this.isChatVisible = true;
//   }
//   sendMessage() {
//     this.socketService.sendMessage(this.roomId, { user: this.currentUser.nickname, message: this.chatMessage });
//     const chatMessages = document.getElementById('chatMessages');
//     chatMessages!.innerHTML += `<div><b>${this.currentUser.nickname}:</b> ${this.chatMessage}</div>`;
//     this.chatMessage = '';
//   }

//   startVideoCall() {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         this.localStream = stream;
//         if (this.localVideo && this.localVideo.nativeElement) {
//           this.localVideo.nativeElement.srcObject = stream;
//         }

//         this.peerConnection = new RTCPeerConnection(this.config);
//         this.localStream.getTracks().forEach(track => {
//           this.peerConnection!.addTrack(track, this.localStream!);
//         });

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
//         this.isChatVisible = false;
//         this.isVideoCallVisible = true;
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
//         this.localStream.getTracks().forEach(track => {
//           this.peerConnection!.addTrack(track, this.localStream!);
//         });

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
//           console.log('Remote audio track received');
//         };

//         return this.peerConnection.createOffer();
//       })
//       .then(offer => {
//         return this.peerConnection!.setLocalDescription(offer);
//       })
//       .then(() => {
//         this.socketService.sendOffer(this.roomId, this.peerConnection!.localDescription);
//         this.isChatVisible = false;
//         this.isAudioCallVisible = true; 
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
//       this.localStream.getTracks().forEach(track => track.stop());
//     }
//     if (this.localVideo && this.localVideo.nativeElement) {
//       this.localVideo.nativeElement.srcObject = null;
//     }
//     if (this.remoteVideo && this.remoteVideo.nativeElement) {
//       this.remoteVideo.nativeElement.srcObject = null;
//     }
//     this.isVideoCallVisible = false;
//     this.isChatVisible = true;
//   }

//   endAudioCall() {
//     if (this.peerConnection) {
//       this.peerConnection.close();
//       this.peerConnection = null; 
//     }
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => track.stop());
//     }
//     this.isAudioCallVisible = false;
//     this.isChatVisible = true; // Return to chat
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
//         const remoteAudio = new Audio();
//         remoteAudio.srcObject = event.streams[0];
//         remoteAudio.play().catch(error => {
//           console.error('Error playing remote audio:', error);
//         });
//         console.log('Remote audio track received');
//       };
//     }
//     this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
//       .then(() => {
//         return this.peerConnection!.createAnswer();
//       })
//       .then(answer => {
//         return this.peerConnection!.setLocalDescription(answer);
//       })
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
//     console.log('Received ICE candidate:', candidate); // Log candidate
//     if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
//       this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
//         .catch(error => {
//           console.error('Error adding ICE candidate:', error);
//         });
//     } else {
//       console.warn('PeerConnection is closed, unable to add ICE candidate.');
//     }
//   }





// }




import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public notificationCount: number = 15;
  userData: any;
  currentUser: any;
  otherUsers: any[] = [];
  chatMessage: string = '';

  constructor(private http: HttpClient, private socketService: SocketService, private router: Router) {}

  ngOnInit() {
        this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
        const email= JSON.parse(JSON.stringify(localStorage.getItem('userEmail')))
    this.http.post('http://localhost:3000/signin', { email }).subscribe(
      (response: any) => {
        this.currentUser = response;
        this.loadUsers();
      },
      error => alert(error.error.error)
    );
  }

  loadUsers() {
    this.http.get(`http://localhost:3000/users/${this.currentUser.email}`).subscribe((users: any) => {
      this.otherUsers = users;
    });
  }

  startChatOrCall(friendName: string) {
    const sortedNames = [this.currentUser.nickname, friendName].sort();
    const roomId = sortedNames.join('-');
    this.socketService.joinRoom(roomId);
    
    // Navigate to chat page
    this.router.navigate(['/tabs/chat', { roomId, friendName }]);
  }
}
