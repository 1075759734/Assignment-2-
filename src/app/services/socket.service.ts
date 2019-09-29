import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { BACKEND_URL } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }

  public initSocket(): void {
    this.socket = io(BACKEND_URL);
  }

  public send(message: IMessage): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('message', (data: IMessage) => observer.next(data));
    });

    return observable;
  }
}

export interface IMessage {
  username: string;
  text?: string;
  image?: string;
}
