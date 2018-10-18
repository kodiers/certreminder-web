import {Component, Input, OnInit} from '@angular/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.scss']
})
export class DateModalComponent implements OnInit {
  faCalendar = faCalendarAlt;
  choosedDate = null;
  @Input() title;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onCertDateSelect(event) {
    this.choosedDate =  new Date(event.year, event.month - 1, event.day);
  }

}
