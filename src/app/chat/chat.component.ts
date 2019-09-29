import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { ImageService } from '../services/image.service';
import {
  IMessage,
  SocketService
} from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  BASE_URL = 'http://localhost:3000/';
  messageContent: IMessage = { username: '', text: '', image: '' };
  messages = [];
  ioConnection: any;

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private socketService: SocketService,
    private imageService: ImageService,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.messageContent.username = this.currentUser.username;
    });
  }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  private chat() {
    if (this.messageContent) {
      this.socketService.send({ ...this.messageContent, image: '' });
      this.messageContent = {
        username: this.currentUser.username,
        text: '',
        image: ''
      };
    } else {
      console.log('no message');
    }
  }

  private onFileChanged(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.imageService.uploadImage(file).subscribe(
        (res) => {
          if (res.status === 'ok') {
            console.log(`File ${res.filename} uploaded.`);
            // send image as message
            this.messageContent = {
              username: this.currentUser.username,
              text: '',
              image: res.filename
            };
            this.socketService.send(this.messageContent);
          }
        },
        (err) => {
          console.log(`file upload error: ${err}`);
          console.log({err});
        });
    }
  }
}


