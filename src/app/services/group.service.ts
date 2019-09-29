import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from '../models/group';
import { BACKEND_URL } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
    console.log('config1', BACKEND_URL);
    // var config1 = config1;
  }

  getAll() {
      return this.http.get<Group[]>(`${BACKEND_URL}/groups`);
  }

  getById(groupname: string) {
      return this.http.get(`${BACKEND_URL}/groups/${groupname}`);
  }

  register(group: Group) {
      return this.http.post(`${BACKEND_URL}/groups/register`, group);
  }

  update(group: Group) {
      return this.http.put(`${BACKEND_URL}/groups/${group.groupName}`, group);
  }

  delete(id: number) {
      return this.http.delete(`${BACKEND_URL}/groups/${id}`);
  }

}
