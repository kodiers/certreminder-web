import { Component, OnInit, Input } from '@angular/core';
import {UserCertification} from '../../models/user-certification.model';

@Component({
  selector: 'app-user-certification-list-item',
  templateUrl: './user-certification-list-item.component.html',
  styleUrls: ['./user-certification-list-item.component.css']
})
export class UserCertificationListItemComponent implements OnInit {
  @Input() userCert: UserCertification;

  constructor() { }

  ngOnInit() {
  }

}
