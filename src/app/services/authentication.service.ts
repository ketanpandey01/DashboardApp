import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  users = JSON.parse(localStorage.getItem("users")) || [];

  constructor(private http: HttpClient) {
    // let currentUserObj = localStorage.getItem("currentUser");
    // console.log("currnetUser", currentUserObj);
    // if(currentUserObj===)
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  setUserSubject(user) {
    this.currentUserSubject.next(user);
  }

  login(username, password) {
    const authData = { username: username, password: password };
    return this.http.post(
      "http://dashboardnodebackend-env.eba-wsndghtk.ap-south-1.elasticbeanstalk.com/api/user/login",
      authData
    );

    // this.users = JSON.parse(localStorage.getItem('users')) || [];
    // const user = this.users.find(x => x.username === username && x.password === password);
    // if (!user) return this.error('Username or password is incorrect');

    // localStorage.setItem('currentUser', JSON.stringify(user));
    // this.currentUserSubject.next(user);
    // var body = {
    //   username: user.username,
    //   firstName: user.firstName,
    //   lastName: user.lastName
    // }
    // return of(new HttpResponse({ status: 200, body }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  error(message) {
    return throwError({ error: { message } });
  }
}
