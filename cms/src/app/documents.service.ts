import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents/document.model';

@Injectable({
   providedIn: 'root'
})
export class DocumentsService {
   documents: Document[];
   selectedDocuments: Document;
   documentSelectedEvent = new EventEmitter<Document>();

   constructor() { }

   getDocument(id: string) {
      for (const document of this.documents) {
         if (document.id === id) {
            return this.documents.slice();
         }
      }
   }
}
