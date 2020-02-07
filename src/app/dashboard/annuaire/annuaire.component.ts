import { Component, OnInit } from '@angular/core';
import { DocsService } from 'src/app/service/docs.service';
import { CatService } from 'src/app/service/cat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})
export class AnnuaireComponent implements OnInit {

  constructor(public docService: DocsService, 
    public catService: CatService,
    private router: Router) { }

  ngOnInit() {
  }

  preview(docId: string) {
    this.router.navigate(['dashboard/view', docId]);
  }  

}
