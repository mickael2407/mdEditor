import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Doc } from 'src/app/interface/doc';
import { StorageService } from 'src/app/service/storage.service';
import { DocsService } from 'src/app/service/docs.service';
import { ActivatedRoute } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CatService } from 'src/app/service/cat.service';
import {map, startWith} from 'rxjs/operators';
import { Category } from 'src/app/interface/category';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public editorDisplaying: boolean;
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public currentDoc: Doc;
  public currentCategory: Category[];
  public loadingFile: boolean;
  public catCtrl = new FormControl();
  public filteredCategory: Observable<Category[]>;
  
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('catInut', {static: false}) catInput: ElementRef<HTMLInputElement>;

  constructor(private storageService: StorageService, 
    private routerSnapshot: ActivatedRoute,
    public categoryService: CatService,
    private docService: DocsService) {
    this.currentDoc = {
      _id: null,
      title: `undefined${new Date().getTime()}`,
      description: '',
      content: '',
      modified: null,
      created: new Date(),
      userId: this.storageService.getUserId(),
      idCat : []
    };
    this.currentCategory = [];
    this.loadingFile = false;
    this.editorDisplaying = true;
    this.routerSnapshot.params.subscribe(
      _params => {
        if (_params['docId'] !== undefined) {
          this.editorDisplaying = false;
          this.currentDoc = this.docService.docs.filter(_doc => _doc._id == _params['docId'])[0];
          this.currentCategory = this.currentDoc.idCat.map(_cat => this.categoryService.category.filter(_c => _c.idCat == _cat)[0]);
          console.log(this.docService.docs);
          this.loadContent(_params['docId']);
        }
      }
    );
    this.filteredCategory = this.catCtrl.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => cat ? this._filter(cat): this.categoryService.category.slice())
    );
  }

  ngOnInit() {
    console.log(this.categoryService.category);
  }

  saveFile(nextFunction? : Function): void {
    this.loadingFile = !this.loadingFile;
    this.currentDoc.modified = new Date();
    this.docService.postDocs(this.currentDoc).subscribe(
      _res => {
        console.log(_res);
        this.currentDoc._id = _res.docId;
        if (this.docService.docs.filter(_doc => _doc._id == this.currentDoc._id).length < 1) {
          this.docService.docs.push(this.currentDoc);
        }
      }, () => {}, () => {
        this.loadingFile = !this.loadingFile;
        if (nextFunction) {
          nextFunction();
        }
      }
    );
  }

  deleteDoc(): void {
    this.docService.deleteDoc(this.currentDoc._id).subscribe(
      _res => {
        console.log(_res);
      },() => {},
      () => {
        const index = this.docService.docs.findIndex(_doc => _doc._id === this.currentDoc._id);
        this.docService.docs.splice(index, 1);
      }
    );
  }

  loadContent(docId: string) {
    this.loadingFile = !this.loadingFile;
    this.docService.getContentByDocId(docId).subscribe(
      _res => {
        console.log(_res);
        this.currentDoc.content = _res.content;
      }, () => {}, () => {
        this.loadingFile = !this.loadingFile;
      }
    )
  }

  add(event: MatChipInputEvent): void {
    // Add cat only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    console.log(this.matAutocomplete.isOpen);

    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      const catById = this.categoryService.category.filter(_cat => _cat.name == value)[0];
      // Add our cat
      //console.log(event.value);
      if ((value || '').trim()) {
        console.log(catById);
        this.currentCategory.push(catById);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.catCtrl.setValue(null);
    }
  }

  remove(cat: Category): void {
    const index = this.currentCategory.findIndex(_cat => _cat.idCat == cat.idCat);
    const indexAllDoc = this.docService.docs.findIndex(_doc => _doc._id === this.currentDoc._id);

    if (index >= 0) {
      this.docService.deleteCategoryDoc({docId: this.currentDoc._id, catId: cat.idCat}).subscribe(
        _res => {
          console.log(_res);
        }
      );
      this.currentCategory.splice(index, 1);
      const indexCat = this.currentDoc.idCat.indexOf(cat.idCat);
      if (indexCat !== -1) {
        this.currentDoc.idCat.splice(indexCat, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.currentDoc._id === null) {
      this.saveFile(() => {
        this.addCategory(event)
      });
    } else {
      this.addCategory(event);
    }
  }

  addCategory(event: MatAutocompleteSelectedEvent) {
    const cat = this.categoryService.category.filter(_cat => _cat.name == event.option.viewValue)[0];
    console.log(event.option.viewValue)
    this.currentCategory.push(cat);
    //this.docService.docs.filter(_doc => _doc._id === this.currentDoc._id)[0].idCat.push(cat.idCat);
    this.currentDoc.idCat.push(cat.idCat);
    this.docService.postCategoryDoc({docId:  this.currentDoc._id, catId: cat.idCat}).subscribe(
      _res => {
        console.log(_res);
      }
    );
    this.catInput.nativeElement.value = '';
    this.catCtrl.setValue(null);
  }

  private _filter(value: string): Category[] {
    console.log(this.categoryService.category);
    const filterValue = value.toLowerCase();
    return this.categoryService.category.filter(_cat => _cat.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
