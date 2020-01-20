import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CatService } from '../service/cat.service';
import { DocsService } from '../service/docs.service';
import { StorageService } from '../service/storage.service';
import { Doc } from '../interface/doc';
import { EditorComponent } from './editor/editor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private storageService: StorageService,
    public docService: DocsService,
    public catService: CatService,
    private router: Router) { }

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
      }
    );
  }

  ifUserHasFile(): boolean {
    return this.docService.docs.length > 0;
  }

  navigate(path: string): void {
    this.router.navigateByUrl('dashboard/editor');
  }

  selectFile(docId: string): void {
    this.router.navigate(['dashboard/editor', docId]);
  }



}
