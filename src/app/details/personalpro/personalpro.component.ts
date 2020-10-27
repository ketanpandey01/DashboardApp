import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personalpro',
  templateUrl: './personalpro.component.html',
  styleUrls: ['./personalpro.component.css']
})
export class PersonalproComponent implements OnInit {

  infoForm: FormGroup;
  submitted = false;
  loading = false;
  detailPageName: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.detailPageName = this.route.snapshot.routeConfig.path;
    if (this.detailPageName === 'personal') {
      this.infoForm = this.formBuilder.group({
        firstName: [this.authenticationService.currentUserValue.firstName, Validators.required],
        lastName: [this.authenticationService.currentUserValue.lastName, Validators.required]
      });
    } else if(this.detailPageName === 'professional') {
      this.infoForm = this.formBuilder.group({
        experience: [this.authenticationService.currentUserValue.experience, Validators.required]
      });
    }

  }

  get form() { return this.infoForm.controls; }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.infoForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateDetails(this.infoForm.value).subscribe(
      data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated successfully' });
        this.loading = false;
        this.onCancel();
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'info', detail: error.error.message });
        this.loading = false;
      }
    );
  }

  onCancel() {
    this.submitted = false;
    this.infoForm.reset()

  }

}
