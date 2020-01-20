import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/interface/doc';
import { StorageService } from 'src/app/service/storage.service';
import { DocsService } from 'src/app/service/docs.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public currentDoc: Doc;
  constructor(private storageService: StorageService, 
    private docService: DocsService) {
    this.currentDoc = {
      _id: null,
      title: `undefined${new Date().getTime()}`,
      description: '',
      content: '',
      modified: null,
      created: new Date(),
      userId: this.storageService.getUserId(),
      idCat : '1'
    };
  }

  ngOnInit() {
  }

  saveFile(): void {
    this.currentDoc.modified = new Date();
    this.docService.postDocs(this.currentDoc).subscribe(
      _res => {
        console.log(_res);
        this.currentDoc._id = _res.docId;
        
      }
    );
  }

  loadContent(docId: string) {
    this.docService.getContentByDocId(docId).subscribe(
      _res => {
        console.log(_res);
        this.currentDoc.content = _res.content;
      }
    )
  }

}
