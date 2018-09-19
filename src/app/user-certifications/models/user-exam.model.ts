import {User} from '../../shared/models/user.model';
import {UserCertification} from './user-certification.model';
import {Exam} from '../../shared/models/exam.model';

export class UserExam {
  constructor (public id: number,
               public user: User,
               public user_certification: UserCertification,
               public user_certification_id: number,
               public exam: Exam,
               public exam_id: number,
               public created: Date,
               public updated: Date,
               public date_of_pass: Date,
               public remind_at_date: Date) {}
}
