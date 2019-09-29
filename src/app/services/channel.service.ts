import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Channel } from '../models/channel';
import { BACKEND_URL } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) {
    console.log('BACKEND_URL', BACKEND_URL);
  }

  getAll() {
      return this.http.get<Channel[]>(`${BACKEND_URL}/channels`);
  }

  getByName(channelname: string) {
      return this.http.get(`${BACKEND_URL}/channels/${channelname}`);
  }

  add(channel: Channel) {
      return this.http.post(`${BACKEND_URL}/channel`, channel);
  }

  update(channel: Channel) {
      return this.http.put(`${BACKEND_URL}/channels/${channel.channelname}`, channel);
  }

  delete(channelname: string) {
      return this.http.delete(`${BACKEND_URL}/channels/${channelname}`);
  }
}
