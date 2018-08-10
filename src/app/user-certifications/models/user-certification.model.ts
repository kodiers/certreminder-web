import {User} from '../../shared/models/user.model';
import {Certification} from '../../shared/models/certification.model';

export class UserCertification {
  constructor(public id: number,
              public user: User,
              public certification: Certification,
              public certification_id: number,
              public expiration_date: Date,
              public remind_at_date: Date,
              public created: Date,
              public updated: Date) {}
}
