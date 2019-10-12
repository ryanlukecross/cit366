import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
   selector: 'cms-document-list',
   templateUrl: './document-list.component.html',
   styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
   documents: Document[] = [
      new Document("1", "doc 1 name", "doc 1 desc", "docs/doc1url.txt", null),
      new Document("2", "doc 2 name", "doc 2 desc", "docs/doc2url.txt", null),
      new Document("3", "doc 3 name", "doc 3 desc", "docs/doc3url.txt", null),
      new Document("4", "doc 4 name", "doc 4 desc", "docs/doc4url.txt", null),
      new Document("5", "doc 5 name", "doc 5 desc", "docs/doc5url.txt", null)
   ]

   @Output() selectedDocumentEvent = new EventEmitter<Document>();

   constructor() { }

   ngOnInit() {
   }

   onSelectedDocument(document: Document) {
      this.selectedDocumentEvent.emit(document);
   }

}
