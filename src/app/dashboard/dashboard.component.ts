import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CatService } from '../service/cat.service';
import { DocsService } from '../service/docs.service';
import { StorageService } from '../service/storage.service';
import { Doc } from '../interface/doc';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private editorComponent: EditorComponent;
  constructor(private storageService: StorageService,
    private docService: DocsService,
    private catService: CatService) { }

  ngOnInit() {
    this.catService.getAllCategory().subscribe(
      _res => {
        console.log(_res);
        this.catService.category = _res;
      });
    this.docService.getAllDocsByUser(this.storageService.getUserId()).subscribe(
      _res => {
        console.log(_res);
        this.docService.docs = _res;
        this.catService.category.forEach(_cat => {
        }
        );
      }
    );
  }

  ifUserHasFile(): boolean {
    return this.docService.docs.length > 0;
  }

  selectFile(docId: string) {
    console.log(docId);
    if (this.editorComponent instanceof EditorComponent) {
      this.editorComponent.currentDoc = this.docService.docs.filter(_doc => _doc._id === docId)[0];
      this.editorComponent.loadContent(docId);
    }
  }

  onChangePage(event) {
    if (event instanceof EditorComponent) {
      this.editorComponent = event;
    }
  }


}
