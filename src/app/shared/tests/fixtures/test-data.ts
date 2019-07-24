import {Vendor} from '../../models/vendor.model';
import {Certification} from '../../models/certification.model';
import {Exam} from '../../models/exam.model';
import {User} from '../../models/user.model';
import {UserCertification} from '../../../user-certifications/models/user-certification.model';
import {UserExam} from '../../../user-certifications/models/user-exam.model';


export const vendor = new Vendor(1, new Date(), new Date(), 'test', 'test.jpg', 'test');
export const certification = new Certification(1, new Date(), new Date(), 'test', 'test',
  'test.jpg', 'test', false, vendor.id);
export const exam = new Exam(1, new Date(), new Date(), 'test', 'test-1', 'test',
  false, [certification.id]);
export const user = new User(1, 'test', 'test@test.com', 'Test', 'Test');
export const userCertification = new UserCertification(1, user, certification, certification.id, new Date(),
  null, new Date(), new Date());
export const userExam = new UserExam(1, user, userCertification, userCertification.id, exam, exam.id, new Date(),
  new Date(), new Date(), null);
