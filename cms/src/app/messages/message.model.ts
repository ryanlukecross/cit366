export class Message {
   constructor(
      /* will add public _id: string */
      public id: string,
      public subject: string,
      public msgText: string,
      public sender: string /* Going to be Contact */
   ){}
}