import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  currentUser: any;
  firstName: string;
  lastName: string;
  selectedInfo: string;
  subscription: Subscription;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    // this.router.navigateByUrl('/personal');  
    // console.log(localStorage.getItem('users'));
    // console.log(localStorage.getItem('currentUser'));
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('users');
    // this.currentUserSubject.next(null);
    // console.log('Inside details');
    // console.log('All users', localStorage.getItem('users'));
    // console.log('')
    this.subscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.selectedInfo = 'personal';
    // console.log('Current logged in user', this.currentUser);
    // this.firstName = this.currentUser.firstName;
    // this.lastName = this.currentUser.lastName;
    // console.log(this.authenticationService.currentUserValue);
  }

  getDetails(detail) {
    switch (detail) {
      case 'personal':
        this.selectedInfo = 'personal';
        this.router.navigateByUrl('/details/personal');
        break;
      case 'pro':
        this.selectedInfo = 'pro';
        this.router.navigateByUrl('/details/professional');
        break
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
}

}
