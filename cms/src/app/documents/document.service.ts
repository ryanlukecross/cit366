import { Injectable } from '@angular/core';
import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class DocumentService {
   documents: Document[] = [];
   selectedDocumentEvent = new Subject<Document>();
   documentListChangedEvent = new Subject<Document[]>();

   constructor(private http: HttpClient) {
   }


   addDocument(newDocument: Document) {

      if (!newDocument) {
         return;
      }

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });
      const document = JSON.parse(JSON.stringify(newDocument));
      this.http
         .post<{ message: string, document: Document }>(
            'http://localhost:3000/documents',
            document,
            { headers: headers }
         )
         .subscribe(response => {
            this.getDocuments();
            this.documentListChangedEvent.next(this.documents);
         });

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
      this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
         .subscribe(
            // success function
            (res) => {
               this.documents = res.documents.sort(function (a, b) {
                  if (a.id > b.id) {
                     return 1;
                  } else if (a.id < b.id) {
                     return -1;
                  } else {
                     return 0;
                  }
               });
               this.documentListChangedEvent.next(this.documents.slice());
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

      const headers = new HttpHeaders({
         'Content-Type': 'application/json'
      });

      const document = JSON.parse(JSON.stringify(newDocument));
      this.http
         .put<{ message: string, document: Document, id: string }>(
            'http://localhost:3000/documents/' + originalDocument.id,
            document,
            { headers: headers }
         )
         .subscribe(response => {
            this.getDocuments();
            this.documentListChangedEvent.next(this.documents);
         });
   }

   sortAndSend() {
      this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.documentListChangedEvent.next(this.documents.slice());
   }

   deleteDocument(document: Document) {
      if (typeof (document) === undefined || document === null) {
         return;
      }

      const pos = this.documents.indexOf(document);
      if (pos < 0) {
         return;
      }

      this.http.delete('http://localhost:3000/documents/' + document.id)
         .subscribe(
            (response: Response) => {
               this.documents.splice(pos, 1);
               this.sortAndSend();
            }
         );
   }
}