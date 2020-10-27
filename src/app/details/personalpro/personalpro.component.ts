import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import {MessageService} from 'primeng/api';

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
    private alertService: AlertService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.detailPageName = this.route.snapshot.routeConfig.path;
  }

  get form() { return this.infoForm.controls; }

  onUpdate() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.infoForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateDetails(this.infoForm.value).subscribe(
      data => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data update successfully'});
        this.loading = false;
        this.onCancel();
      },
      error => {
        console.log(error);
        this.messageService.add({severity:'info', detail:error.error.message});
        this.loading = false;
        this.onCancel();
      }
    );
  }

  onCancel(){
    this.submitted = false;
    this.infoForm.reset()

  }

}
