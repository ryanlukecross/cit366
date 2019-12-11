import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class DocumentService {
   documents: Document[] = [];
   maxDocumentId: number = 0;
   selectedDocumentEvent = new Subject<Document>();
   documentListChangedEvent = new Subject<Document[]>();

   constructor(private http: HttpClient) {
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
      this.storeDocuments();
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

   storeDocuments() {
      const documents = JSON.parse(JSON.stringify(this.documents));
      this.http
         .put(
            'https://rlccms.firebaseio.com/documents.json',
            documents
         )
         .subscribe(response => {
            console.log(response);
         });
   }

   getDocuments() {
      this.http.get<Document[]>('http://localhost:3000/documents')
         .subscribe(
            // success function
            (documents: Document[]) => {
               this.documents = documents.sort(function (a, b) {
                  if (a.id > b.id) {
                     return 1;
                  } else if (a.id < b.id) {
                     return -1;
                  } else {
                     return 0;
                  }
               });
               this.maxDocumentId = this.getMaxId();
               this.documentListChangedEvent.next(documents.slice());
               console.log(documents.toString());
               console.log(this.documents.toString());

            },
            (error: any) => {
               console.log("Error at document.service.ts line 57: " + error.toString());
               return;
            }
         )
      return;
   }


   setDocuments(documents: Document[]) {
      this.documents = documents;
      this.documentListChangedEvent.next(this.documents.slice());
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
      this.storeDocuments();
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
      this.storeDocuments();
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