import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class DocumentService {
   documents: Document[];
   maxDocumentId: number;
   selectedDocumentEvent = new Subject<Document>();
   documentListChangedEvent = new Subject<Document[]>();

   constructor() {
      this.documents = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId();
   }



   addDocument(newDocument: Document) {
      console.log("ADDED DOCUMENT");
      if (!newDocument) {
         return;
      }
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      const documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
   }

   getDocument(id: string): Document {
      for (const document of this.documents) {
         if (document.id == id) {
            return document;
         }
      }
      return null;
   }

   getDocuments() {
      return this.documents.slice();
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
      if (typeof (newDocument) === undefined ||
         newDocument === null ||
         typeof (originalDocument) === undefined ||
         originalDocument === null) {
         return;
      }

      const pos = this.documents.indexOf(originalDocument);

      if (pos < 0) {
         return;
      }

      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      const documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
   }


   deleteDocument(document: Document) {
      if (typeof (document) === undefined || document === null) {
         return;
      }

      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
      }

      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.documents.slice());
   }



   getMaxId(): number {
      let maxId = 0;
      for (const document of this.documents) {
         let currentId: number = parseInt(document.id);
         if (currentId > maxId) {
            maxId = currentId;
         }
      }
      return maxId;
   }
}

