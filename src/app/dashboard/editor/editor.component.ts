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

  public newDoc: Doc;
  constructor(private storageService: StorageService, private docService: DocsService) {
    this.newDoc = {
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
    this.newDoc.modified = new Date();
    this.docService.postDocs(this.newDoc).subscribe(
      _res => {
        console.log(_res);
        this.newDoc._id = _res.docId;
        
      }
    );
  }

}
