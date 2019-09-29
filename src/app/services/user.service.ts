import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { BACKEND_URL } from '../../globals';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${BACKEND_URL}/users`);
    }

    getByUsername(username: string) {
        return this.http.get(`${BACKEND_URL}/user/${username}`);
    }

    register(user: User) {
        return this.http.post(`${BACKEND_URL}/user`, user);
    }

    create(user: User) {
      return this.http.post(`${BACKEND_URL}/user`, user);
    }

    update(user: User) {
        return this.http.put(`${BACKEND_URL}/user/${user.username}`, user);
    }

    delete(username: string) {
        return this.http.delete(`${BACKEND_URL}/user/${username}`);
    }

    // upper(user: User) {
    //     if (user.role === 'user') {
    //         user.role = 'groupaAssit';
    //     } else if (user.role === 'groupaAssit') {
    //         user.role = 'groupAdmin';
    //     } else if (user.role === 'groupAdmin') {
    //         user.role = 'super';
    //     }
    // }

    addToGroup(user: User, group: string) {
        console.log('the user', user, 'the group:', group);
        // user.group = group;
    }
}
