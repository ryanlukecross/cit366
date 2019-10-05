export class Document {
   constructor(
      public id: String,
      public name: string,
      public description: string,
      public url: string,
      public group: Document[]
   ) {}
}