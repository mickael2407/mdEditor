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

import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-perl';

@NgModule({
  declarations: [DashboardComponent, EditorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMdModule.forRoot(),
    DashboardRoutingModule,
  ],
  providers: [
    DocsService,
    CatService
  ]
})
export class DashboardModule { }
