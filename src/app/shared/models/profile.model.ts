import {User} from './user.model';

export class Profile {
  constructor(public id: number,
              public user: User,
              public token: string,
              public created: Date,
              public updated: Date,
              public country: string,
              public date_of_birth: string,
              public description: string,
              public avatar: string) {}
}
