import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from 'src/app/service/docs.service';
import { Doc } from 'src/app/interface/doc';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public currentDoc: Doc;
  constructor(private activatedRoute: ActivatedRoute, 
    public docService: DocsService,
    private router: Router,
    private routerSnapshot: ActivatedRoute) {
    this.currentDoc = this.docService.allDocs.filter(_doc => _doc._id == this.activatedRoute.snapshot.params['docId'])[0];
    this.loadContent(this.currentDoc._id);
    this.routerSnapshot.params.subscribe(
      _params => {
        if (_params['docId'] !== undefined) {
          this.currentDoc = this.docService.allDocs.filter(_doc => _doc._id == _params['docId'])[0];
          this.loadContent(this.currentDoc._id);
          
        }
      }
    )
  }

  ngOnInit() {
  }

  loadContent(docId: string): void {
    //this.loadingFile = !this.loadingFile;
    this.docService.getContentByDocId(docId).subscribe(
      _res => {
        this.currentDoc.content = _res.content;
      }, () => {}, () => {
        //this.loadingFile = !this.loadingFile;
      }
    )
  }

  nextDoc(): void {
    const currentIndex = this.docService.allDocs.findIndex(_doc => _doc._id === this.currentDoc._id);
    if (currentIndex !== this.docService.allDocs.length - 1) {
        this.router.navigate(['dashboard/view', this.docService.allDocs[currentIndex + 1]._id])
    }
  }

  previousDoc(): void {
    const currentIndex = this.docService.allDocs.findIndex(_doc => _doc._id === this.currentDoc._id);
    if (currentIndex !== 0) {
      this.router.navigate(['dashboard/view', this.docService.allDocs[currentIndex - 1]._id])

    } 
  }

  

}
