export class Certification {
  constructor(public id: number,
              public created: Date,
              public updated: Date,
              public title: string,
              public number: string,
              public image: string,
              public description: string,
              public deprecated: boolean,
              public vendor: number) {}
}
