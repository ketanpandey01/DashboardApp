import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // array in local storage for registered users
  users = JSON.parse(localStorage.getItem('users')) || [];

  constructor(private authenticationService: AuthenticationService) { }

  register(user) {
    if (this.users.find(x => x.username === user.username)) {
      return this.error('Username "' + user.username + '" is already taken')
    }

    // user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    user['experience'] = 0
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    var body = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }
    return of(new HttpResponse({ status: 200, body }))
  }

  updateDetails(user) {
    if(user.hasOwnProperty('experience')) {
      for (var val of this.users) {
        if (val.username === this.authenticationService.currentUserValue.username) {
          if(user.experience === val.experience) return this.error('No change in data');
          val.experience = user.experience;
          break;
        }
      }
      var body = {
        firstName: this.authenticationService.currentUserValue.firstName,
        lastName: this.authenticationService.currentUserValue.lastName,
        username: this.authenticationService.currentUserValue.username,
        password: this.authenticationService.currentUserValue.password,
        experience: user.experience
      }
    }
    else {
      for (var val of this.users) {
        if (val.username === this.authenticationService.currentUserValue.username) {
          if(user.firstName === val.firstName && user.lastName == val.lastName) return this.error('No change in data');
          val.firstName = user.firstName;
          val.lastName = user.lastName;
          break;
        }
      }
      var body = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: this.authenticationService.currentUserValue.username,
        password: this.authenticationService.currentUserValue.password,
        experience: this.authenticationService.currentUserValue.experience
      }
    }

    localStorage.setItem('users', JSON.stringify(this.users));

    localStorage.setItem('currentUser', JSON.stringify(body));
    this.authenticationService.setUserSubject(body);
    return of(new HttpResponse({ status: 200, body }))
  }

  error(message) {
    return throwError({ error: { message } });
  }
}
