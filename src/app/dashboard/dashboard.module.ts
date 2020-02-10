import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { NgxMdModule } from 'ngx-md';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsService } from '../service/docs.service';
import { CatService } from '../service/cat.service';
import { RouterModule } from '@angular/router';
import { ngfModule } from "angular-file"

import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { ViewComponent } from './view/view.component';
import { PictureModal } from './modal/picture/picture_modal';

declare var Prism: any;
@NgModule({
  declarations: [
    DashboardComponent, 
    EditorComponent, 
    AnnuaireComponent,
    ViewComponent,
    PictureModal
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMdModule.forRoot(),
    DashboardRoutingModule,
    ngfModule,
  ],
  entryComponents: [
    PictureModal
  ],
  providers: [
    DocsService,
    CatService
  ]
})
export class DashboardModule { }
