import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private messageService: MessageService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get form() { 
    console.log(this.registerForm.controls);
    return this.registerForm.controls; }

  onRegister() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    this.userService.register(this.registerForm.value).subscribe(
      data => {
        this.messageService.add({severity:'success', detail: "Registration successful"});
        this.router.navigateByUrl('/login');
      },
      error => {
        this.messageService.add({severity:'error', detail: error.error.message});
        this.loading = false;
      }
    );
  }

}
