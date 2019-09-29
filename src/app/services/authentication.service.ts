import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { BACKEND_URL } from '../../globals';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentGroupSubject: BehaviorSubject<Group>;
  public currentUser: Observable<User>;
  public currentGroup: Observable<Group>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.currentGroupSubject = new BehaviorSubject<Group>(JSON.parse(localStorage.getItem('currentGroup')));
      this.currentGroup = this.currentGroupSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  public get currentGroupValue(): Group {
    return this.currentGroupSubject.value;
   }

  login(username: string, password: string) {
      // username = 'super';
      // password = 'super';
      return this.http.post<any>(`${BACKEND_URL}/login`, { username, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);

                  console.log('before loginafter');

                  this.http.post<any>(`${BACKEND_URL}/loginafter`, { ...user })
                    .subscribe((data) => console.log({ data }));
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }


}
