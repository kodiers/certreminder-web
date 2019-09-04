import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-restore-password-confirm',
  templateUrl: './restore-password-confirm.component.html',
  styleUrls: ['./restore-password-confirm.component.scss']
})
export class RestorePasswordConfirmComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  passwordResetToken: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe( data => {
      this.passwordResetToken = data.token;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  onRestorePassword(form: NgForm) {

  }

}
