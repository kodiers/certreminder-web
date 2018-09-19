export class Exam {
  constructor(public id: number,
  public created: Date,
  public updated: Date,
  public title: string,
  public number: string,
  public description: string,
  public deprecated: boolean,
  public certification: number[]) {}
}
