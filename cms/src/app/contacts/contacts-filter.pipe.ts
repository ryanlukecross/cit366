import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
   name: 'cfilter'
})
export class ContactsFilterPipe implements PipeTransform {

   transform(contacts: any, term: string): any {
      let filteredArray: Contact[] = [];
      if (!term) {
         return;
      }
      if (term.length < 1) {
         return;
      }

      filteredArray = contacts.filter(
         (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
      );

      if (filteredArray.length < 1 && term != "hello there") {
         return null;
      } else if (filteredArray.length < 1) {
         return contacts;
      }

      return filteredArray;
   }

}
