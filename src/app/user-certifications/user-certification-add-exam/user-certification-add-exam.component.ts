import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

import {Certification} from '../../shared/models/certification.model';
import {Exam} from '../../shared/models/exam.model';
import {ExamService} from '../../certifications/services/exam.service';

@Component({
  selector: 'app-user-certification-add-exam',
  templateUrl: './user-certification-add-exam.component.html',
  styleUrls: ['./user-certification-add-exam.component.scss']
})
export class UserCertificationAddExamComponent implements OnInit {
  faCalendar = faCalendarAlt;
  @Input() certification: Certification;
  exams: Exam[] = [];
  choosedExamId: number;
  choosedDate: Date;

  constructor(public activeModal: NgbActiveModal,
              private examSvc: ExamService) { }

  ngOnInit() {
    this.examSvc.getExamsForCertification(this.certification).subscribe((exams: Exam[]) => {
      this.exams = exams;
    })
  }

  onCertDateSelect(event) {
    this.choosedDate =  new Date(event.year, event.month - 1, event.day);
  }

}
