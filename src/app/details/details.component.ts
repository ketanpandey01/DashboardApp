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
    this.subscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.selectedInfo = 'personal';
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
